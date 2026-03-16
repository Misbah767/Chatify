import api from "./axios";

export const messageService = {
  // ================= SEND TEXT =================

  sendMessage: async (payload: { receiverId: string; text: string }) => {
    const res = await api.post("/messages", payload);

    return res.data.data;
  },

  // ================= SEND MEDIA =================

  sendFileMessage: async ({
    receiverId,
    file,
    messageType,
  }: {
    receiverId: string;
    file: File;
    messageType: string;
  }) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("receiverId", receiverId);
    formData.append("messageType", messageType);

    const res = await api.post("/messages/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  },

  // ================= GET MESSAGES =================

  getMessages: async (conversationId: string, page = 1, limit = 30) => {
    const res = await api.get(
      `/messages/${conversationId}?page=${page}&limit=${limit}`
    );

    return res.data.data;
  },

  // ================= SEEN =================

  markMessageSeen: async (messageId: string) => {
    const res = await api.patch(`/messages/seen/${messageId}`);

    return res.data.data;
  },

  // ================= DELETE =================

  deleteMessage: async (messageId: string) => {
    const res = await api.delete(`/messages/${messageId}`);

    return res.data.data;
  },

  // ================= CLEAR CHAT =================

  clearConversation: async (conversationId: string) => {
    const res = await api.delete(`/messages/clear/${conversationId}`);

    return res.data.data;
  },
};
