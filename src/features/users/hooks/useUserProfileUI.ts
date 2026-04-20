// useUserProfileUI.ts
import { useEffect, useState } from "react";
import { useUserProfile } from "./useUserProfile";
import { useUpdateUserProfile } from "./useUpdateUserProfile";

/* ================= BASE URL ================= */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

export const useUserProfileUI = () => {
  const { profile, loading, error } = useUserProfile();
  const {
    updateUserProfile,
    updating,
    error: updateError,
  } = useUpdateUserProfile();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ================= INIT PROFILE =================
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");

      if (profile.profilePic) {
        setPreview(
          profile.profilePic.startsWith("/uploads")
            ? `${BASE_URL}${profile.profilePic}`
            : profile.profilePic
        );
      } else {
        setPreview(null);
      }
    }
  }, [profile]);

  // ================= PHOTO UPDATE =================
  const handlePhotoChange = async (file: File | null) => {
    if (!file) return;

    // instant preview
    setPreview(URL.createObjectURL(file));

    // backend update
    await updateUserProfile({ photo: file });

    setModalOpen(false);
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    await updateUserProfile({ name, bio });
    setModalOpen(false);
  };

  return {
    profile,
    loading,
    error,
    updating,
    updateError,
    name,
    setName,
    bio,
    setBio,
    preview,
    modalOpen,
    setModalOpen,
    handlePhotoChange,
    handleSave,
  };
};
