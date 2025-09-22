import React, { useEffect, useState } from "react";
import "./Books.css";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editBook, setEditBook] = useState(null);
  const [viewBook, setViewBook] = useState(null); // ✅ view modal ke liye state
  const booksPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const genres = ["All", ...new Set(books.map((book) => book.genre))];

  const filteredBooks = books
    // .filter(
    //   (book) =>
    //     (selectedGenre === "All" || book.genre === selectedGenre) &&
    //     (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //       book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    // )
    // .sort((a, b) => {
    //   if (sortOrder === "asc") return a.rent - b.rent;
    //   return b.rent - a.rent;
    // });

  .filter((book) =>
    (selectedGenre === "All" || book.genre === selectedGenre) &&
    (
      (book.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")) ||
      (book.author?.toLowerCase().includes(searchTerm?.toLowerCase() || ""))
    )
  )
  // .sort((a, b) => a.title.localeCompare(b.title));
  .sort((a, b) => (a.title || "").localeCompare(b.title || ""));



  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    fetch(`http://localhost:3000/books/${editBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setBooks(books.map((b) => (b.id === data.id ? data : b)));
        setEditBook(null);
      })
      .catch((err) => console.error("Error saving book:", err));
  };

  return (
    <div className="books-container">
      <h2 className="books-title">All Books</h2>

      {/* Controls */}
      <div className="books-controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="asc">Sort by Rent: Low to High</option>
          <option value="desc">Sort by Rent: High to Low</option>
        </select>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-dropdown"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {currentBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.cover}
              alt={book.title}
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#viewModal"
              onClick={() => setViewBook(book)} // ✅ view modal open
              //  onClick={() => navigate(`/description/${book.id}`)}// ✅ view modal open
            />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <div className="book-actions">
              <button
                className="edit-btn"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                onClick={() => setEditBook(book)}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Are you sure to delete this book?")) {
                    fetch(`http://localhost:3000/books/${book.id}`, {
                      method: "DELETE",
                    })
                      .then(() => {
                        setBooks(books.filter((b) => b.id !== book.id));
                      })
                      .catch((err) => console.error(err));
                  }
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="page-btn"
        >
          ⬅ Prev
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          Next ➡
        </button>
      </div>

    
      <div
        className="modal fade"
        id="viewModal"
        tabIndex="-1"
        aria-labelledby="viewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {viewBook && (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewModalLabel">
                  {viewBook.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setViewBook(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={viewBook.cover}
                  alt={viewBook.title}
                  className="img-fluid mb-3"
                />
                <p><strong>Author:</strong> {viewBook.author}</p>
                <p><strong>Genre:</strong> {viewBook.genre}</p>
                <p><strong>Rent:</strong> ₹{viewBook.rent}</p>
                <p><strong>Description:</strong></p>
                <p>{viewBook.description}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setViewBook(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

   
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {editBook && (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit Book
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditBook(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  className="form-control mb-2"
                  value={editBook.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="author"
                  className="form-control mb-2"
                  value={editBook.author}
                  onChange={handleEditChange}
                  placeholder="Author"
                />
                <input
                  type="number"
                  name="rent"
                  className="form-control mb-2"
                  value={editBook.rent}
                  onChange={handleEditChange}
                  placeholder="Rent"
                />
                <input
                  type="text"
                  name="genre"
                  className="form-control mb-2"
                  value={editBook.genre}
                  onChange={handleEditChange}
                  placeholder="Genre"
                />
                <input
                  type="text"
                  name="cover"
                  className="form-control mb-2"
                  value={editBook.cover}
                  onChange={handleEditChange}
                  placeholder="Cover URL"
                />
                <textarea
                  name="description"
                  className="form-control mb-2"
                  value={editBook.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setEditBook(null)}
                >
                  Close
                </button>
                <button style={{backgroundColor:"#7d5a08" ,color:"white"}}
                  type="button"
                  className="btn"
                  onClick={saveChanges}
                  data-bs-dismiss="modal"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;