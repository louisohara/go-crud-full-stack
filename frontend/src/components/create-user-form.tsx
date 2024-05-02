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
  getUsers: () => void;
  modalId: string;
  isFormSubmitted: boolean;
  setIsFormSubmittedTrue: () => void;
}
const CreateUserForm: React.FC<FormProps> = ({
  getUsers,
  modalId,
  isFormSubmitted,
  setIsFormSubmittedTrue,
}: FormProps) => {
  const [response, setResponse] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FormData>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        data,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setIsFormSubmittedTrue();
        getUsers();
        reset();
      }
    } catch (error: any) {
      console.error(error);
      setResponse(error.response.data.error);
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div>
      {isFormSubmitted ? (
        <>
          <div className="modal-body">
            <p>Successfully created user!</p>
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
                    pattern: {
                      value: /[A-za-z]/,
                      message: "Please enter alphabetic characters only",
                    },
                  })}
                  type="firstname"
                  placeholder="First name"
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
                    pattern: {
                      value: /[A-za-z]/,
                      message: "Please enter alphabetic characters only",
                    },
                  })}
                  type="surname"
                  placeholder="Surname"
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
                  validate: {
                    validDate: (value) => {
                      const inputDate = new Date(value);
                      const currentDate = new Date();
                      if (inputDate > currentDate) {
                        return "Please enter a valid date of birth";
                      }
                      return true;
                    },
                  },
                })}
                type="date"
                placeholder="Date of Birth"
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
            {response && (
              <div className="alert alert-warning" role="alert">
                {response}
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
              Create User
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default CreateUserForm;
