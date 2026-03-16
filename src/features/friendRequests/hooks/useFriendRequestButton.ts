"use client";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  sendFriendRequest,
  cancelFriendRequest,
} from "@/redux/actions/friendRequest.actions";
import { setRelationshipStatus } from "@/redux/slices/friendRequest.slice";

export const useFriendRequestButton = (userId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const relationshipStatus = useSelector(
    (state: RootState) =>
      state.friendRequest.relationshipStatuses[userId] || "none",
    shallowEqual
  );

  const sendRequest = async () => {
    if (relationshipStatus !== "none") return;
    try {
      const res = await dispatch(sendFriendRequest(userId)).unwrap();
      dispatch(setRelationshipStatus({ userId, status: "pending" }));
    } catch (err) {
      console.error(err);
    }
  };

  const cancelRequest = async () => {
    if (relationshipStatus !== "pending") return;
    try {
      const res = await dispatch(cancelFriendRequest(userId)).unwrap();
      dispatch(setRelationshipStatus({ userId, status: "none" }));
    } catch (err) {
      console.error(err);
    }
  };

  let buttonText = "Add Friend";
  let buttonClass = "bg-blue-500 text-white hover:bg-blue-600";

  if (relationshipStatus === "pending") {
    buttonText = "Pending";
    buttonClass = "bg-gray-500 text-white cursor-not-allowed";
  }
  if (relationshipStatus === "accepted") {
    buttonText = "Friends";
    buttonClass = "bg-green-500 text-white cursor-not-allowed";
  }

  return {
    sendRequest,
    cancelRequest,
    relationshipStatus,
    buttonText,
    buttonClass,
  };
};
