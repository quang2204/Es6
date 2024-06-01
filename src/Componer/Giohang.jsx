import React from "react";
import { Link } from "react-router-dom";

const Giohang = () => {
  return (
    <div>
      <div className="gh mt-10" id="gh">
        {/* <div className="chua-sp">
          <p style={{ marginTop: "50px", fontSize: "17px" }} className="spp-p">
            Chưa có sản phẩm nào trong giỏ hàng.
          </p>
          <button className="buttonn">Quay trở lại cửa hàng</button>
        </div> */}

        <div className="spp">
          <form action="">
            <table>
              <thead>
                <tr>
                  <th className="product th left pr-[200px]" colSpan="3">
                    Sản phẩm
                  </th>
                  <th className="product-prices th center block">Giá</th>
                  <th className="product-quantity">Số lượng</th>
                  <th className="product-subtotal right block">Tổng</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cart-item">
                  <td>
                    <div className="remote">
                      <p>x</p>
                    </div>
                  </td>
                  <td className="product-thumbnail th"></td>
                  <td className="product-name nk">Vải nhập khẩu</td>
                  <td className="product-price amount th"></td>
                  <td className="quantity th">
                    <button className="is-form minus" type="button">
                      -
                    </button>
                    <input
                      type="text"
                      className="input-qty"
                      step="1"
                      min="0"
                      max="100"
                      // value="1"
                    />
                    <button className="is-form plus" type="button">
                      +
                    </button>
                  </td>
                  <td className="product-price amount tong right">
                    <p></p>
                  </td>
                  <br />
                </tr>
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
                <h4>30.000₫</h4>
              </div>
              <div className="tongss">
                <p>Tổng thanh toán</p>
                <h4 className="tong-h4 right"></h4>
              </div>
            </div>
            <div className="pay">
              <button className="thtt">Tiến hành thanh toán</button>
              <br />
              <button className="uudai">
                <i className="bi bi-tag-fill"></i>Phiếu ưu đãi
              </button>
              <br />
              <input type="text" placeholder="Mã ưu đãi" />
              <br />
              <button className="ad">Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giohang;
