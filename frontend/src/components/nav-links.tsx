"use client";
import {
  UserPlusIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

import React from "react";

import { useState } from "react";
import CreateUserForm from "./create-user-form";
import AddFileForm from "./add-file-form";
import { User } from "@/data/definitions";

const links = [
  {
    name: "Create user",
    icon: UserPlusIcon,
    title: "Create user",
    modal: "createUserModal",
  },
  {
    name: "Add file",
    icon: DocumentDuplicateIcon,
    title: "Add File",
    modal: "addFileModal",
  },
];

interface NavProps {
  getUsers: () => void;
  users: User[] | null;
}

type FormData = {
  email: string;
  password: string;
};

const NavLinks: React.FC<NavProps> = ({ getUsers, users }: NavProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const setIsFormSubmittedTrue = () => {
    setIsFormSubmitted(true);
  };
  const setIsFormSubmittedFalse = () => {
    setIsFormSubmitted(false);
  };
  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;

        return (
          <div key={index} className="w-full">
            <button
              type="button"
              className="btn flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium  hover:text-[#f19305] md:flex-none md:justify-start md:p-2 md:px-3 hover:bg-sky-100"
              data-bs-toggle="modal"
              data-bs-target={`#${link.modal}`}
              onClick={setIsFormSubmittedFalse}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </button>
            <div
              className="modal fade backdrop-blur-sm"
              id={link.modal}
              tabIndex={-1}
              aria-labelledby={`${link.modal}Label`}
              aria-hidden="true"
              data-bs-backdrop="false"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={`${link.modal}`}>
                      {link.title}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  {link.name === "Create user" ? (
                    <CreateUserForm
                      getUsers={getUsers}
                      modalId={link.modal}
                      isFormSubmitted={isFormSubmitted}
                      setIsFormSubmittedTrue={setIsFormSubmittedTrue}
                    />
                  ) : (
                    <AddFileForm
                      getUsers={getUsers}
                      modalId={link.modal}
                      users={users}
                      isFormSubmitted={isFormSubmitted}
                      setIsFormSubmittedTrue={setIsFormSubmittedTrue}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NavLinks;
