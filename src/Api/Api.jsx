import React from "react";
import Axio from "../Api/Axio";
const GetProduct = () => {
  return Axio.get("/products");
};

const ProductDetail = (id) => {
  return Axio.get(`/products/${id}`);
};
const Productadd = (data) => {
  return Axio.post("/products", data);
};
const Productdelete = (id) => {
  return Axio.delete(`/products/${id}`);
};
const Productupdate = (id, data) => {
  return Axio.patch(`/products/${id}`, data);
};
const Registeruser = (data) => {
  return Axio.post("/register", data);
};
const Getusers = () => {
  return Axio.get("/user");
};
const Login=(data)=>{
  return Axio.post("/login",data)
}
export {
  GetProduct,
  ProductDetail,
  Productadd,
  Productdelete,
  Productupdate,
  Registeruser,
  Getusers,
};
