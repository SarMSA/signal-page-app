import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LinkHandl = () => {
  return;
};

export default function Navigation() {
  const { currentUser } = useAuthContext();

  const { pathname } = useLocation();

  var navLinks = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "My Stock Images", link: "/stockImages" },
  ];

  if (!currentUser) {
    navLinks = navLinks.filter((item) => item.title !== "My Stock Images");
  }
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {navLinks.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link
            className={`nav-link ${pathname === item.link ? "active" : ""}`}
            aria-current="page"
            to={item.link}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
