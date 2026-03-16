import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "@/redux/actions/user.actions";
import { selectSelectedUser } from "@/redux/slices/user.slice";
import { AppDispatch } from "@/redux/store";

interface UserProfile {
  _id: string;
  name: string;
  profilePic?: string;
}

export const useUserProfile = (userId?: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectSelectedUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!userId) return;

    // If selectedUser already matches ID, use it
    if (selectedUser?._id === userId) {
      setProfile(selectedUser);
      return;
    }

    // Fetch user by ID
    dispatch(fetchUserById(userId))
      .unwrap()
      .then((res) => {
        console.log("Fetched user profile for ID:", userId, res);
        setProfile(res);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile for ID:", userId, err);
        setProfile(null);
      });
  }, [userId, dispatch, selectedUser]);

  return profile;
};
