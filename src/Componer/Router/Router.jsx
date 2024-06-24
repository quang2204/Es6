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
export default function Router() {
  const [data, setData] = useState([]);
  const [user, setuser] = useState([]);
  const [local, setLocal] = useState(false);
  
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
  };
  const deletes = async (id) => {
    if (confirm("Delete successfully, redirect to admin page?")) {
      await Productdelete(id);
      setData(data.filter((item) => item.id !== id));
    }
  };
   const localData = localStorage.getItem("user");
  useEffect(() => {
   
    if (localData) {
      setLocal(true);
    } else {
      setLocal(false);
    }
  }, [navigate]);
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
  const Dk = async (datas) => {
    const res = await Registeruser(datas);
    setuser(res.data);
    navigate("/login");
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Shop local={local} setLocal={setLocal} localData={localData}/>}>
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
            element={<Admin data={data} deletes={deletes} local={local}></Admin>}
          ></Route>
          <Route
            path="/admin/productadd"
            element={<Add submit={submit}></Add>}
          ></Route>
          <Route
            path="/admin/update/:id"
            element={<Update UpdateProduct={UpdateProduct}></Update>}
          ></Route>
          <Route path="/admin/Login" element={<Login></Login>}></Route>
          <Route
            path="/admin/Register"
            element={<Register Dk={Dk}></Register>}
          ></Route>
          <Route path="/cart" element={<GioHang></GioHang>}></Route>
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}
