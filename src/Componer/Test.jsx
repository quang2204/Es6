import React, { useState } from "react";

const Rating = ({ full }) => {
  return (
    <div>
      {full ? (
        <i className="fa-solid fa-star text-yellow-300"></i>
      ) : (
        <i className="fa-regular fa-star text-yellow-300"></i>
      )}
    </div>
  );
};
const StarRating = (props) => {
  const { defaultRating } = props;
  const [rating, setRating] = useState(defaultRating);
  const [hoverrating, setHoverRating] = useState(0);
  const news = [];
  for (let i = 1; i < 6; i++) {
    news.push(i);
  }
  return (
    <>
      <div className="flex">
        {news.map((item, index) => (
          <div
            key={index}
            className="w-[50px] h-[50px] cursor-pointer"
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Rating
              full={
                hoverrating ? hoverrating >= index + 1 : rating >= index + 1
              }
            />
          </div>
        ))}
      </div>

    </>
  );
};

export default StarRating;
