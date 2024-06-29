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
import { ToastContainer, toast } from "react-toastify";
const initSate = {
  data: [],
  cart: [],
};
const init = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? { ...initSate, cart: JSON.parse(storedCart) } : initSate;
};

const DataContext = createContext();

const reducer = (state, action) => {
  console.log(action.payload);
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
    case "cart":
      // Kiểm tra xem mặt hàng đã tồn tại trong giỏ hàng
      try {
        const itemIndex = state.cart.findIndex(
          (item) => item.id === action.payload.datas.id
        );

        let updatedCart;

        if (itemIndex >= 0) {
          // Update quantity of existing item
          updatedCart = state.cart.map((item, index) => {
            if (index === itemIndex) {
              return { ...item, quantity: action.payload.quantity + 1 };
            }
            return item;
          });
        } else {
          // Add new item to cart
          const newCartItem = {
            ...action.payload,
            quantity: action.payload.quantity,
          };
          updatedCart = [newCartItem, ...state.cart];
        }
        return { ...state, cart: updatedCart };
      } catch (error) {
        toast.error(error.message);
        return state;
      }

    case "PRE":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };

    case "NEXT":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case "CHANGE":
      // if (action.payload.quantity > action.payload.maxorder) {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        }),
      };
    // } else {
    //   console.log(action.payload.quantity, action.payload.maxorder);
    // }
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
const CreateContext = ({ children }) => {
  const [{ data, cart }, dispatch] = React.useReducer(reducer, initSate, init);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
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

  const UpdateProduct = async (updatedProduct) => {
    try {
      const response = await Productupdate(updatedProduct.id, updatedProduct);
      dispatch({ type: "update", payload: response.data });
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };
  const Dk = async (datas) => {
    const res = await Registeruser(datas);
    navigate("/login");
  };
  const AddCart = (datas, quantity) => {
    dispatch({ type: "cart", payload: { datas, quantity } });
    toast.success(
      `Sản phẩm ${datas.title} đã được thêm vào giỏ hàng thành công`
    );
  };
  return (
    <div>
      <DataContext.Provider
        value={{
          data,
          submit,
          deletes,
          UpdateProduct,
          Dk,
          dispatch,
          AddCart,
          cart,
          init,
        }}
      >
        {children}
      </DataContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
