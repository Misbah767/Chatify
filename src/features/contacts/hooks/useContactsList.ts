"use client";

import { useContacts, Contact } from "@/features/contacts/hooks/useContacts";

const BASE_URL = "http://localhost:5000";
const DEFAULT_AVATAR = "/img/default-avatar.webp";

export const useContactsList = () => {
  const { contacts, loading, error } = useContacts();

  const getAvatar = (contact: Contact) => {
    return contact.profilePic
      ? `${BASE_URL}${contact.profilePic}`
      : DEFAULT_AVATAR;
  };

  return {
    contacts,
    loading,
    error,
    getAvatar,
  };
};
