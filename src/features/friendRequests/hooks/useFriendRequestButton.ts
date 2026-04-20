"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  sendFriendRequest,
  cancelFriendRequest,
} from "@/redux/actions/friendRequest.actions";
import { setRelationshipStatus } from "@/redux/slices/friendRequest.slice";

export const useFriendRequestButton = (userId?: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const safeUserId = userId ?? "";

  const relationshipStatus = useSelector((state: RootState) =>
    safeUserId
      ? state.friendRequest.relationshipStatuses[safeUserId] || "none"
      : "none"
  );

  /* ================= SEND ================= */
  const sendRequest = async () => {
    if (!safeUserId || relationshipStatus !== "none") return;

    try {
      await dispatch(sendFriendRequest(safeUserId)).unwrap();

      dispatch(
        setRelationshipStatus({
          userId: safeUserId,
          status: "pending",
        })
      );
    } catch (err) {
      console.error("Send Request Error:", err);
    }
  };

  /* ================= CANCEL ================= */
  const cancelRequest = async () => {
    if (!safeUserId || relationshipStatus !== "pending") return;

    try {
      await dispatch(cancelFriendRequest(safeUserId)).unwrap();

      dispatch(
        setRelationshipStatus({
          userId: safeUserId,
          status: "none",
        })
      );
    } catch (err) {
      console.error("Cancel Request Error:", err);
    }
  };

  /* ================= UI STATE ================= */

  let buttonText = "Add Friend";
  let buttonClass = "bg-blue-500 text-white hover:bg-blue-600";

  if (relationshipStatus === "pending") {
    buttonText = "Pending";
    buttonClass = "bg-gray-500 cursor-not-allowed";
  }

  if (relationshipStatus === "accepted") {
    buttonText = "Friends";
    buttonClass = "bg-green-500 cursor-not-allowed";
  }

  return {
    sendRequest,
    cancelRequest,
    relationshipStatus,
    buttonText,
    buttonClass,
  };
};
