import api from "./axios";

export const contactsService = {
  // GET all contacts
  getContacts: async () => {
    const res = await api.get("/contacts");
    return res.data.data;
  },

  // ADD a contact (internal, auto when friend request accepted)
  addContact: async (contactId: string) => {
    const res = await api.post("/contacts/add", { contactId });
    return res.data.data;
  },

  // BLOCK a contact
  blockContact: async (contactId: string) => {
    const res = await api.post("/contacts/block", { contactId });
    return res.data.data;
  },

  // UNBLOCK a contact
  unblockContact: async (contactId: string) => {
    const res = await api.post("/contacts/unblock", { contactId });
    return res.data.data;
  },

  // REMOVE a contact
  removeContact: async (contactId: string) => {
    const res = await api.post("/contacts/remove", { contactId });
    return res.data.data;
  },
};