"use client";

import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FormData>();

  const showModal = () => {
    const { Modal } = require("bootstrap");
    const myModal = new Modal("#signupModal", { backdrop: false });

    myModal.show();
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post("http://localhost:8080/signup", data, {
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
      <div className="mb-3 form-floating">
        <input
          {...register("email", {
            required: "Email is required",
            validate: {
              validateEmail: (value) => {
                if (!value.includes("@")) {
                  return "Please enter a valid email";
                }
                return true;
              },
            },
          })}
          type="email"
          placeholder="Email"
          className={clsx("form-control ", {
            "is-invalid": errors.email,
          })}
        />
        <label>Email</label>
        {errors.email && (
          <div className="flex mt-2 gap-2">
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
          id="floatingIdPassword"
          type="password"
          placeholder="Password"
          className={clsx("form-control ", {
            "is-invalid": errors.password,
          })}
        />
        <label className="form-lavel">Password</label>
        {errors.password && (
          <div className="flex mt-2 gap-2">
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

export default SignupForm;
