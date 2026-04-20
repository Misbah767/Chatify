"use client";

import React from "react";
import { useContactsList } from "@/features/contacts/hooks/useContactsList";
import { Contact } from "@/features/contacts/hooks/useContacts";

interface Props {
  onSelectContact?: (contact: Contact) => void;
  selectedContactId?: string;
}

const ContactsList: React.FC<Props> = ({
  onSelectContact,
  selectedContactId,
}) => {
  const { contacts, loading, error, getAvatar } = useContactsList();

  if (loading)
    return (
      <p className="text-center text-gray-400 py-10">Loading contacts...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-10 font-medium">{error}</p>
    );

  if (!contacts || contacts.length === 0)
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-500 text-lg">No contacts yet</p>
      </div>
    );

  return (
    <div className="space-y-3 py-10 px-3 cursor-pointer bg-[#141414]">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => onSelectContact?.(contact)}
          className={`
            flex items-center justify-between
            p-3 rounded-xl border
            transition-colors duration-150
            ${
              selectedContactId === contact._id
                ? "bg-[#262626] border-[#262626]"
                : "bg-[#141414] border-[#262626] hover:bg-[#1a1a1a]"
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <img
              src={getAvatar(contact)}
              alt={contact.name}
              className="w-16 h-16 rounded-2xl object-cover border border-[#262626]"
            />

            <div>
              <p className="text-white text-lg font-medium">{contact.name}</p>
              <p className="text-gray-400 text-xs">{contact.email}</p>
              <p className="text-sm mt-1 text-green-400">
                {contact.status || "active"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
