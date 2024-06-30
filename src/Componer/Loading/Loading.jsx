import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="flex justify-center items-center  h-[40.3vh]">
      <div className="spinner ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
