// frontend/redux/store.ts
"use client";

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/redux/slices/auth.slice";
import userReducer from "@/redux/slices/user.slice";
import friendRequestReducer from "@/redux/slices/friendRequest.slice";
import notificationReducer from "@/redux/slices/notification.slice";
import contactsReducer from "@/redux/slices/contactsSlice";
import messagesReducer from "@/redux/slices/message.slice";
import conversationReducer from "@/redux/slices/conversation.slice";
import callReducer from "@/redux/slices/call.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    friendRequest: friendRequestReducer,
    notification: notificationReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
    conversations: conversationReducer,
    calls: callReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
