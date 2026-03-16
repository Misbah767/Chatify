import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/redux/actions/user.actions";
import {
  selectProfile,
  selectUserLoading,
  selectUserError,
} from "@/redux/slices/user.slice";
import { AppDispatch } from "@/redux/store";

export const useUserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  return {
    profile,
    loading,
    error,
  };
};
