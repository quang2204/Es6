import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../../Api/Api";

// Define your validation schema using Zod
const schema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  img: z.string().url("Must be a valid URL"),
  image: z.string().url("Must be a valid URL"),
});

const Update = (pro) => {
  const fileInputRef = React.useRef(null);

  const update = pro.UpdateProduct;
  const [data, setData] = useState({});
  const [img, setImg] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const param = useParams();
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const fetchProductDetails = async () => {
    try {
      const res = await ProductDetail(param.id);
      // setData(res.data);
      // setImg(res.data.images);
      // setValue("id", res.data.id);
      // setValue("title", res.data.title);
      // setValue("description", res.data.description);
      // setValue("price", res.data.price);
      // setValue("brand", res.data.brand);
      // setValue("category", res.data.category);
      // setValue("img", res.data.thumbnail);
      // setValue("image", res.data.images.join(","));
      reset(res.data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch product details:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [param.id, setValue]);

  const UpdateProduct = async (data) => {
    // Your update product logic here
  };

  return (
    <form
      onSubmit={handleSubmit(update)}
      className="max-w-[500px] mx-auto my-10"
    >
      <h2 className="text-center">Update Product</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          id="title"
          // defaultValue={data?.title || ""}
          {...register("title")}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        {errors.img && <p className="text-red-500">{errors.img.message}</p>}
      </div>

      <input
        type="text"
        id="id"
        // defaultValue={data?.id || ""}
        className="hidden"
        {...register("id")}
      />

      <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">
          Thumbnail
        </label>

        <img
          src={data.thumbnail || ""}
          // defaultValue={data?.thumbnail || ""}
          // {...register("img")}
          alt="Thumbnail"
          className="rounded"
          {...register("img")}
        />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          className="py-1 rounded-md px-2 max-w-[33px] flex justify-center"
          style={{ backgroundColor: "#fff3" }}
          onClick={handleClick}
          {...register("img")}
          // defaultValue={imageUrl || ""}
        >
          sdfd
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="img" className="form-label">
          Image
        </label>
        <div className="flex">
          {img?.map((item, index) => (
            <img
              src={item}
              alt={`product-${index}`}
              key={item}
              className="w-[100px] h-[100px] object-cover rounded mr-2"
            />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="brand" className="form-label">
          Brand
        </label>
        <input
          className="form-control"
          type="text"
          id="brand"
          // defaultValue={data?.brand || ""}
          {...register("brand")}
        />
        {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          className="form-control"
          type="text"
          id="category"
          // defaultValue={data?.category || ""}
          {...register("category")}
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          className="form-control"
          type="number"
          min={0}
          id="price"
          // defaultValue={data?.price || ""}
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          // defaultValue={data?.description || ""}
          {...register("description")}
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary w-100">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default Update;
