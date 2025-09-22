import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//API calling

export const fetchIssue= createAsyncThunk("fetchIssue", async() => {
    const res = await axios.get("http://localhost:3000/issue")

    return res.data
})

const initialState = {
    issue: [],
    status: "neutral",
    error: null
}

const issueSlice= createSlice({
    name: "issue",
    initialState: initialState,
    reducers: {},
// API
    extraReducers: (builder) => {
        builder.addCase(fetchIssue.pending, (state) => {
            state.status = "loding.."
        });

        builder.addCase(fetchIssue.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchIssue.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })

    }
})

export default issueSlice.reducer