import React from "react";

import { NavLink } from "react-router-dom";
import Hearder from "./Header";
import Footer from "./Footer";
const Errors = () => {
  return (
    <>
      <Hearder></Hearder>
      <div className=" max-w-[1200px] mx-auto">
        <div className=" my-10">
          <img
            src="https://cf.quizizz.com/image/Group1.png"
            className="max-w-[200px] m-auto"
            alt=""
          />
          <br />
          <h2 className="text-[1.5rem] font-semibold text-center">
            Không tìm thấy trang
          </h2>
          <br />
          <NavLink to="/">
            <div className="flex justify-center">
              <button className="bg-purple-300 text-white px-3 py-2 rounded-md">
                Về trang chủ
              </button>
            </div>
          </NavLink>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Errors;
