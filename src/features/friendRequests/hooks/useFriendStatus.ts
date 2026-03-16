"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendStatus } from "@/redux/actions/friendRequest.actions";
import {
  selectRelationshipStatus,
  selectFriendRequestLoading,
} from "@/redux/slices/friendRequest.slice";
import { AppDispatch } from "@/redux/store";

export const useFriendStatus = (userId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectRelationshipStatus);
  const loading = useSelector(selectFriendRequestLoading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFriendStatus(userId));
    }
  }, [dispatch, userId]);

  return { status, loading };
};
