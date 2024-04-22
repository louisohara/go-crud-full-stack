"use client";

import { User } from "@/data/definitions";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface DeleteFormProps {
  id: number;
  getUsers: () => void;
  modalId: string;
  user: User | null;
  isFormSubmitted: boolean;
  setIsFormSubmittedTrue: () => void;
}

const DeleteUserForm: React.FC<DeleteFormProps> = ({
  id,
  getUsers,
  modalId,
  user,
  isFormSubmitted,
  setIsFormSubmittedTrue,
}: DeleteFormProps) => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsFormSubmittedTrue();
        getUsers();
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
            <p>Successfully deleted user!</p>
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
            <p>Are you sure you want to delete user with ID: {id}?</p>
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
            <button type="submit" className="btn btn-primary">
              Delete user
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeleteUserForm;
