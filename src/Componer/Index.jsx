import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../Context/CreateContext";
import Loading from "./Loading/Loading";

const Index = () => {
  const { isLoading } = useData();
  if (isLoading == false) return <Loading></Loading>;
  return (
    <div>
      <div id="than">
        <div>
          <Slider></Slider>
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

        <Product></Product>
      </div>
    </div>
  );
};
const Slider = memo(function Slider() {
  const [indeximg, setindeximg] = useState(1);
  const img = [
    {
      img: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/05/banner/TGDD--Desk--min-1920x450-1.png",
    },
    {
      img: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/06/banner/Banner-big-1---Desk-1920x450-1.jpg",
    },
    {
      img: "https://images.fpt.shop/unsafe/fit-in/filters:quality(80):fill(transparent)/fptshop.com.vn/Uploads/Originals/2024/6/27/638551076781797046_desk-header%20(12).png",
    },
  ];
  const next = () => {
    if (indeximg < img.length) {
      setindeximg(indeximg + 1);
    } else {
      setindeximg(1);
    }
  };
  const pre = () => {
    if (indeximg > 1) {
      setindeximg(indeximg - 1);
    } else {
      setindeximg(img.length);
    }
  };
  return (
    <div className="container__slider">
      {img.map((item, index) => (
        <div
          className={`slick slider__item slider__item-active-${indeximg}`}
          key={index}
        >
          <img src={item.img} />
        </div>
      ))}
      <i
        className="bi bi-arrow-left-circle absolute text-green-600 left-5 text-[40px] cursor-pointer transition-all hover:text-green-600"
        onClick={pre}
      ></i>
      <i
        className="bi bi-arrow-right-circle text-[40px] text-green-600 absolute right-5 cursor-pointer transition-all hover:text-green-600"
        onClick={next}
      ></i>
      <div className="container__slider__links">
        {img.map((item, index) => {
          return (
            <div
              key={index}
              className={
                indeximg === index + 1
                  ? "container__slider__links-small"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setindeximg(index + 1);
              }}
            >
              <img
                src={item.img}
                className={
                  indeximg === index + 1 ? " opacity-100" : "opacity-60"
                }
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
const Product = memo(function Product() {
  const { data, AddCart } = useData();

  return (
    <div className="sp ">
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
              <h3 className="mt-2">
                {item.title.length > 21
                  ? item.title.slice(0, 21) + "..."
                  : item.title}
              </h3>

              <div className="price-container">
                <h4 className="discounted-price">{item.price} $</h4>
              </div>
              <div id="toats">
                <button
                  className="addToCartBtn"
                  onClick={() => AddCart(item, 1)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
});
export default Index;
