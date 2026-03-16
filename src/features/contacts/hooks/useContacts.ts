"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContacts,
  blockContact,
  unblockContact,
  removeContact,
} from "@/redux/actions/contacts.actions";
import {
  selectContacts,
  selectContactsLoading,
  selectContactsError,
} from "@/redux/slices/contactsSlice";
import { AppDispatch } from "@/redux/store";

// Contact type
export interface Contact {
  _id: string;
  name: string;
  email?: string;
  profilePic?: string;
  status?: "active" | "blocked" | "offline";
}

export const useContacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts) as Contact[];
  const loading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleBlock = (contactId: string) => dispatch(blockContact(contactId));
  const handleUnblock = (contactId: string) =>
    dispatch(unblockContact(contactId));
  const handleRemove = (contactId: string) =>
    dispatch(removeContact(contactId));

  return {
    contacts,
    loading,
    error,
    handleBlock,
    handleUnblock,
    handleRemove,
  };
};
