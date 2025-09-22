import { useState, useEffect } from "react";
import axios from "axios";
import "./Issue.css"

export default function AdminIssueBook() {
  const [formData, setFormData] = useState({
    memberEmail: "",
    bookName: "",
    issueDate: "",
    dueDate: "",
    rent: "",
  });

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));

    axios.get("http://localhost:3000/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));

    const stored = JSON.parse(localStorage.getItem("issuedBooks")) || [];
    setIssuedBooks(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = { ...formData, returned: false };
    const updated = [...issuedBooks, newBook];
    setIssuedBooks(updated);
    localStorage.setItem("issuedBooks", JSON.stringify(updated));

    alert("Book issued successfully ✅");

    setFormData({
      memberEmail: "",
      bookName: "",
      issueDate: "",
      dueDate: "",
      rent: "",
    });
  };

  const handleReturnToggle = (index) => {
    const updatedBooks = [...issuedBooks];
    updatedBooks[index].returned = !updatedBooks[index].returned;
    setIssuedBooks(updatedBooks);
    localStorage.setItem("issuedBooks", JSON.stringify(updatedBooks));
  };

  return (
    <div className="borrowed-container">
      <h2>Issue Book</h2>

      <form onSubmit={handleSubmit}>
        {/* Member Email with datalist for dropdown */}
        <input
          type="email"
          name="memberEmail"
          placeholder="Member Email"
          value={formData.memberEmail}
          onChange={handleChange}
          list="members-list"
          autoComplete="off"
          required
        />
        <datalist id="members-list">
          {members.map((m) => (
            <option key={m.id} value={m.email} />
          ))}
        </datalist>
        <br />

        {/* Book Name with datalist for dropdown */}
        <input
          type="text"
          name="bookName"
          placeholder="Book Name"
          value={formData.bookName}
          onChange={handleChange}
          list="books-list"
          autoComplete="off"
          required
        />
        <datalist id="books-list">
          {books.map((b) => (
            <option key={b.id} value={b.title} />
          ))}
        </datalist>
        <br />

        <input
          type="date"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="number"
          name="rent"
          placeholder="Rent"
          value={formData.rent}
          onChange={handleChange}
        />
        <br />

        <button type="submit" style={{backgroundColor:"#7d5a08" ,color:"white" , border:"none", padding: "10px" , marginLeft:"46%",borderRadius:"10px",width:"90px" }}>Issue</button>
      </form>

      <h2 style={{marginTop:"50px"}}>Issued Books</h2>
      <table className="borrowed-table">
        <thead>
          <tr>
            <th>Member Email</th>
            <th>Book Title</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Rent</th>
            <th>Returned</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No books issued yet
              </td>
            </tr>
          ) : (
            issuedBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.memberEmail || "Unknown"}</td>
                <td>{book.bookName}</td>
                <td>{book.issueDate}</td>
                <td>{book.dueDate}</td>
                <td>{book.rent}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={book.returned}
                    onChange={() => handleReturnToggle(index)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}