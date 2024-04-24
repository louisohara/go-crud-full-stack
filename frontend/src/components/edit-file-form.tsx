import { File, User } from "@/data/definitions";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type FormDataType = {
  userid: number;
  file: string;
};

interface FormProps {
  userFile: File | null;
  user: User | null;
  getFile: () => void;
  modalId: string;
  isFormSubmitted: boolean;
  setIsFormSubmittedTrue: () => void;
}
const EditFileForm: React.FC<FormProps> = ({
  userFile,
  getFile,
  modalId,
  user,
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
    if (user) {
      try {
        const formData = new FormData();

        formData.append("file", data.file[0]);

        const response = await axios.post(
          `http://localhost:8080/api/users/${user.ID}/files`,
          formData,
          { withCredentials: true }
        );

        if (response.status === 201) {
          console.log("submitted");
          setIsFormSubmittedTrue();
          getFile();
          reset();
        }
      } catch (error: any) {
        console.error(error);
        setResponse(error.response.data.error);
      }
    }
  };

  return (
    <div>
      {isFormSubmitted ? (
        <>
          <div className="modal-body">
            <p>Successfully updated user file!</p>
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
            {userFile && (
              <p className="mb-3">
                Current file selection:
                <a
                  href={`http://localhost:8080/${userFile.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 text-decoration-underline"
                >
                  {`http://localhost:8080/${userFile.file}`}
                </a>
              </p>
            )}
            {!userFile && <p className="mb-3">No file found for this user.</p>}
            <div className="mb-3">
              <label className="form-label">Update file selection:</label>
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
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default EditFileForm;
