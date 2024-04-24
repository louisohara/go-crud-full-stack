"use client";

import { Inter } from "next/font/google";

import Table from "@/components/table";
import React, { Suspense, useState } from "react";
import Navbar from "@/components/navbar";
import { User } from "@/data/definitions";
import axios from "axios";

import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const apiUrl = "http://localhost:8080";

  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const router = useRouter();

  const showModal = () => {
    const { Modal } = require("bootstrap");
    const myModal = new Modal("#failedAuthModal", { backdrop: false });

    myModal.show();
  };

  const handleClose = (location: string) => {
    router.push(`/${location}`);
  };

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/api/users`);

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error accessing data:", error);
      showModal();
    }
  };

  return (
    <main className="overflow-scroll md:overflow-hidden">
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full block flex-none md:w-[22%]">
          <Navbar getUsers={getUsers} users={users} />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:px-8 md:py-16">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Users</h1>
          </div>
          <Table users={users} getUsers={getUsers} />
        </div>
      </div>
      {!users && (
        <div
          className="modal fade backdrop-blur-sm"
          id="failedAuthModal"
          tabIndex={-1}
          aria-labelledby="failedAuthModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Required</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Please login to access user details.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={() => handleClose("signup")}
                >
                  Signup
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                  onClick={() => handleClose("login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
