"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendFriendRequest,
  fetchSentRequests,
} from "@/redux/actions/friendRequest.actions";
import {
  selectSentRequests,
  selectFriendRequestLoading,
} from "@/redux/slices/friendRequest.slice";
import { AppDispatch } from "@/redux/store";

/**
 * Hook for sending friend requests with optimistic UI
 */
export const useSendFriendRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sentRequests = useSelector(selectSentRequests);
  const loading = useSelector(selectFriendRequestLoading);

  const [localPending, setLocalPending] = useState<string[]>([]);

  const sendRequest = async (toId: string) => {
    if (!toId) return;

    // Optimistic UI
    setLocalPending((prev) => [...prev, toId]);

    await dispatch(sendFriendRequest(toId));

    // Refresh sent requests to keep store synced
    dispatch(fetchSentRequests());
  };

  const isPending = (userId: string) =>
    localPending.includes(userId) ||
    sentRequests.some((req) => req.to._id === userId);

  return { sendRequest, isPending, sentRequests, loading };
};
