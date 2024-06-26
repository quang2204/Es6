import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Shop from "../Shop";
import Index from "../Index";
import Product from "../Product";
import Detail from "../Detail";
import Admin from "../Admin/Admin";
import Add from "../Admin/Add";
import Error from "../Error";
import {
  GetProduct,
  Productadd,
  Productdelete,
  Productupdate,
  Registeruser,
} from "../../Api/Api";
import GioHang from "../Giohang";
import Update from "../Admin/Update";
import Login from "../Admin/Login";
import Register from "../Admin/Register";
import { CreateContext } from "../../Context/CreateContext";

export default function Router() {
  return (

      <Routes>
        <Route path="/" element={<Shop />}>
          <Route index element={<Index></Index>}></Route>
          <Route path="/product" element={<Product></Product>}></Route>
          <Route path="/product/:id" element={<Product></Product>}></Route>
          <Route path="/detail/:id" element={<Detail></Detail>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route path="/admin/productadd" element={<Add></Add>}></Route>
          <Route path="/admin/update/:id" element={<Update></Update>}></Route>
          <Route path="/admin/Login" element={<Login></Login>}></Route>
          <Route path="/admin/Register" element={<Register></Register>}></Route>
          <Route path="/cart" element={<GioHang></GioHang>}></Route>
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
 
  );
}
