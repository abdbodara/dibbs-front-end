"use client";

import React, { useState } from "react";
import Images from "../_componets/Images";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/store/slices/authSlice";
import { toast } from "react-toastify";

function Page() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(forgotPassword({ email })).unwrap();
      const successMessage = response?.message;
      toast.success(successMessage);
    } catch (error) {
      const errorMessage = error;
      toast.error(errorMessage);
    }
  };
  return (
    <div className="h-svh flex items-center justify-center">
      <div className="w-full md:w-[540px] rounded-md bg-sky p-[25px] md:p-[50px] flex items-center flex-col">
        <Images
          file={"svg"}
          name={"logo-full.svg"}
          classname={"mb-[1rem] w-[300px] h-auto"}
        />

        <p className="text-white text-[18px] mb-4">Forgot Password</p>
        <form className="w-full">
          <div>
            <label className="text-white inline-block  w-full text-[16px] mb-1">
              Email
            </label>
            <input
              className="h-[56px] w-full p-[6px_12px] mb-[1rem] border-[1px] border-[#f0f1f5]"
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleForgotPassword}
            className="capitalize font-[700] bg-white w-full h-[56px] rounded-[1.25rem] text-sky"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
