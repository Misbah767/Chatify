import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserById } from "@/redux/actions/user.actions";
import { AppDispatch } from "@/redux/store";
import { User } from "@/redux/slices/user.slice";

export const useChatUsers = (messages: any[]) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userProfiles, setUserProfiles] = useState<Record<string, User>>({});

  useEffect(() => {
    if (!messages) return;

    const unknownIds = new Set<string>();

    messages.forEach((msg: any) => {
      const senderId =
        typeof msg.sender === "object" ? msg.sender._id : msg.sender;

      if (senderId && !userProfiles[senderId]) {
        unknownIds.add(senderId);
      }
    });

    unknownIds.forEach((id) => {
      dispatch(fetchUserById(id))
        .unwrap()
        .then((profile) => {
          setUserProfiles((prev) => ({ ...prev, [id]: profile }));
        })
        .catch(() => {});
    });
  }, [messages]);

  return userProfiles;
};
