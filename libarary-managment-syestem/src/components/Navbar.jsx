// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/authSlice";
// import "./navbar.css";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const user = useSelector((s) => s.auth.user);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem("auth");
//     navigate("/AdminLogin");
//   };

//   if (!user) return null;

//   // ✅ Admin menu
//   const adminMenu = [
//     { id: 1, title: "Overview", path: "/overview", icon: "fas fa-tachometer-alt" },
//     { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
//     { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
//     { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
//   ];

//   // ✅ User menu
//   const userMenu = [
//     { id: 1, title: "Overview", path: "/overview", icon: "fas fa-tachometer-alt" },
//     { id: 2, title: "Books", path: "/book", icon: "fas fa-book" },
//   ];

//   // ✅ Show menu based on role
//   const PageData = user.role?.toLowerCase() === "admin" ? adminMenu : userMenu;

//   return (
//     <div className="layout">
//       {/* Top Navbar */}
//       <div className="top-navbar">
//         <div className="left">
//           <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
//             <i className="fas fa-bars"></i>
//           </button>
//           <span className="logo">The Readers Planet</span>
//         </div>

//         {/* Profile + Logout */}
//         <div className="right">
//           <div className="profile">
//             <i className="fas fa-user-circle"></i>
//             <div className="profile-info">
//               <span className="role">{user.role?.toUpperCase()}</span>
//               <span className="status">
//                 <span className="dot"></span> Online
//               </span>
//             </div>
//           </div>
//           <button className="logout-btn" onClick={handleLogout}>
//             <i className="fas fa-sign-out-alt"></i> LogOut
//           </button>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
//         <nav className="sidebar">
//           <div className="list-group">
//             {PageData.map((el) => (
//               <NavLink
//                 key={el.id}
//                 to={el.path} 
//                 className={({ isActive }) =>
//                   "list-group-item" + (isActive ? " active" : "")
//                 }
//               >
//                 <i className={`${el.icon} fa-fw me-3`}></i>
//                 {isOpen && <span>{el.title}</span>}
//               </NavLink>
//             ))}
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import "./navbar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/AdminLogin");
  };

 const adminMenu = [
  { id: 1, title: "Overview", path: "/overview", icon: "fas fa-chart-pie" },      // Dashboard
  { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-book-medical" },    // Add Book
  { id: 3, title: "Books", path: "/book", icon: "fas fa-book-open" },             // Books List
  { id: 4, title: "Members", path: "/member", icon: "fas fa-user-friends" },      // Members
  { id: 5, title: "Issue", path: "/issue", icon: "fas fa-book-reader" }, 
  { id: 6, title: "Return/Fine", path: "/return", icon: "fas fa-book-reader" },         // Issue Book
];

const userMenu = [
  { id: 1, title: "Home", path: "/userdashboard", icon: "fas fa-home" },      // Dashboard/Home
  { id: 2, title: "Books", path: "/userbook", icon: "fas fa-book-open" },         // Books
  { id: 3, title: "Borrow", path: "/borrow", icon: "fas fa-book-reader" },            // Borrowed Books
  { id: 4, title: "Profile", path: "/user/profile", icon: "fas fa-id-badge" },    // Profile
];



  const PageData = user.role?.toLowerCase() === "admin" ? adminMenu : userMenu;

  return (
    <div className="layout">
      <div className="top-navbar">
        <div className="left">
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <span className="logo">The Reader's Planet</span>
        </div>
        <div className="right">
          <div className="profile">
            <i className="fas fa-user-circle"></i>
            <div className="profile-info">
              <span className="role">{user.role?.toUpperCase()}</span>
              <span className="status">
                <span className="dot"></span> Online
              </span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> LogOut
          </button>
        </div>
      </div>

      <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
        <nav className="sidebar">
          <div className="list-group">
            {PageData.map((el) => (
              <NavLink
                key={el.id}
                to={el.path}
                className={({ isActive }) =>
                  "list-group-item" + (isActive ? " active" : "")
                }
              >
                <i className={`${el.icon} fa-fw me-3`}></i>
                {isOpen && <span>{el.title}</span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}