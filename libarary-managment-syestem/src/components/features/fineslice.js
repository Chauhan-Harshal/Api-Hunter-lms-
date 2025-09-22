import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//API calling

export const fetchFines = createAsyncThunk("fetchFines", async() => {
    const res = await axios.get("http://localhost:3000/fines")

    return res.data
})

const initialState = {
    fines: [],
    status: "neutral",
    error: null
}

const finseSlice= createSlice({
    name: "fine",
    initialState: initialState,
    reducers: {},
// API
    extraReducers: (builder) => {
        builder.addCase(fetchFines.pending, (state) => {
            state.status = "loding.."
        });

        builder.addCase(fetchFines.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchFines.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload.error
        })

    }
})

export default finseSlice.reducer