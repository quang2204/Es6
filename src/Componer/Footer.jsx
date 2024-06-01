import React from "react";

const Footer = () => {
  return (
    <div className="footer ">
      <footer>
        <div className="ft">
          <div className="gt">
            <img
              src="https://hoaqua.langsonweb.com/wp-content/uploads/2020/09/logo-hoa-qua.png"
              alt=""
            />
            <h3>Về chúng tôi</h3>
            <p>
              Chuyên cung cấp các loại hoa quả nhập khẩu, nội địa và các loại
              thực phẩm từ thiên nhiên.
            </p>
          </div>
          <div className="footer-lh">
            <h3>Liên hệ</h3>
            <p>
              <i className="bi bi-house"></i> 335 Cầu Giấy, Hà Nội
            </p>
            <p>
              <i className="bi bi-telephone"></i>0986.989.626 - 0986.989.626
            </p>
            <p>
              <i className="bi bi-envelope"></i>topweb.com.vn@gmail.com
            </p>
            <p>
              <i className="bi bi-facebook"></i> fb.com/topweb.com.vn
            </p>
          </div>
          <div className="footer-tt">
            <h3>Tin tức</h3>
            <p>Kỹ thuật trồng rau sạch trong chậu xốp tại nhà đơn giản</p>
            <p>Eat Clean – bí kíp để có thân hình xinh như mơ của cô nàng 9x</p>
            <p>
              Lấy lại vòng eo con kiến nhờ công thức đơn giản từ củ đậu và rau
              cải
            </p>
            <p>KM: Tháng giải phóng mỡ thừa, da xấu, độc tố trong cơ thể</p>
          </div>
          <div className="footer-toi">
            <h3>VỀ CHÚNG TÔI</h3>
            <p>Giới thiệu</p>
            <p>Lĩnh vực hoạt động</p>
            <p>Chính sách chất lượng</p>
            <p>Triết lí kinh doanh</p>
            <p>Năng lực - cơ sở vật chất</p>
          </div>
        </div>
      </footer>
      <div className="tg">
        <p>Copyright 2023 © Lương Thành quang</p>
      </div>
      <div className="liehe">
        <div className="fb">Chat Facebook</div>
        <div className="sdt">
          <p>
            <i className="bi bi-telephone"></i>0986.989.626
          </p>
        </div>
        <div className="sdt1">
          <p>
            <i className="bi bi-telephone"></i>Gọi điện
          </p>
        </div>
      </div>
      <button id="scrollToTopButton" className="scroll-btn">
        ↑
      </button>
    </div>
  );
};

export default Footer;
