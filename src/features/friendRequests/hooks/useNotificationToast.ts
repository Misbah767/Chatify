// frontend/hooks/useNotificationToast.ts
"use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNotifications } from "@/redux/slices/notifications.slice";
import { showSuccessToast } from "@/components/ui/Toast/Toast";

export const useNotificationToast = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const prevNotifRef = useRef<string[]>([]);

  useEffect(() => {
    const prevIds = prevNotifRef.current;

    const newNotifications = notifications.filter(
      (n) => !prevIds.includes(n._id)
    );

    newNotifications.forEach((n) => {
      // Determine toast type
      if (n.type === "message_received") {
        showSuccessToast(` ${n.message}`);
      } else if (n.type.includes("friend_request")) {
        showSuccessToast(` ${n.message}`);
      } else {
        showSuccessToast(`${n.message}`);
      }

      // Mark notification as read automatically
    });

    prevNotifRef.current = notifications.map((n) => n._id);
  }, [notifications, dispatch]);
};
