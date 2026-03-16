import React, { useRef } from "react";
import Modal from "@/Components/ui/Modal/Modal";
import Button from "@/Components/ui/Button/Button";
import Input from "@/Components/ui/Input/Input";
import { useUserProfileUI } from "@/features/users/hooks/useUserProfileUI";
import { Camera, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";

const UserProfileCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    profile,
    loading,
    error,
    name,
    setName,
    bio,
    setBio,
    preview,
    modalOpen,
    setModalOpen,
    handlePhotoChange,
    handleSave,
    updating,
    updateError,
  } = useUserProfileUI();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading)
    return <p className="text-gray-300 text-center mt-8">Loading profile...</p>;

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  if (!profile) return null;

  return (
    <>
      {/* ================= PROFILE CARD ================= */}

      <div className="p-6 bg-[#161b22]  rounded-xl shadow-xl w-full max-w-sm mx-auto text-white flex flex-col items-center space-y-5">
        {/* Profile Image */}
        <div
          onClick={triggerFileInput}
          className="relative w-24 h-24 rounded-full bg-[#0f141a] flex items-center justify-center cursor-pointer hover:border-blue-500 transition overflow-hidden"
        >
          {preview ? (
            <img
              src={preview}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <Camera size={26} />
              <span className="text-xs mt-1">Add Photo</span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center space-y-3 mt-6">
          <h1 className="text-5xl font-extrabold text-white font-sacramento">
            {profile.name}
          </h1>
          <p className="text-sm text-gray-400">{profile.email}</p>

          {profile.bio && (
            <p className="text-gray-300 text-sm mt-2 max-w-xs">{profile.bio}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full mt-6  justify-center">
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Profile
          </Button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handlePhotoChange(e.target.files?.[0] || null)}
        />
      </div>

      {/* ================= EDIT MODAL ================= */}

      <Modal
        open={modalOpen}
        title="Edit Profile"
        onClose={() => setModalOpen(false)}
        actions={
          <Button onClick={handleSave} disabled={updating}>
            {updating ? "Saving..." : "Save"}
          </Button>
        }
      >
        <div className="flex flex-col space-y-4 items-center">
          {/* Photo */}
          <div
            className="relative w-20 h-20 rounded-full cursor-pointer border border-[#30363d] flex items-center justify-center overflow-hidden"
            onClick={triggerFileInput}
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-[#0f141a] text-gray-400">
                <Camera size={22} />
              </div>
            )}
          </div>

          <span className="text-xs text-gray-400">Click to change photo</span>

          {/* Name */}
          <Input value={name} setValue={setName} placeholder="Your Name" />

          {/* Bio */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio..."
            className="w-full rounded-md bg-[#0f141a] border border-[#30363d] px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
          />

          {/* Error */}
          {updateError && <p className="text-red-500 text-sm">{updateError}</p>}
        </div>
      </Modal>
    </>
  );
};

export default UserProfileCard;
