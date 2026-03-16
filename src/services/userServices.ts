import api from "./axios";

export const userService = {
  /* ================= GET MY PROFILE ================= */
  getMyProfile: async () => {
    const res = await api.get("/users/profile");
    return res.data.data;
  },

  /* ================= GET USER BY ID ================= */
  getUserById: async (id: string) => {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  },

  /* ================= UPDATE PROFILE ================= */
  updateMyProfile: async (payload: {
    name?: string;
    bio?: string;
    photo?: File;
  }) => {
    const formData = new FormData();

    if (payload.name) formData.append("name", payload.name);
    if (payload.bio) formData.append("bio", payload.bio);
    if (payload.photo) formData.append("avatar", payload.photo);

    const res = await api.put("/users/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },

  /* ================= GET USERS LIST ================= */
  getUsers: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams({
      search: params?.search || "",
      page: String(params?.page || 1),
      limit: String(params?.limit || 10),
    }).toString();

    const res = await api.get(`/users?${query}`);
    return res.data.data;
  },
};
