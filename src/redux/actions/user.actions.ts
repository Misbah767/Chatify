import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "@/services/userServices";
import { User } from "../slices/user.slice";

/* ================= FETCH PROFILE ================= */
export const fetchProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    return await userService.getMyProfile();
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch profile"
    );
  }
});

/* ================= FETCH USER BY ID ================= */
export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    return await userService.getUserById(userId);
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch user"
    );
  }
});

/* ================= UPDATE PROFILE ================= */
export const updateProfile = createAsyncThunk<
  User,
  { name?: string; bio?: string; photo?: File },
  { rejectValue: string }
>("user/updateProfile", async (payload, { rejectWithValue }) => {
  try {
    return await userService.updateMyProfile(payload);
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to update profile"
    );
  }
});

/* ================= FETCH USERS ================= */
export const fetchUsers = createAsyncThunk<
  {
    data: User[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  },
  { search?: string; page?: number; limit?: number } | void,
  { rejectValue: string }
>("user/fetchUsers", async (params, { rejectWithValue }) => {
  try {
    return await userService.getUsers(params || {});
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch users"
    );
  }
});
