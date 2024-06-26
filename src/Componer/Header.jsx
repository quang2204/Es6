import { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
const Header = ({ local, localData, setLocal }) => {
  const [search, setSearch] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();
  const location = window.location.pathname;

  const logout = () => {
    localStorage.clear();
    setLocal(false);
  };
  // console.log(localData);
  const handleSearch = () => {
    if (search) {
      navigate(`/product/${search}`);
    } else if (search == "") {
      navigate("/product");
    }
  };
  useEffect(() => {
    const callback = (e) => {
      if (e.key === "Escape") {
        setCheckbox(false);
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  });
  const user = JSON.parse(localStorage.getItem("user"))?.accessToken;
  return (
    <div className="sticky top-0 z-20">
      <nav>
        <div className="dt" onClick={() => setCheckbox(true)}>
          <input type="checkbox" id="checkbox_toggle" />
          <label
            htmlFor="checkbox_toggle"
            className="hamburger"
            style={{ cursor: "pointer" }}
          >
            &#9776;
          </label>
        </div>
        <div className={`logo my-2`}>
          <NavLink to="/">
            <img
              className=""
              src="http://hoaqua.langsonweb.com/wp-content/uploads/2020/09/logo-hoa-qua.png"
              alt=""
            />
          </NavLink>
        </div>
        <div className="tk" id="">
          <input
            type="search"
            placeholder="Tìm kiếm "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <i className="bi bi-search text-base" onClick={handleSearch}></i>
        </div>
        <div className={"nav " + (checkbox ? "none" : "")}>
          <div id="thoat" onClick={() => setCheckbox(false)}>
            <i className="bi bi-x-lg"></i>
          </div>
          <ul className="menu text-xl">
            <li
              className={`pd ${location === "/" && "activex"}`}
              onClick={() => setCheckbox(false)}
            >
              <NavLink to="/" className="tt pa" id="tt">
                Trang chủ
              </NavLink>
            </li>
            <li
              className={`pd ${location === "/product" && "activex"} `}
              onClick={() => setCheckbox(false)}
            >
              <NavLink
                to="product"
                className="tt"
                id="li"
                style={{ display: "flex; align-items: center; padding: 0 5px" }}
              >
                Sản phẩm
              </NavLink>
            </li>
            <li
              className={`pd ${location === "/admin" && "activex"} `}
              onClick={() => setCheckbox(false)}
            >
              <NavLink to="/admin" className="tt pa" id="tt">
                Admin
              </NavLink>
            </li>
            <li className={`pd `} onClick={() => setCheckbox(false)}>
              <NavLink to="" className="tt pa" id="tt">
                Tin tức
              </NavLink>
            </li>
            <li className={`pd `} onClick={() => setCheckbox(false)}>
              <NavLink to="#" className="tt pa" id="tt">
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </div>
        {user ? (
          <div className="flex items-center">
            <li className={`mr-10 ${location === "/cart" && "activex"} `}>
              <NavLink to="/cart">
                <i className="bi bi-cart tt text-[16px] " id="tt"></i>
              </NavLink>
            </li>
            <li
              className={`mr-10 text-xl ${
                location === "/admin/Login" && "activex"
              } `}
            >
              <button className="tt pa" onClick={logout}>
                Đăng xuất
              </button>
            </li>
          </div>
        ) : (
          <div className="flex text-xl">
            <li
              className={`mr-10 ${location === "/admin/Login" && "activex"} `}
            >
              <NavLink to="admin/Login" className="tt pa">
                Đăng Nhập
              </NavLink>
            </li>
            <li
              className={`mr-10 ${
                location === "/admin/Register" && "activex"
              } `}
            >
              <NavLink className="tt pa" to="admin/Register">
                Đăng ký
              </NavLink>
            </li>
          </div>
        )}
      </nav>
    </div>
  );
};
export default Header;
