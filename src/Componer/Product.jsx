import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetProduct } from "../Api/Api";

const Products = (props) => {
  const list = props.data;
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("popularity");
  const [sp, setSp] = useState([]);
  const [sao, setSao] = useState([]);
  const category = [...new Set(data.map((item) => item.category))];
  const param = useParams();
  useEffect(() => {
    if (param.id) {
      const fillter = data.filter((item) => {
        const search = item.title ? item.title.toLowerCase() : "";
        const searchQuery = param.id.toLowerCase();
        return search.includes(searchQuery);
      });
      setSp(fillter);
    } else {
      setSp(data);
    }
  }, [param.id, data]);
  useEffect(() => {
    product();
  }, []);
  const product = async () => {
    const res = await GetProduct();
    setData(res.data);
    const start = res.data.map((item) => Math.round(item.rating));
    setSao(start);
  };

  const handleSort = (category) => {
    const loc = data.filter((item) => item.category === category);
    setSp(loc);
  };
  const handleSortPrice = (order) => {
    const sortedData = [...sp].sort((a, b) => {
      if (order === "price") {
        return a.price - b.price;
      } else if (order === "price-desc") {
        return b.price - a.price;
      } else if (order === "popularity") {
        setSp(data);
      }
      //  else if (order === "rating") {

      //   return a.rating - b.rating;
      // }
    });

    setSp(sortedData);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelect(selectedValue);

    if (selectedValue === "price") {
      handleSortPrice("price");
    } else if (selectedValue === "price-desc") {
      handleSortPrice("price-desc");
    } else if (selectedValue === "popularity") {
      handleSortPrice("popularity");
    } else if (selectedValue === "rating") {
      handleSortPrice("rating");
    }
  };
  return (
    <div className="">
      <div className="" style={{ backgroundColor: "#669933" }}>
        <div className="flex justify-between items-center text-white py-5 mx-auto max-w-[1360px] px-3">
          <div>
            <h1 className="text-2xl font-bold mb-3">Cửa hàng</h1>
            <div className="text-[14px]">
              Trang chủ / <span className="font-bold">Cửa hàng</span>
            </div>
          </div>
          <Sapsep select={select} handleSelectChange={handleSelectChange} />
        </div>
      </div>
      <div className="mx-auto max-w-[1360px] flex mt-10 gap-7 px-3">
        <Category
          data={data}
          handleSort={handleSort}
          setSp={setSp}
          category={category}
        ></Category>
        <Sp sp={sp} sao={sao}></Sp>
      </div>
    </div>
  );
};
const Sapsep = ({ select, handleSelectChange }) => {
  return (
    <div>
      <select
        name="orderby"
        className="orderby p-2 rounded-2xl text-[15px] outline-none"
        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        value={select}
        onChange={handleSelectChange}
      >
        <option value="popularity">Thứ tự mặc định</option>
        <option value="popularity">Thứ tự theo mức độ phổ biến</option>
        <option value="rating">Thứ tự theo điểm đánh giá</option>
        <option value="date">Mới nhất</option>
        <option value="price">Thứ tự theo giá: thấp đến cao</option>
        <option value="price-desc">Thứ tự theo giá: cao xuống thấp</option>
      </select>
      <input type="hidden" name="paged" value="1" />
    </div>
  );
};
const Category = ({ data, handleSort, setSp, category }) => {
  return (
    <div className="w-full max-h-[200px] max-w-[184px]">
      <div className="text-center bg-green-600 text-white py-3">
        Danh mục sản phẩm
      </div>
      <div className="px-3 border border-green-500">
        <p className="py-2 cursor-pointer" onClick={() => setSp(data)}>
          Tất cả
        </p>
        <hr />
        {data.length > 0 &&
          category.map((categorys, index) => (
            <>
              <p
                className={`py-2 cursor-pointer my-1 `}
                key={index}
                onClick={() => handleSort(categorys)}
              >
                {categorys}
              </p>
              <hr />
            </>
          ))}
      </div>
    </div>
  );
};
const Sp = ({ sp, sao }) => {
  return (
    <div className="sp">
      {sp.length > 0 &&
        sp.map((item, index) => (
          <div className="tc w-[243px]" key={index}>
            <Link to={`/detail/${item.id}`}>
              <div className="mot">
                <div className="relative  w-full h-0 pb-[84%]">
                  <div className=" absolute left-0 w-full top-0 h-full ">
                    <img
                      src={item.thumbnail}
                      className="w-[20rem] max-[835px]:w-full  h-full rounded-t-2xl  max-w-full object-cover mx-auto relative "
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Link>
            <div className="tsp">
              <h3 className="mt-2">
                {item.title.length > 20
                  ? `${item.title.slice(0, 20)}...`
                  : item.title}
              </h3>
              <div className="price-container">
                <h4 className="discounted-price">{item.price} $</h4>
              </div>
              <div id="toats">
                <button className="addToCartBtn">Thêm vào giỏ hàng</button>
              </div>
            </div>

            <div>
              {Array.from({ length: sao[index] }, (_, i) => (
                <i
                  className="fa-solid fa-star text-yellow-300 ml-2 mb-2 text-[13px]"
                  key={i}
                ></i>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
export default Products;
