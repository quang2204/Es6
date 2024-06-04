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
} from "../../Api/Api";
import GioHang from "../Giohang";
import Update from "../Admin/Update";

export default function Router() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    sp();
  }, []);
  const sp = async () => {
    const res = await GetProduct();
    setData(res.data);
  };
  const submit = (datas) => {
    (async () => {
      try {
        const res = await Productadd(datas);
        setData([res.data, ...data]);
        if (confirm("Submit successfully, redirect to admin page?")) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // console.log(datas);
  };
  const deletes = async (id) => {
    if (confirm("Delete successfully, redirect to admin page?")) {
      const res = await Productdelete(id);
      setData(data.filter((item) => item.id !== id));
      navigate("/admin");
    }
  };
  const UpdateProduct = (datas) => {
    (async () => {
      try {
        const res = await Productupdate(datas.id, datas);
        setData(data.map((item) => (item.id === datas.id ? res.data : item)));
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Shop />}>
          <Route index element={<Index data={data}></Index>}></Route>
          <Route
            path="/product"
            element={<Product data={data}></Product>}
          ></Route>
          <Route
            path="/product/:id"
            element={<Product data={data}></Product>}
          ></Route>
          <Route path="/detail/:id" element={<Detail></Detail>}></Route>
          <Route
            path="/admin"
            element={<Admin data={data} deletes={deletes}></Admin>}
          ></Route>
          <Route
            path="/admin/productadd"
            element={<Add submit={submit}></Add>}
          ></Route>
          <Route
            path="/admin/update/:id"
            element={<Update UpdateProduct={UpdateProduct}></Update>}
          ></Route>
          <Route path="/cart" element={<GioHang></GioHang>}></Route>
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}
