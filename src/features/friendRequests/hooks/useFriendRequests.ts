"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "@/socket/socket";
import {
  fetchIncomingRequests,
  fetchSentRequests,
  respondFriendRequest,
  cancelFriendRequest,
} from "@/redux/actions/friendRequest.actions";
import {
  selectIncomingRequests,
  selectSentRequests,
  selectFriendRequestLoading,
  setRelationshipStatus,
} from "@/redux/slices/friendRequest.slice";
import { addUserRealtime } from "@/redux/slices/user.slice";
import { addNotification } from "@/redux/slices/notification.slice";
import { AppDispatch, RootState } from "@/redux/store";

export const useFriendRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const incoming = useSelector(selectIncomingRequests);
  const sent = useSelector(selectSentRequests);
  const loading = useSelector(selectFriendRequestLoading);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // -------------------- Initial API fetch --------------------
  useEffect(() => {
    if (!currentUser?._id) return;

    dispatch(fetchIncomingRequests());
    dispatch(fetchSentRequests());
  }, [dispatch, currentUser?._id]);

  // -------------------- Real-time Socket listeners --------------------
  useEffect(() => {
    if (!currentUser?._id) return;

    const socket = getSocket(); // <-- initialize socket here
    if (!socket) return;

    // Incoming request
    const handleIncoming = (payload: any) => {
      const senderUser = payload.relatedUser;
      const requestId = payload.requestId;

      dispatch(
        setRelationshipStatus({ userId: senderUser._id, status: "pending" })
      );

      dispatch(addUserRealtime(senderUser));
      dispatch(addNotification(payload));
    };

    // Sent request
    const handleSent = (payload: any) => {
      const receiverUser = payload.relatedUser;
      dispatch(
        setRelationshipStatus({ userId: receiverUser._id, status: "pending" })
      );
      dispatch(addUserRealtime(receiverUser));
    };

    // Response
    const handleResponse = (payload: any) => {
      const otherUserId =
        payload.fromId === currentUser._id ? payload.toId : payload.fromId;
      const status = payload.action === "accepted" ? "accepted" : "none";

      dispatch(setRelationshipStatus({ userId: otherUserId, status }));

      if (status === "none" && payload.user) {
        dispatch(addUserRealtime(payload.user));
      }

      dispatch(addNotification(payload));
    };

    // Cancel
    const handleCancel = (payload: any) => {
      const otherUserId =
        payload.fromId === currentUser._id ? payload.toId : payload.fromId;

      dispatch(setRelationshipStatus({ userId: otherUserId, status: "none" }));
      if (payload.user) dispatch(addUserRealtime(payload.user));
    };

    // Attach listeners
    socket.on("friend_request_received", handleIncoming);
    socket.on("friend_request_sent", handleSent);
    socket.on("friend_request_response", handleResponse);
    socket.on("friend_request_cancelled", handleCancel);

    // Cleanup
    return () => {
      socket.off("friend_request_received", handleIncoming);
      socket.off("friend_request_sent", handleSent);
      socket.off("friend_request_response", handleResponse);
      socket.off("friend_request_cancelled", handleCancel);
    };
  }, [dispatch, currentUser?._id]);

  // -------------------- Actions --------------------
  const acceptRequest = async (requestId: string) => {
    await dispatch(respondFriendRequest({ requestId, action: "accepted" }));
  };

  const rejectRequest = async (requestId: string) => {
    await dispatch(respondFriendRequest({ requestId, action: "rejected" }));
  };

  const cancelRequest = (requestId: string) => {
    if (!requestId) return;
    dispatch(cancelFriendRequest(requestId));
  };

  return {
    incoming,
    sent,
    loading,
    acceptRequest,
    rejectRequest,
    cancelRequest,
  };
};
