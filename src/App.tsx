import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import type { ProfileData, UserLink } from "./types.js";
import { supabase } from "./lib/supabaseClient.js";

function App() {
  const [userLinks, setUserLinks] = useState<UserLink[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    avatar: null,
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User is not authenticated");
          setAuthenticated(false);
          navigate(`${import.meta.env.BASE_URL}auth/login`);
          return;
        }

        setAuthenticated(true);

        // Fetch both simultaneously and wait for both to finish
        const [linksRes, profileRes] = await Promise.all([
          supabase.from("links").select("*"),
          supabase.from("users").select("*").limit(1).single(),
        ]);

        if (linksRes.error) {
          console.error("Error fetching links:", linksRes.error.message);
        } else {
          setUserLinks(linksRes.data);
        }

        if (profileRes.error) {
          console.error("Error fetching profile:", profileRes.error.message);
        } else {
          setProfileData(profileRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          setAuthenticated(false);
          setUserLinks([]); // Clear sensitive data
          setProfileData({
            avatar: null,
            first_name: "",
            last_name: "",
            email: "",
          });
          navigate(`${import.meta.env.BASE_URL}auth/login`);
        }
      },
    );

    // 3. Cleanup the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const updateProfile = async (newData: ProfileData) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        email: newData.email,
        avatar: newData.avatar,
        first_name: newData.first_name,
        last_name: newData.last_name,
      })
      .eq("id", user.id)
      .select();

    if (error) {
      alert(error.message);
    } else {
      setProfileData(data[0]);
      alert("Profile saved");
    }
  };

  /**
   * Compares current links against existing userLinks:
   * - Deletes removed items from Supabase
   * - Upserts new/modified items to Supabase
   *
   * @param {Array<Object>} currentLinks - The current state/edited links.
   */
  async function updateLinks(currentLinks: UserLink[]) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return;
    }

    // 1. Identify Removed Links
    const currentIdSet = new Set(
      currentLinks.map((item) => item.id).filter(Boolean),
    );
    const removedLinkIds = userLinks
      .filter((original) => !currentIdSet.has(original.id))
      .map((item) => item.id);

    // 2. Identify Modified or Added Links
    const initialMap = new Map(userLinks.map((item) => [item.id, item]));
    const changedLinks = currentLinks.filter((current) => {
      if (!current.id) return true; // Newly added item

      const original = initialMap.get(current.id);
      if (!original) return true;

      // Compare editable fields
      const isUrlChanged = current.url !== original.url;
      const isPlatformChanged = current.platform !== original.platform;
      const isOrderChanged = current.sort_order !== original.sort_order;

      return isUrlChanged || isPlatformChanged || isOrderChanged;
    });

    // 3. Early return if nothing changed
    if (changedLinks.length === 0 && removedLinkIds.length === 0) {
      return;
    }

    // 4. Process Deletions (if any)
    if (removedLinkIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("links")
        .delete()
        .in("id", removedLinkIds);

      if (deleteError) {
        console.error("Error deleting links:", deleteError.message);
        return;
      }
    }

    // 5. Process Upserts (if any)
    if (changedLinks.length > 0) {
      const linksWithUserId = changedLinks.map((link) => ({
        ...link,
        user_id: user.id,
      }));

      const { error: upsertError } = await supabase
        .from("links")
        .upsert(linksWithUserId, { onConflict: "id" });

      if (upsertError) {
        console.error("Error upserting links:", upsertError.message);
        return;
      }
    }

    // 6. Refresh state with the complete latest list
    const { data: updatedList, error: fetchError } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true });

    if (!fetchError && updatedList) {
      setUserLinks(updatedList);
      alert("Links saved");
    }
  }

  const outletProps = {
    userLinks,
    updateLinks,
    profileData,
    updateProfile,
  };

  if (loading) return <p>Loading...</p>;

  return <Outlet context={outletProps} />;
}

export default App;
