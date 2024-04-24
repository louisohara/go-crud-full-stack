"use client";

import {
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import EditUserForm from "./edit-user-form";
import { File, User } from "@/data/definitions";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteUserForm from "./delete-user-form";
import CreateUserForm from "./create-user-form";
import EditFileForm from "./edit-file-form";

interface ModalProps {
  id: number;
  type: "update" | "delete" | "file";
  getUsers: () => void;
  alt: string;
}

const iconMap = {
  update: PencilSquareIcon,
  delete: TrashIcon,
  file: DocumentMagnifyingGlassIcon,
};

export default function Modal({ id, type, getUsers, alt }: ModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userFile, setUserFile] = useState<File | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const setIsFormSubmittedTrue = () => {
    setIsFormSubmitted(true);
  };
  const setIsFormSubmittedFalse = () => {
    setIsFormSubmitted(false);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${id}/files`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserFile(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (type === "update") {
      const editModalElement = document.getElementById(
        `editModal-${id}-${alt}`
      );
      if (editModalElement) {
        editModalElement.addEventListener("shown.bs.modal", handleModalOpen);

        return () => {
          editModalElement.removeEventListener(
            "shown.bs.modal",
            handleModalOpen
          );
        };
      }
    } else if (type === "delete") {
      const deleteModalElement = document.getElementById(
        `deleteModal-${id}-${alt}`
      );
      if (deleteModalElement) {
        deleteModalElement.addEventListener("shown.bs.modal", handleModalOpen);

        return () => {
          deleteModalElement.removeEventListener(
            "shown.bs.modal",
            handleModalOpen
          );
        };
      }
    } else if (type == "file") {
      const fileModalElement = document.getElementById(
        `fileModal-${id}-${alt}`
      );

      if (fileModalElement) {
        fileModalElement.addEventListener("shown.bs.modal", handleModalOpen);

        return () => {
          fileModalElement.removeEventListener(
            "shown.bs.modal",
            handleModalOpen
          );
        };
      }
    }
  }, []);

  const handleModalOpen = () => {
    setIsFormSubmittedFalse();
    getUser();
    getFile();
  };

  const Icon = iconMap[type];

  return (
    <div>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={
          type === "update"
            ? `#editModal-${id}-${alt}`
            : type === "delete"
            ? `#deleteModal-${id}-${alt}`
            : type === "file"
            ? `#fileModal-${id}-${alt}`
            : ""
        }
      >
        {Icon ? (
          <Icon
            className="h-5 w-5 text-gray-700 hover:text-[#f19305]"
            title={`${type}`}
          />
        ) : null}
      </button>

      {type === "update" ? (
        <div
          className="modal fade backdrop-blur-sm"
          id={`editModal-${id}-${alt}`}
          tabIndex={-1}
          aria-labelledby={`editModalLabel-${id}-${alt}`}
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`editModalLabel-${id}-${alt}`}>
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <EditUserForm
                getUsers={getUsers}
                modalId={`editModal-${id}-${alt}`}
                id={id}
                user={user}
                setIsFormSubmittedTrue={setIsFormSubmittedTrue}
                isFormSubmitted={isFormSubmitted}
              />
            </div>
          </div>{" "}
        </div>
      ) : type === "delete" ? (
        <div
          className="modal fade backdrop-blur-sm"
          id={`deleteModal-${id}-${alt}`}
          tabIndex={-1}
          aria-labelledby={`deleteModalLabel-${id}-${alt}`}
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={`deleteModalLabel-${id}-${alt}`}
                >
                  Delete User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <DeleteUserForm
                getUsers={getUsers}
                modalId={`deleteModal-${id}-${alt}`}
                id={id}
                user={user}
                setIsFormSubmittedTrue={setIsFormSubmittedTrue}
                isFormSubmitted={isFormSubmitted}
              />
            </div>
          </div>
        </div>
      ) : type === "file" ? (
        <div
          className="modal fade backdrop-blur-sm"
          id={`fileModal-${id}-${alt}`}
          tabIndex={-1}
          aria-labelledby={`fileModalLabel-${id}-${alt}`}
          aria-hidden="true"
          data-bs-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`fileModalLabel-${id}-${alt}`}>
                  User File
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <EditFileForm
                userFile={userFile}
                getFile={getFile}
                modalId={`fileModal-${id}-${alt}`}
                user={user}
                setIsFormSubmittedTrue={setIsFormSubmittedTrue}
                isFormSubmitted={isFormSubmitted}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
