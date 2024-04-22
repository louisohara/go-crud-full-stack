"use client";

import { useEffect, useState } from "react";
import Modal from "./modal";
import { User } from "@/data/definitions";
import { formatDateToLocal } from "@/data/actions";

interface TableProps {
  getUsers: () => void;
  users: User[] | null;
}

const Table: React.FC<TableProps> = ({ getUsers, users }: TableProps) => {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {users && users.length > 0 ? (
              users.map((user) => {
                return (
                  <div
                    key={user.ID}
                    className="relative mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="mb-2 flex items-center gap-2 text-2xl">
                        <p>
                          {user.firstname} {user.surname}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Date of Birth: {formatDateToLocal(user.dob)}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between py-4">
                      <p className="font-medium">{user.email}</p>
                      <div className="absolute bottom-2 right-4 flex justify-end gap-2">
                        <Modal
                          type="update"
                          id={user.ID}
                          getUsers={getUsers}
                          alt="mob"
                        />
                        <Modal
                          type="delete"
                          id={user.ID}
                          getUsers={getUsers}
                          alt="mob"
                        />
                        <Modal
                          type="file"
                          id={user.ID}
                          getUsers={getUsers}
                          alt="mob"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">No users found. </div>
            )}
          </div>
          <table className="hidden md:table w-full table table-striped table-hover table-light">
            <caption>List of users</caption>
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.ID}>
                    <th scope="row">{user.ID}</th>
                    <td>{user.firstname}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td> {formatDateToLocal(user.dob)}</td>
                    <td>
                      <div className="flex gap-1 items-center">
                        <Modal
                          type="update"
                          id={user.ID}
                          getUsers={getUsers}
                          alt="tab"
                        />
                        <Modal
                          type="delete"
                          id={user.ID}
                          getUsers={getUsers}
                          alt="tab"
                        />
                        <Modal
                          type="file"
                          id={user.ID}
                          getUsers={getUsers}
                          alt="tab"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
