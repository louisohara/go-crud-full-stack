"use client";

import { ErrorMessage } from "@/data/definitions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<any | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FormData>();

  const showModal = () => {
    const { Modal } = require("bootstrap");
    const myModal = new Modal("#loginModal");

    myModal.show();
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        showModal();
        reset();
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="form-floating mb-3">
        {" "}
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email"
          className={clsx("form-control ", {
            "is-invalid": errors.email,
          })}
        />
        <label>Email</label>
        {errors.email && (
          <div className="flex gap-2 mt-2">
            <p className="text-sm text-red-500">{errors.email.message}</p>
          </div>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className={clsx("form-control ", {
            "is-invalid": errors.password,
          })}
        />
        <label>Password</label>
        {errors.password && (
          <div className="flex gap-2 mt-2">
            <p className="text-sm text-red-500">{errors.password.message}</p>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      )}
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
