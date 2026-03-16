"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/actions/user.actions";
import {
  selectUsers,
  selectUserLoading,
  selectUserError,
  User,
} from "@/redux/slices/user.slice";
import { AppDispatch } from "@/redux/store";

export const useUsersList = (searchTerm: string = "") => {
  const dispatch = useDispatch<AppDispatch>();
  const usersFromStore = useSelector(selectUsers);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchUsers({ search: searchTerm, page: 1, limit: 20 }))
      .unwrap()
      .then((res) => console.log("fetchUsers fulfilled:", res))
      .catch((err) => console.error(" fetchUsers rejected:", err));
  }, [dispatch, searchTerm]);

  const usersArray: User[] = Array.isArray(usersFromStore?.data)
    ? usersFromStore.data
    : [];

  return { users: usersArray, loading, error };
};
