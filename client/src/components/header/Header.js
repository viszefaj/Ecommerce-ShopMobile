import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { selectedTab } from "../../redux/slice/adminSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const auth = useSelector((state) => state.auth);

  const path = window.location.pathname;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    dispatch(REMOVE_ACTIVE_USER());
    toast.success("Logout Success");
  };
  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          {path !== "/admin" && (
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              {!auth.isLoggedIn && (
                <>
                  <li>
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to="/"
                      className={activeLink}
                    >
                      Shop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to="/contact"
                      className={activeLink}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          )}
          {auth.role !== null && (
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              {auth.role === 'admin' && (<li>
                <Link
                  to='/items'
                  style={{ textDecoration: "none" }}
                  className={activeLink}
                >
                  Products
                </Link>
              </li>
              )}
              {auth.role === 'admin' && <li>
                <Link
                  to='/users'
                  style={{ textDecoration: "none" }}
                  className={activeLink}
                >
                  Users
                </Link>
              </li>}
              {auth.role === 'admin' && <li>
                <Link
                  to='/messages'
                  style={{ textDecoration: "none" }}
                  className={activeLink}
                >
                  Messages
                </Link>
              </li>}
              {(auth.role === 'admin' || auth.role === 'deliver') && <li>
                <Link
                  to='/orders'
                  style={{ textDecoration: "none" }}
                  className={activeLink}
                >
                  Orders
                </Link>
              </li>}
            </ul>
          )}
          <div className={styles["header-right"]} onClick={hideMenu} style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to="/login"
                  className={activeLink}
                >
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home" style={{
                  color: "#ff7722",
                  textDecoration: "none",
                }}>
                  <FaUserCircle size={15} />
                  Hi {auth.role === 'admin' ? 'admin' : auth.role === 'deliver' ? 'Deliver' : auth.email}
                </a>
              </ShowOnLogin>
              {(auth.role !== 'admin' && auth.role !== 'deliver') && <ShowOnLogin>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to="/my-orders"
                  className={activeLink}
                >
                  My Orders
                </NavLink>
              </ShowOnLogin>}

              <ShowOnLogin>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to="/"
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {(path !== "/admin" && auth.role !== "admin" || auth.role === 'deliver') && (
              <span className={styles.cart}>
                <Link style={{ textDecoration: "none" }} to="/cart">
                  <FaShoppingCart size={15} />
                  <p>{cartItems.length}</p>
                </Link>
              </span>
            )}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
