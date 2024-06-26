import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../Context/CreateContext";

const Index = () => {
  const { data } = useData();
  return (
    <div>
      <div id="than">
        <div>
          <div className="slick">
            <img
              src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/TGDD--Desk--min-1920x450-1.png"
              alt=""
            />
          </div>
        </div>
        <br />
        <div className="section-content">
          <div className="banner-layers">
            <div className="image-container">
              <img
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/720x220-720x220-57.png"
                alt="Ảnh của bạn"
              />
            </div>
          </div>
          <div className="banner-layers">
            <div className="image-container">
              <img
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/Laptop-Gaming-Chung-MB-2-720x220.png"
                alt="Ảnh của bạn"
              />
            </div>
          </div>
          <div className="banner-layers">
            <div className="image-container">
              <img
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/720x220-720x220-59.png"
                alt="Ảnh của bạn"
              />
            </div>
          </div>
        </div>

        <div className="sp">
          {data.length > 0 &&
            data.map((item, index) => (
              <div className="tc " key={index}>
                <div className="mot">
                  <div className="relative  w-full h-0 pb-[84%]">
                    <Link to={`/detail/${item.id}`}>
                      <div className=" absolute left-0 w-full top-0 h-full ">
                        <img
                          src={item.thumbnail}
                          className="w-[20rem] max-[835px]:w-full  h-full rounded-t-2xl  max-w-full object-cover mx-auto relative "
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="tsp">
                  <h3 className="mt-2">{item.title}</h3>
                  <div className="price-container">
                    <h4 className="discounted-price">{item.price} $</h4>
                  </div>
                  <div id="toats">
                    <button className="addToCartBtn">Thêm vào giỏ hàng</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
