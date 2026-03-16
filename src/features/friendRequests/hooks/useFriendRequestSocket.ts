"use client";

import { useEffect } from "react";
import { getSocket } from "@/socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setRelationshipStatus } from "@/redux/slices/friendRequest.slice";
import { addUserRealtime, removeUserRealtime } from "@/redux/slices/user.slice";
import { addNotification } from "@/redux/slices/notification.slice";

export const useFriendRequestSocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!currentUser?._id) return;

    const socket = getSocket();

    // console.log(" Friend request socket active for user:", currentUser._id);

    /* -------------------- HANDLE NEW FRIEND REQUEST -------------------- */
    const handleRequestReceived = (payload: any) => {
      // console.log("friend_request_received EVENT:", payload);

      const senderUser = payload.relatedUser || payload.from;
      const requestId = payload._id || payload.requestId;

      if (!senderUser) return;

      dispatch(
        setRelationshipStatus({
          userId: senderUser._id,
          status: "pending",
        })
      );

      dispatch(addUserRealtime(senderUser));

      dispatch(addNotification(payload));

      // console.log(
      //   "Redux updated: pending relationship & user added for",
      //   senderUser._id
      // );
    };

    /* -------------------- HANDLE FRIEND RESPONSE -------------------- */
    const handleRequestResponse = (payload: any) => {
      // console.log(" friend_request_response EVENT:", payload);

      const otherUserId =
        payload.fromId === currentUser._id ? payload.toId : payload.fromId;

      const status = payload.action === "accepted" ? "accepted" : "none";

      dispatch(
        setRelationshipStatus({
          userId: otherUserId,
          status,
        })
      );

      if (status === "none" && payload.user) {
        dispatch(addUserRealtime(payload.user));
      }

      // console.log(" Redux updated relationshipStatus:", otherUserId, status);
    };

    /* -------------------- HANDLE CANCEL REQUEST -------------------- */
    const handleRequestCancel = (payload: any) => {
      // console.log(" friend_request_cancelled EVENT:", payload);

      const otherUserId =
        payload.fromId === currentUser._id ? payload.toId : payload.fromId;

      dispatch(
        setRelationshipStatus({
          userId: otherUserId,
          status: "none",
        })
      );

      if (payload.user) {
        dispatch(addUserRealtime(payload.user));
      }

      // console.log("Cancelled request, user restored in list:", otherUserId);
    };

    /* -------------------- HANDLE REMOVE USER FROM LIST -------------------- */
    const handleUserRemoved = (payload: any) => {
      // console.log(" user_removed_from_list EVENT:", payload);

      if (!payload?.removeUserId) return;

      dispatch(removeUserRealtime(payload.removeUserId));

      // console.log(" User removed from list:", payload.removeUserId);
    };

    /* -------------------- HANDLE NEW CONTACT -------------------- */
    const handleNewContact = (payload: any) => {
      // console.log(" new_contact_added EVENT:", payload);

      dispatch(removeUserRealtime(payload.userId));

      dispatch(
        setRelationshipStatus({
          userId: payload.userId,
          status: "accepted",
        })
      );

      // console.log(" New contact added:", payload.userId);
    };

    /* -------------------- SOCKET LISTENERS -------------------- */

    socket.on("friend_request_received", handleRequestReceived);
    socket.on("friend_request_sent", handleRequestReceived);
    socket.on("friend_request_response", handleRequestResponse);
    socket.on("friend_request_cancelled", handleRequestCancel);
    socket.on("user_removed_from_list", handleUserRemoved);
    socket.on("new_contact_added", handleNewContact);

    /* -------------------- CLEANUP -------------------- */

    return () => {
      socket.off("friend_request_received", handleRequestReceived);
      socket.off("friend_request_sent", handleRequestReceived);
      socket.off("friend_request_response", handleRequestResponse);
      socket.off("friend_request_cancelled", handleRequestCancel);
      socket.off("user_removed_from_list", handleUserRemoved);
      socket.off("new_contact_added", handleNewContact);
    };
  }, [dispatch, currentUser?._id]);
};
