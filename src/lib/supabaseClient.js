import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabasePublishableKey);

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "valid.email@supabase.io",
    password: "example-password",
  });

  return { data, error };
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  return error;
}

export { supabase, signInWithEmail, signOut };
