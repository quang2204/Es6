import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GetProduct,
  Productadd,
  Productdelete,
  Productupdate,
  Registeruser,
} from "../Api/Api";
import { useNavigate } from "react-router-dom";
const initSate = {
  data: [],
};
const DataContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "data":
      return {
        ...state,
        data: action.payload,
      };
    case "Add":
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case "Delete":
      return {
        ...state,
        data: state.data.filter((item) => item.id != action.payload),
      };
    case "update":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};
const CreateContext = ({ children }) => {
  const [{ data }, dispatch] = React.useReducer(reducer, initSate);
  const navigate = useNavigate();
  useEffect(() => {
    sp();
  }, []);
  const sp = async () => {
    const res = await GetProduct();
    dispatch({ type: "data", payload: res.data });
  };
  const submit = (datas) => {
    (async () => {
      try {
        const res = await Productadd(datas);
        dispatch({ type: "Add", payload: res.data });
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
      dispatch({ type: "Delete", payload: id });
    }
  };

  const UpdateProduct = (datas) => {
    (async () => {
      try {
        const res = await Productupdate(datas.id, datas);
        dispatch({ type: "update", payload: res.data });
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const Dk = async (datas) => {
    const res = await Registeruser(datas);
    navigate("/login");
  };
  return (
    <div>
      <DataContext.Provider value={{ data,submit,deletes,UpdateProduct,Dk, dispatch }}>
        {children}
      </DataContext.Provider>
    </div>
  );
};
const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export { DataContext, CreateContext, useData };
