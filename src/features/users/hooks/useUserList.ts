"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useFriendRequestSocket } from "@/features/friendRequests/hooks/useFriendRequestSocket";
import { useUsersList } from "@/features/users/hooks/useUsersList";
import { fetchSentRequests } from "@/redux/actions/friendRequest.actions";

export const useUserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Initialize friend request socket
  useFriendRequestSocket();

  // Fetch users from API based on searchTerm
  const { users, loading, error } = useUsersList(searchTerm);

  // Relationship statuses from Redux
  const relationshipStatuses = useSelector(
    (state: RootState) => state.friendRequest.relationshipStatuses
  );

  // Fetch sent friend requests on mount
  useEffect(() => {
    dispatch(fetchSentRequests())
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  // Filter users by search and relationship status
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return [];

    return users
      .filter((user) => {
        const status = relationshipStatuses[user._id] || "none";
        return status !== "pending" && status !== "accepted";
      })
      .filter((user) => {
        const regex = new RegExp(
          searchTerm
            .trim()
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            .split(" ")
            .join(".*"),
          "i"
        );
        return regex.test(user.name);
      });
  }, [users, searchTerm, relationshipStatuses]);

  return { searchTerm, setSearchTerm, filteredUsers, loading, error };
};
