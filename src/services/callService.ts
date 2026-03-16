import api from "./axios";

export const callService = {
  /**
   * GET call history for a user
   * @param userId string
   * @param options { type?: 'audio'|'video', status?: 'ongoing'|'ended'|'missed'|'rejected', limit?: number, skip?: number }
   */
  getCallHistory: async (
    userId: string,
    options?: {
      type?: "audio" | "video";
      status?: "ongoing" | "ended" | "missed" | "rejected";
      limit?: number;
      skip?: number;
    }
  ) => {
    const params: any = {};
    if (options?.type) params.type = options.type;
    if (options?.status) params.status = options.status;
    if (options?.limit) params.limit = options.limit;
    if (options?.skip) params.skip = options.skip;

    const res = await api.get(`/calls/history/${userId}`, { params });
    return res.data.calls;
  },
};
