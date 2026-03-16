import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateProfile } from "@/redux/actions/user.actions";

interface UpdatePayload {
  name?: string;
  bio?: string;
  photo?: File;
}

export const useUpdateUserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUserProfile = async (payload: UpdatePayload) => {
    setUpdating(true);
    setError(null);
    setSuccess(false);

    try {
      await dispatch(updateProfile(payload)).unwrap();
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err || "Profile update failed");
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateUserProfile,
    updating,
    error,
    success,
  };
};
