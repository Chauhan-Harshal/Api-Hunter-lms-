import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const BookURL = "http://localhost:3000/books";

//API calling

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
    const res = await axios.get(BookURL)

    return res.data

})

// Add Book in API
export const addBook = createAsyncThunk("addBook", async (book) => {
    const res = await axios.post(BookURL, book)

    return res.data;
});
//Delete book in Api
export const deleteBook = createAsyncThunk("deleteBook", async (id) => {
    const res = await axios.delete(`${BookURL}/${id}`)
    return res.id
});


// Fetch a single book by ID
export const fetchBookById = createAsyncThunk("books/fetchBookById", async (id) => {
  const res = await axios.get(`${BookURL}/${id}`);
  return res.data; // axios response has data property
});

// Edit a book
export const editBook = createAsyncThunk("books/editBook", async ({ id, updatedData }) => {
  const res = await axios.put(`${BookURL}/${id}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
});


const initialState = {
    books: [],
    status: "neutral",
    error: null
}

const bookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {},
    // API
    extraReducers: (builder) => {

        // Api Calling Cases
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "success";
            state.books = action.payload
        })

        builder.addCase(fetchBooks.rejected, (state) => {
            state.status = "error"

        })


        // Add Book in Api Cases

        builder.addCase(addBook.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(addBook.fulfilled, (state, action) => {
            state.status = "success";
            state.books.push(action.payload);
        });

        builder.addCase(addBook.rejected, (state) => {
            state.status = "something went wrong"
        });

        //Delete Book in Api cases
        builder.addCase(deleteBook.pending, (state) => {
            state.status = "loding"
        });

        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.status = "success";
            state.books.splice(action.payload, 1);
        });
        builder.addCase(deleteBook.rejected, (state) => {
            state.status = "error"
        });

        // fetch one
      builder.addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleBook = action.payload;
      })
      builder.addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // edit book
      builder.addCase(editBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedBook = action.payload;
        // update in books list
        const index = state.books.findIndex((b) => b.id === updatedBook.id);
        if (index !== -1) {
          state.books[index] = updatedBook;
        }
        // update singleBook
        state.singleBook = updatedBook;
      })
    }
})

export default bookSlice.reducer


