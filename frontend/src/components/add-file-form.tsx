import { User } from "@/data/definitions";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type FormDataType = {
  userid: number;
  file: string;
};

interface FormProps {
  users: User[] | null;
  getUsers: () => void;
  modalId: string;
  isFormSubmitted: boolean;
  setIsFormSubmittedTrue: () => void;
}
const AddFileForm: React.FC<FormProps> = ({
  getUsers,
  modalId,
  users,
  isFormSubmitted,
  setIsFormSubmittedTrue,
}: FormProps) => {
  const [response, setResponse] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FormDataType>();

  const onSubmit = async (data: FieldValues) => {
    console.log(data.file);

    try {
      const formData = new FormData();

      formData.append("file", data.file[0]);

      const response = await axios.post(
        `http://localhost:8080/api/users/${data.userid}/files`,
        formData,
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
            <p>Successfully uploaded file!</p>
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
            <div className="mb-3 w-full">
              <label className="mb-2 block text-sm font-medium">
                Select user
              </label>
              <div className="relative">
                <select
                  {...register("userid", {
                    required: "Please select from the list of users",
                  })}
                  // type="userid"
                  aria-describedby="userid"
                  aria-label="form-select userid"
                  className={clsx("form-select", {
                    "is-invalid": errors.userid,
                  })}
                >
                  <option>Select user</option>
                  {users && users.length > 0
                    ? users.map((user) => (
                        <option key={user.ID} value={user.ID}>
                          {user.firstname} {user.surname}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div id="userid-error" aria-live="polite" aria-atomic="true">
                {errors.userid && (
                  <div className="flex gap-2 my-2">
                    <p className="text-sm text-red-500">
                      {errors.userid.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Select file</label>
              <input
                className="form-control"
                type="file"
                id="file"
                {...register("file", {
                  required: "Please select local file",
                })}
              />
              {errors.file && (
                <div className="my-2 flex gap-2">
                  <p className="text-sm text-red-500">{errors.file.message}</p>
                </div>
              )}
            </div>
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
              Add File
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default AddFileForm;
