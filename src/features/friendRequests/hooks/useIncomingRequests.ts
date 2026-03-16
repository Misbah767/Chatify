"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/lib/socket";
import {
  fetchIncomingRequests,
  respondFriendRequest,
} from "@/redux/actions/friendRequest.actions";
import {
  selectIncomingRequests,
  selectFriendRequestLoading,
} from "@/redux/slices/friendRequest.slice";
import { AppDispatch } from "@/redux/store";

export const useIncomingFriendRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const incoming = useSelector(selectIncomingRequests);
  const loading = useSelector(selectFriendRequestLoading);

  useEffect(() => {
    dispatch(fetchIncomingRequests());
  }, [dispatch]);

  // Socket real-time updates
  useEffect(() => {
    const handleReceived = () => dispatch(fetchIncomingRequests());
    const handleResponse = () => dispatch(fetchIncomingRequests());

    socket.on("friend_request_received", handleReceived);
    socket.on("friend_request_response", handleResponse);

    return () => {
      socket.off("friend_request_received", handleReceived);
      socket.off("friend_request_response", handleResponse);
    };
  }, [dispatch]);

  const acceptRequest = async (requestId: string) => {
    await dispatch(respondFriendRequest({ requestId, action: "accepted" }));
    dispatch(fetchIncomingRequests());
  };

  const rejectRequest = async (requestId: string) => {
    await dispatch(respondFriendRequest({ requestId, action: "rejected" }));
    dispatch(fetchIncomingRequests());
  };

  return { incoming, loading, acceptRequest, rejectRequest };
};
