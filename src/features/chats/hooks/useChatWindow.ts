"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "@/redux/slices/auth.slice";

import {
  fetchUserConversations,
  createOrGetConversation,
} from "@/redux/actions/conversation.actions";

import {
  selectConversations,
  selectConversationsLoading,
} from "@/redux/slices/conversation.slice";

export const useChatWindow = (receiverId: string) => {
  const dispatch = useDispatch<any>();

  const currentUser = useSelector(selectUser);
  const conversations = useSelector(selectConversations);
  const loadingConversations = useSelector(selectConversationsLoading);

  const [chatId, setChatId] = useState<string | null>(null);

  const fetchedRef = useRef(false);
  const createdRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  // MOBILE DETECT
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // FETCH CONVERSATIONS
  useEffect(() => {
    if (!currentUser?._id) return;

    if (fetchedRef.current) return;

    fetchedRef.current = true;

    dispatch(fetchUserConversations());
  }, [currentUser?._id, dispatch]);

  // FIND OR CREATE CONVERSATION
  useEffect(() => {
    if (!receiverId || loadingConversations) return;

    const existing = conversations.find((c) =>
      c.participants.some((p) => p._id === receiverId)
    );

    if (existing) {
      if (chatId !== existing._id) setChatId(existing._id);
      return;
    }

    if (createdRef.current) return;

    createdRef.current = true;

    dispatch(createOrGetConversation(receiverId))
      .unwrap()
      .then((res: any) => setChatId(res?._id))
      .catch((err: any) => console.error(err));
  }, [receiverId, conversations, loadingConversations, dispatch, chatId]);

  // MOBILE HEIGHT STYLE
  const mobileHeightStyle = isMobile
    ? { height: "calc(100% - 60px)", maxHeight: "calc(100% - 60px)" }
    : { height: "100%", maxHeight: "100%" };

  return {
    chatId,
    mobileHeightStyle,
  };
};
