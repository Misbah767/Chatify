"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  fetchContacts,
  addContact,
  blockContact,
  unblockContact,
  removeContact,
} from "../actions/contacts.actions";

export interface Contact {
  _id: string;
  name: string;
  email?: string;
  profilePic?: string;
  status?: "active" | "blocked" | "removed";
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearContactsState(state) {
      state.contacts = [];
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* FETCH CONTACTS */
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.contacts = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ADD CONTACT */
    builder.addCase(
      addContact.fulfilled,
      (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      }
    );

    /* BLOCK CONTACT */
    builder.addCase(
      blockContact.fulfilled,
      (state, action: PayloadAction<Contact>) => {
        const index = state.contacts.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index >= 0) state.contacts[index].status = "blocked";
      }
    );

    /* UNBLOCK CONTACT */
    builder.addCase(
      unblockContact.fulfilled,
      (state, action: PayloadAction<Contact>) => {
        const index = state.contacts.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index >= 0) state.contacts[index].status = "active";
      }
    );

    /* REMOVE CONTACT */
    builder.addCase(
      removeContact.fulfilled,
      (state, action: PayloadAction<Contact>) => {
        state.contacts = state.contacts.filter(
          (c) => c._id !== action.payload._id
        );
      }
    );
  },
});

/* ================= SELECTORS ================= */

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectContactsLoading = (state: RootState) =>
  state.contacts.loading;
export const selectContactsError = (state: RootState) => state.contacts.error;

export const { clearContactsState, clearError } = contactsSlice.actions;
export default contactsSlice.reducer;
