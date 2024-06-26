import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { ProductDetail } from "../../Api/Api";
import { useData } from "../../Context/CreateContext";

// Define your validation schema using Zod
const schema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Must be a valid URL").optional(),
  images: z.array(z.string().url("Must be a valid URL")),
});

const Update = () => {
  const { UpdateProduct } = useData();
  const fileInputRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
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
      const res = await ProductDetail(id);
      reset(res.data);
      setThumbnailUrl(res.data.thumbnail);
      setImages(res.data.images);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch product details:", error);
      }
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

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

  const fileInput = useRef(null);

  const handleImg = () => {
    fileInput.current.click();
  };

  const handleFileImg = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target.result === "string") {
          newImages.push(e.target.result);
          setImages((prevImages) => [...prevImages, e.target.result]);
        } else {
          setError("Failed to read file as a string");
        }
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
  return (
    <form
      onSubmit={handleSubmit(UpdateProduct)}
      className="max-w-[500px] mx-auto my-10"
    >
      <h2 className="text-center">Update Product</h2>

      <input
        type="hidden"
        id="id"
        {...register("id", { valueAsNumber: true })}
      />
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
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        {errors.id && <p className="text-red-500">{errors.id.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">
          Thumbnail
        </label>
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            className="rounded mb-2 max-w-[400px] max-h-[300px] m-auto object-cover"
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
        <div className="flex justify-center gap-4">
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
          onChange={handleFileImg}
          multiple
        />
        <button type="button" className="btn btn-secondary" onClick={handleImg}>
          Upload Images
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="brand" className="form-label">
          Brand
        </label>
        <input
          className="form-control"
          type="text"
          id="brand"
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
