import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  fetchProfile,
  updateProfile,
  fetchUsers,
  fetchUserById,
} from "../actions/user.actions";

/* ================= USER TYPE ================= */
export interface User {
  _id: string;
  name: string;
  email?: string;
  profilePic?: string;
  bio?: string;
  status?: string;
  lastSeen?: string | null;
}

/* ================= USERS RESPONSE ================= */
interface UsersResponse {
  data: User[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/* ================= SLICE STATE ================= */
interface UserState {
  users: UsersResponse | null;
  profile?: User;
  selectedUser?: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  profile: undefined,
  selectedUser: undefined,
  loading: false,
  error: null,
};

/* ================= SLICE ================= */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState(state) {
      state.users = null;
      state.profile = undefined;
      state.selectedUser = undefined;
      state.loading = false;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },

    removeUserRealtime(state, action: PayloadAction<string>) {
      if (!state.users?.data) return;

      state.users.data = state.users.data.filter(
        (user) => user._id !== action.payload
      );
    },

    addUserRealtime(state, action: PayloadAction<User>) {
      if (!state.users?.data) return;

      const exists = state.users.data.find((u) => u._id === action.payload._id);

      if (!exists) state.users.data.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    /* ================= FETCH PROFILE ================= */
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ================= FETCH USER BY ID ================= */
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.selectedUser = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ================= UPDATE PROFILE ================= */
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    /* ================= FETCH USERS ================= */
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UsersResponse>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= SELECTORS ================= */
export const selectUsers = (state: RootState) => state.user.users;
export const selectProfile = (state: RootState) => state.user.profile;
export const selectSelectedUser = (state: RootState) => state.user.selectedUser;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

/* ================= EXPORTS ================= */
export const {
  clearUserState,
  clearError,
  removeUserRealtime,
  addUserRealtime,
} = userSlice.actions;

export default userSlice.reducer;
