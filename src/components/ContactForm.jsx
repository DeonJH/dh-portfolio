import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          className={`w-full p-2 text-gray-900 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full p-2 text-gray-900 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          className={`w-full p-2 text-gray-900 border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded`}
          rows="4"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;