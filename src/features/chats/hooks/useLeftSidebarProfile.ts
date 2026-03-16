import { useEffect, useState } from "react";
import { useUserProfile } from "@/features/users/hooks/useUserProfile";

const BACKEND_URL = "http://localhost:5000";
const DEFAULT_AVATAR = "/img/default-avatar.webp";

export const useLeftSidebarProfile = () => {
  const { profile, loading, error } = useUserProfile();
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    if (profile) {
      if (profile.profilePic?.startsWith("/uploads")) {
        setAvatarUrl(`${BACKEND_URL}${profile.profilePic}`);
      } else if (profile.profilePic) {
        setAvatarUrl(profile.profilePic);
      } else {
        setAvatarUrl(DEFAULT_AVATAR);
      }
    }
  }, [profile]);

  return {
    profile,
    avatarUrl,
    loading,
    error,
  };
};
