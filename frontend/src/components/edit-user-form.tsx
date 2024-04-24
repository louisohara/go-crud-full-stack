"use client";

import { User } from "@/data/definitions";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type FormData = {
  firstname: string;
  surname: string;
  email: string;
  dob: string;
};

interface FormProps {
  id: number;
  getUsers: () => void;
  modalId: string;
  user: User | null;
  isFormSubmitted: boolean;
  setIsFormSubmittedTrue: () => void;
}
const EditUserForm: React.FC<FormProps> = ({
  id,
  getUsers,
  modalId,
  user,
  isFormSubmitted,
  setIsFormSubmittedTrue,
}: FormProps) => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FormData>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${id}`,
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsFormSubmittedTrue();
        getUsers();
        reset();
      }
    } catch (error: any) {
      console.error(error);
      setResponseMessage(error.response.data.error);
    }
  };

  return (
    <div>
      {isFormSubmitted ? (
        <>
          <div className="modal-body">
            <p>Successfully edited user!</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div className="flex gap-2">
              <div className="mb-3 form-floating w-full">
                <input
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  type="firstname"
                  placeholder="First name"
                  defaultValue={user?.firstname}
                  className={clsx("form-control ", {
                    "is-invalid": errors.firstname,
                  })}
                  id="floatingInput"
                />
                <label>First name</label>
                {errors.firstname && (
                  <div className="flex gap-2 my-2">
                    <p className="text-sm text-red-500">
                      {errors.firstname.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-3 form-floating w-full">
                <input
                  {...register("surname", {
                    required: "Surname is required",
                  })}
                  type="surname"
                  placeholder="Surname"
                  defaultValue={user?.surname}
                  className={clsx("form-control ", {
                    "is-invalid": errors.surname,
                  })}
                />
                <label className="form-label">Surname</label>
                {errors.surname && (
                  <div className="flex gap-2 my-2">
                    <p className="text-sm text-red-500">
                      {errors.surname.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3 form-floating">
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Email"
                defaultValue={user?.email}
                className={clsx("form-control ", {
                  "is-invalid": errors.email,
                })}
              />{" "}
              <label className="form-label">Email</label>
              {errors.email && (
                <div className="flex gap-2 my-2">
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                </div>
              )}
            </div>
            <div className="mb-1 input-group">
              <label className="input-group-text">Date of Birth</label>
              <input
                {...register("dob", {
                  required: "Date of birth is required",
                })}
                type="date"
                placeholder="Date of Birth"
                defaultValue={user?.dob}
                className={clsx("form-control ", { "is-invalid": errors.dob })}
              />
            </div>
            {errors.dob && (
              <div className="my-2 flex gap-2">
                <p className="text-sm text-red-500">{errors.dob.message}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {responseMessage && (
              <div className="alert alert-warning" role="alert">
                {responseMessage}
              </div>
            )}
            <div className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Edit User
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUserForm;
