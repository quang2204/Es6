import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../Api/Api";
const Detail = () => {
  const [indeximg, setindeximg] = useState(0);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const param = useParams();
  useEffect(() => {
    Detail();
  }, []);
  const Detail = async () => {
    const res = await ProductDetail(param.id);
    setData(res.data);
    setImg(res.data.images);
    setRating(res.data.rating);
    setPrice(res.data.price);
  };
  const thumbnail = img[indeximg];
  const [quantity, setQuantity] = useState(1);
  const pre = () => {
    if (indeximg > 0) {
      setindeximg(indeximg - 1);
    }
    if (indeximg == 0) {
      setindeximg(img.length - 1);
    }
  };
  const next = () => {
    if (indeximg < img.length - 1) {
      setindeximg(indeximg + 1);
    }
    if (indeximg == img.length - 1) {
      setindeximg(0);
    }
  };
  const presl = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  console.table(data);
  return (
    <div className="max-w-[1350px] mx-auto my-7 px-3">
      <div className="flex  gap-6">
        <div>
          <div className=" flex justify-center w-[460px] items-center relative">
            <i
              className="bi bi-arrow-left-circle absolute left-5 text-[25px] cursor-pointer transition-all hover:text-green-600"
              onClick={pre}
            ></i>
            <img src={thumbnail} alt="" className="h-[259px]" />
            <i
              className="bi bi-arrow-right-circle text-[25px] absolute right-5 cursor-pointer transition-all hover:text-green-600"
              onClick={next}
            ></i>
          </div>
          <br />
          <div>
            <div className="flex gap-4">
              {img.map((item, index) => (
                <img
                  src={item}
                  onClick={() => setindeximg(index)}
                  key={index}
                  onMouseOver={() => setindeximg(index)}
                  className={`max-w-[70px] p-1 cursor-pointer  ${
                    indeximg == index
                      ? "border-2 border-green-600 "
                      : "opacity-60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="text-xl">{data.title}</div>
          <div>
            {data.rating &&
              [...Array(Math.round(rating))].map((_, index) => (
                <i
                  className="fa-solid fa-star text-yellow-300 ml-2 mb-2 text-[13px]"
                  key={index}
                ></i>
              ))}
          </div>
          <div className="text-red-500 text-xl">
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div className="flex items-center mt-3 gap-2">
            <span className="text-[#757575]">Chính sách trả hàng :</span>
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg"
              alt=""
              className="w-[20px] "
            />
            <p>Trả hàng 15 ngày</p>
          </div>
          <div className="py-2 mt-2 flex items-center gap-28">
            <span className="text-[#757575] ">Hãng:</span>
            <p>{data.brand}</p>
          </div>
          <div className="pb-2 mt-2 flex items-center gap-20">
            <span className="text-[#757575]">Danh mục:</span>
            <p>{data.category}</p>
          </div>
          <div className="pb-2 flex items-center gap-20 mt-2">
            <span className="text-[#757575] ">Số lượng :</span>
            <div className="flex items-center">
              <div
                className=" px-3 text-2xl cursor-pointer"
                style={{ border: "1px solid rgba(0,0,0,.09)" }}
                onClick={presl}
              >
                -
              </div>
              <div
                className="py-1 px-6"
                style={{ border: "1px solid rgba(0,0,0,.09)" }}
              >
                {quantity}
              </div>
              <div
                className="py-1 px-3 cursor-pointer"
                style={{ border: "1px solid rgba(0,0,0,.09)" }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </div>
            </div>
          </div>
          <div className="p-2 text-white rounded-sm cursor-pointer bg-red-500 max-w-[100px] flex justify-center mt-2">
            Mua ngay
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl">Mô tả</div>
        <div className="text-[#757575]">{data.description}</div>
      </div>
    </div>
  );
};

export default Detail;
