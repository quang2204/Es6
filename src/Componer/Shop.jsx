import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Shop = ({ local,localData,setLocal }) => {
  return (
    <div>
      <Header local={local} localData={localData} setLocal={setLocal}></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Shop;
