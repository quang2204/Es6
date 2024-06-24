import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const Add = ({ submit }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const fileInputRef = useRef(null);
  const fileInput = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setThumbnailUrl(base64String);
        setValue("thumbnail", base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleImg = () => {
    fileInput.current.click();
  };

  const handleFileImage = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setImages((prevImages) => [...prevImages, e.target.result]);
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setValue("images", images);
  }, [images]);

  const schema = z.object({
    title: z
      .string()
      .min(6, { message: "Title must be at least 6 characters" })
      .optional(),
    description: z
      .string()
      .min(6, { message: "Description must be at least 6 characters" })
      .optional(),
    price: z.number().min(10).optional(),
    brand: z
      .string()
      .min(6, { message: "Brand must be at least 6 characters" })
      .optional(),
    category: z
      .string()
      .min(6, { message: "Category must be at least 6 characters" })
      .optional(),
    thumbnail: z.string().url("Must be a valid URL").optional(),
    images: z.array(z.string().url("Must be a valid URL")),
  });
  const {
    register,
    handleSubmit,
    setValue,
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
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          <br />
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="rounded mb-2 max-w-[400px] m-auto max-h-[300px] object-cover"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClick}
          >
            Upload Thumbnail
          </button>
          {errors.thumbnail && (
            <p className="text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Images
          </label>
          <br />
          <div className="flex justify-center gap-3">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="rounded mb-2 w-[100px] h-[100px] object-cover"
              />
            ))}
          </div>

          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileImage}
            multiple
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleImg}
          >
            Upload Images
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <p className="text-red-500">{errors.images?.message}</p>

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
