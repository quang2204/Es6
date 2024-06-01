import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const Add = ({ submit }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const schema = z.object({
    title: z
      .string()
      .min(6, { message: "Title must be at least 6 characters" }),
    description: z
      .string()
      .min(6, { message: "Description must be at least 6 characters" }),
    price: z.number().min(10),
    brand: z
      .string()
      .min(6, { message: "Brand must be at least 6 characters" }),
    category: z
      .string()
      .min(6, { message: "Category must be at least 6 characters" }),
    img: z.string().url("Must be a valid URL"),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-[500px] mx-auto my-10"
      >
        <h2 className="text-center">Add product</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Brand
          </label>
          <input
            className="form-control"
            type="text"
            id="brand"
            {...register("brand")}
          />
          {errors.brand?.message && (
            <p className="text-red-500">{errors.brand?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Category
          </label>
          <input
            className="form-control"
            type="text"
            id="category"
            {...register("category")}
          />
          {errors.category?.message && (
            <p className="text-red-500">{errors.category?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input type="file" accept="image/*" {...register("img")} onChange={handleImageChange} />
          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "300px", height: "auto" }}
                
              />
            </div>
          )}
        </div>
        <p className="text-red-500">{errors.img?.message}</p>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            className="form-control"
            type="number"
            min={0}
            id="price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-red-500">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            type="text"
            id="description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-500">{errors.description?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Add product
          </button>
        </div>
      </form>
    </>
  );
};

export default Add;
