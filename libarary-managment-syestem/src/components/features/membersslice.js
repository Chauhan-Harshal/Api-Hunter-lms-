// src/features/membersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ members fetch
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const res = await fetch("http://localhost:3000/members");
    return await res.json();
  }
);

// ✅ member update
export const updateMember = createAsyncThunk(
  "members/updateMember",
  async (updatedMember) => {
    const res = await fetch(`http://localhost:3000/members/${updatedMember.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMember),
    });
    return await res.json();
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState: { members: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.members = action.payload;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(
          (m) => m.id === action.payload.id
        );
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      });
  },
});

export default membersSlice.reducer;