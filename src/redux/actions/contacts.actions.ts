import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsService } from "@/services/contactsService";

/* ================= GET CONTACTS ================= */
export const fetchContacts = createAsyncThunk(
  "contacts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await contactsService.getContacts();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch contacts"
      );
    }
  }
);

/* ================= ADD CONTACT ================= */
export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactId: string, { rejectWithValue }) => {
    try {
      return await contactsService.addContact(contactId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add contact"
      );
    }
  }
);

/* ================= BLOCK CONTACT ================= */
export const blockContact = createAsyncThunk(
  "contacts/block",
  async (contactId: string, { rejectWithValue }) => {
    try {
      return await contactsService.blockContact(contactId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to block contact"
      );
    }
  }
);

/* ================= UNBLOCK CONTACT ================= */
export const unblockContact = createAsyncThunk(
  "contacts/unblock",
  async (contactId: string, { rejectWithValue }) => {
    try {
      return await contactsService.unblockContact(contactId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unblock contact"
      );
    }
  }
);

/* ================= REMOVE CONTACT ================= */
export const removeContact = createAsyncThunk(
  "contacts/remove",
  async (contactId: string, { rejectWithValue }) => {
    try {
      return await contactsService.removeContact(contactId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove contact"
      );
    }
  }
);
