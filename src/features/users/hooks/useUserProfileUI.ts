// useUserProfileUI.ts
import { useEffect, useState } from "react";
import { useUserProfile } from "./useUserProfile";
import { useUpdateUserProfile } from "./useUpdateUserProfile";

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

  // Initialize form fields from backend profile
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      if (profile.profilePic) {
        setPreview(
          profile.profilePic.startsWith("/uploads")
            ? `http://localhost:5000${profile.profilePic}`
            : profile.profilePic
        );
      } else {
        setPreview(null);
      }
    }
  }, [profile]);

  // Handle photo change + immediate backend save
  const handlePhotoChange = async (file: File | null) => {
    if (!file) return;

    // Show preview immediately
    setPreview(URL.createObjectURL(file));

    // Save photo to backend
    await updateUserProfile({ photo: file });

    // Close modal automatically
    setModalOpen(false);
  };

  // Save other profile fields (name, bio)
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
