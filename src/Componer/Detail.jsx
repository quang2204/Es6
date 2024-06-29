import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../Api/Api";
import { useData } from "../Context/CreateContext";
const Detail = () => {
  const [indeximg, setindeximg] = useState(0);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const [reviews, setReviews] = useState([]);
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
    setReviews(res.data.reviews);
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
  return (
    <div className="max-w-[1350px] mx-auto my-10 px-3">
      <div className="flex gap-6">
        <div>
          <Thumbnail thumbnail={thumbnail} pre={pre} next={next}></Thumbnail>
          <br />
          <Images
            img={img}
            indeximg={indeximg}
            setindeximg={setindeximg}
          ></Images>
        </div>
        <Product
          data={data}
          price={price}
          presl={presl}
          quantity={quantity}
          setQuantity={setQuantity}
          rating={rating}
        ></Product>
      </div>
      <Mtdg data={data} reviews={reviews}></Mtdg>
    </div>
  );
};
const Thumbnail = ({ thumbnail, pre, next }) => {
  return (
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
  );
};
const Images = ({ img, indeximg, setindeximg }) => {
  return (
    <div>
      <div className="flex gap-4">
        {img.map((item, index) => (
          <img
            src={item}
            onClick={() => setindeximg(index)}
            key={index}
            onMouseOver={() => setindeximg(index)}
            className={`max-w-[70px] p-1 cursor-pointer  ${
              indeximg == index ? "border-2 border-green-600 " : "opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
const Product = ({ data, price, presl, quantity, setQuantity, rating }) => {
  const { AddCart } = useData();
  return (
    <div>
      <div className="text-2xl">{data.title}</div>
      <div>
        {data.rating &&
          [...Array(Math.round(rating))].map((_, index) => (
            <i
              className="fa-solid fa-star text-yellow-300 ml-2 mb-2 text-[13px]"
              key={index}
            ></i>
          ))}
      </div>
      <div className="text-red-500 text-xl">{price} $</div>
      <div className="flex items-center mt-3 gap-2">
        <span className="text-[#757575] ">Chính sách trả hàng :</span>
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg"
          alt=""
          className="w-[20px] "
        />
        <p className="">{data.returnPolicy}</p>
      </div>
      <div className="py-2 mt-2 flex items-center gap-28">
        <span className="text-[#757575] ">Hãng:</span>
        <p className=" ml-[60px]">{data.brand}</p>
      </div>
      <div className="pb-2 mt-2 flex items-center gap-20">
        <span className="text-[#757575] ">Danh mục:</span>
        <p className=" ml-12">{data.category}</p>
      </div>
      <div className="pb-2 flex items-center gap-20 mt-2">
        <span className="text-[#757575] ">Số lượng :</span>
        <div className="flex items-center ml-7">
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
      <div className="flex gap-4">
        <div className="py-[10px] px-3 text-white rounded-lg cursor-pointer bg-red-500 flex justify-center mt-2 ">
          Mua ngay
        </div>
        <div
          className="py-[10px] border-solid border-[red] border-[1px] px-3  rounded-lg cursor-pointer  flex justify-center mt-2 "
          onClick={() => AddCart(data, quantity)}
        >
          Thêm vào giỏ hàng
        </div>
      </div>
    </div>
  );
};
const Mtdg = ({ data, reviews }) => {
  const [check, setCheck] = useState(false);
  return (
    <div className="mt-5">
      <div className="text-xl mb-[14px] ">
        <span
          className={`${
            check == false ? "" : "opacity-65 hover:opacity-100 cursor-pointer"
          }border-solid border-x-2 border-t-4 border-[green] p-3 cursor-pointer`}
          onClick={() => setCheck(false)}
        >
          Mô tả
        </span>
        <span
          className={`${
            check === true ? "" : "opacity-65 hover:opacity-100 cursor-pointer"
          } border-solid border-x-2 border-t-4 border-[green]  ml-3 p-3`}
          onClick={() => setCheck(true)}
        >
          Đánh giá {reviews.length}
        </span>
      </div>
      <div className="border-solid border-[2px] border-[green] px-5 py-4 text-[16px] leading-9">
        {check == false ? (
          <Description data={data}></Description>
        ) : (
          <Review reviews={reviews}></Review>
        )}
      </div>
    </div>
  );
};
const Description = ({ data }) => {
  return <div>{data.description}</div>;
};
const Review = ({ reviews }) => {
  const [rating, setRating] = useState([]);
  useEffect(() => {
    setRating(reviews.map((item, index) => item.rating));
  }, []);
  return (
    <div>
      <div className="leading-9">
        <div> Đánh giá</div>
        <div className="">
          {reviews.map((item, index) => (
            <div key={index} className="bg-[#fafafd] py-2 px-4 mb-3">
              <div>{item.reviewerName}</div>
              <div>{item.comment}</div>

              <div className="flex items-center">
                {Array.from({ length: rating[index] }, (_, i) => (
                  <i
                    className="fa-solid fa-star text-yellow-300 ml-2 mb-2 text-[13px]"
                    key={i}
                  ></i>
                ))}
                <div className="-mt-2 ml-3 flex items-center">
                  ({rating[index]}) Review
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Detail;
