export interface ProfileData {
  avatar: string | null;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface UserLink {
  id: string;
  sort_order: number;
  platform: string;
  url: string;
  user_id?: string;
}

export interface OutletContextType {
  userLinks: UserLink[];
  updateLinks: (currentLinks: UserLink[]) => Promise<void>;
  profileData: ProfileData;
  updateProfile: (newData: ProfileData) => Promise<void>;
}
