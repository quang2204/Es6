import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Admin = ({ local, data, deletes }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!local) {
      navigate("/admin/Login");
    }
  }, [local, navigate]);
  return (
    <>
      <button className="flex justify-end max-w-[1480px] w-full mt-4">
        <NavLink
          to="/admin/productadd"
          className="bg-green-600 text-white px-3 py-1 rounded-md"
        >
          Add
        </NavLink>
      </button>
      <div
        className="my-4 mb-10 max-w-[1450px] m-auto rounded-xl"
        style={{ boxShadow: "0px 1px 10px 1px #b7b3b3" }}
      >
        <table>
          <thead>
            <tr>
              <th className="py-5 px-3 text-center">Stt </th>
              <th className="py-5 px-3 text-center">Name</th>
              <th className="py-5 px-3 text-center">Price </th>
              <th className="py-5 px-3 text-center">Brand</th>
              <th className="py-5 px-3 text-center">Category</th>
              <th className="py-5 px-3 text-center">Image</th>
              <th className="py-5 px-3 text-center">Active</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="text-center" key={index}>
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{item.title}</td>
                <td className="py-4">{item.price} đ</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>
                  <img
                    src={item.thumbnail}
                    width={100}
                    style={{ height: "70px", margin: "auto" }}
                    alt=""
                  />
                </td>
                <td className="py-4 flex items-center justify-center gap-4">
                  <button className="xoa" onClick={() => deletes(item.id)}>
                    <p>Xóa</p>
                    <i className="bi bi-trash text-white"></i>
                  </button>
                  <Link to={`/admin/update/${item.id}`}>
                    <button className="w-[90px] bg-black h-[2.6em] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                      Cập nhật
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
