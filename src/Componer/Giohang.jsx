import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../Context/CreateContext";
import { toast } from "react-toastify";

const Giohang = () => {
  const { cart, dispatch } = useData();
  console.log(cart[0]);
  // const cart = JSON.parse(localStorage.getItem("cart"));
  const pre = (id, quantity) => {
    if (quantity > 1) {
      dispatch({ type: "PRE", payload: id });
    }
  };

  const next = (id, quantity, maxorder) => {
    if (quantity >= maxorder) {
      toast.error(`Đã vượt quá số lượng tối đa ${maxorder}`);
    } else {
      dispatch({ type: "NEXT", payload: id });
    }
  };
  const handleChange = (id, e, maxorder, quantity) => {
    const value = Number(e.target.value);
    if (value <= maxorder) {
      dispatch({ type: "CHANGE", payload: { id, quantity: value, maxorder } });
    } else {
      toast.error("Đã vượt quá số lượng tối đa");
      dispatch({ type: "CHANGE", payload: { id, quantity, maxorder } });
    }
  };
  const handleDelete = (id) => {
    try {
      dispatch({ type: "REMOVE", payload: id });
      toast.success("Xóa thành công thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="gh mt-10" id="gh">
        {cart.length === 0 ? (
          <div className="chua-sp">
            <p
              style={{ marginTop: "50px", fontSize: "17px" }}
              className="spp-p"
            >
              Chưa có sản phẩm nào trong giỏ hàng.
            </p>
            <Link to="/">
              <button className="buttonn">Quay trở lại cửa hàng</button>
            </Link>
          </div>
        ) : (
          <div className="spp">
            <form action="">
              <table>
                <thead>
                  <tr>
                    <th className="product th left pr-[200px]" colSpan="3">
                      Sản phẩm
                    </th>
                    <th className="product-prices th center block">Giá</th>
                    <th className="product-quantity center">Số lượng</th>
                    <th className="product-subtotal right block">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <>
                      <tr className={`cart-item `} key={index}>
                        <td>
                          <div
                            className="remote"
                            onClick={() => handleDelete(item.datas.id)}
                          >
                            <p>x</p>
                          </div>
                        </td>
                        <td className="product-thumbnail th">
                          <img src={item.datas.thumbnail} alt="" />
                        </td>
                        <td className=" nk">
                          <div className="product-name">
                            {item.datas.title}
                          </div>

                          <div> Sl: {item.datas.minimumOrderQuantity}</div>
                        </td>
                        <td className="product-price amount th">
                          {item.datas.price}$
                        </td>
                        <td className="quantity th">
                          <button
                            className="is-form minus"
                            type="button"
                            onClick={() =>
                              pre(item.datas.id, item.quantity)
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="input-qty"
                            step="1"
                            min="0"
                            max="100"
                            value={item.quantity}
                            onChange={(e) => {
                              handleChange(
                                item.datas.id,
                                e,
                                item.datas.minimumOrderQuantity,
                                item.quantity
                              );
                            }}
                          />
                          <button
                            className="is-form plus"
                            type="button"
                            onClick={() =>
                              next(
                                item.datas.id,
                                item.quantity,
                                item.datas.minimumOrderQuantity
                              )
                            }
                          >
                            +
                          </button>
                        </td>
                        <td className="product-price amount tong right">
                          <p>
                            {(item.datas.price * item.quantity).toFixed(2)}$
                          </p>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <Link to={"/"}>
                <button className="muasam">
                  <i className="bi bi-arrow-left"></i> Tiếp tục mua sắp
                </button>
              </Link>

              <button className="cn" type="button">
                Cập nhật giỏ hàng
              </button>
            </form>
            <div className="thanhtoan">
              <div className="tinhtong">
                <h4>Tính tổng đơn hàng</h4>
              </div>
              <div className="tongs">
                <div className="tongphu">
                  <p>Tiền vận chuyển</p>
                  <h4>0 $</h4>
                </div>
                <div className="tongss">
                  <p>Tổng thanh toán</p>
                  <h4 className="tong-h4 right">
                    {cart
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                    $
                  </h4>
                </div>
              </div>
              <div className="pay">
                <button className="thtt">Tiến hành thanh toán</button>
                <br />
                <button className="uudai">
                  <i className="bi bi-tag-fill"></i>Phiếu ưu đãi
                </button>

                <input type="text" placeholder="Mã ưu đãi" />
                <br />
                <button className="ad">Áp dụng</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Giohang;
