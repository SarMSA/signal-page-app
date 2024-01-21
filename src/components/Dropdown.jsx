import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const LogIn = () => {
  const { login, currentUser } = useAuthContext();
  return (
    !currentUser && (
      <button type="button" className="btn btn-warning" onClick={login}>
        Log in
      </button>
    )
  );
};
const LogOut = () => {
  const { logout, currentUser } = useAuthContext();

  return (
    !!currentUser && (
      <button type="button" className="btn btn-danger" onClick={logout}>
        Log out
      </button>
    )
  );
};

export default function Dropdown() {
  const { currentUser } = useAuthContext();

  const username = useMemo(() => {
    return currentUser?.displayName || "Profile";
  }, [currentUser]);

  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        className="rounded-circle"
        src={currentUser?.photoURL}
        alt={currentUser?.displayName}
        width="34"
        height="34"
      />
    ) : (
      "Log in"
    );
  }, [currentUser]);
  return (
    //     <!-- Example single danger button -->
    // <div class="btn-group">
    //   <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    //     Action
    //   </button>
    //   <ul class="dropdown-menu">
    //     <li><a class="dropdown-item" href="#">Action</a></li>
    //     <li><a class="dropdown-item" href="#">Another action</a></li>
    //     <li><a class="dropdown-item" href="#">Something else here</a></li>
    //     <li><hr class="dropdown-divider"></li>
    //     <li><a class="dropdown-item" href="#">Separated link</a></li>
    //   </ul>
    // </div>
    <div className=" btn-group">
      <button
        type="button"
        className="btn dropdown-toggle mt-3 mt-lg-0 border-0"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {avatar}
      </button>
      <ul
        className="dropdown-menu text-center"
        // style={{ left: "auto", minWidth: "auto" }}
      >
        {currentUser && (
          <li className="">
            <Link to={"/profile"}> {username}</Link>
          </li>
        )}
        {currentUser && (
          <li>
            <hr className="dropdown-divider" />
          </li>
        )}
        <li className="">
          <LogIn />
          <LogOut />
        </li>
      </ul>
    </div>
  );
}
