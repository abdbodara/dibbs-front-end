"use client";

import React, { useState } from "react";
import Images from "../_componets/Images";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authThunk";
import { toast } from "react-toastify";

function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    showPass: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = formData;

    try {
      const response = await dispatch(
        login({ email, password, rememberMe })
      ).unwrap();
      const { user_role } = response;

      toast.success(response.message);

      if (user_role === "admin") {
        router.push("/admin");
      } else if (user_role === "owner") {
        router.push("/store");
      } else {
        toast.error("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("🚀 ~ handleLogin ~ error:", error);
      toast.error(error.message);
    }
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      showPass: !prevState.showPass,
    }));
  };
  return (
    <div className="h-svh flex items-center justify-center">
      <div className="w-full md:w-[540px] rounded-md bg-sky p-[25px] md:p-[50px] flex items-center flex-col">
        <Images
          file={"svg"}
          name={"logo-full.svg"}
          classname={"mb-[1rem] w-[300px] h-auto"}
        />

        <p className="text-white text-[18px] mb-4">
          Sign in your ADMIN account
        </p>
        <form>
          <div>
            <label className="text-white inline-block  w-full text-[16px] mb-1">
              Email
            </label>
            <input
              className="h-[56px] w-full p-[6px_12px] mb-[1rem] border-[1px] border-[#f0f1f5]"
              placeholder="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label className="text-white inline-block  w-full text-[16px] mb-1">
              Password
            </label>
            <div className="flex items-center mb-[1rem]">
              <input
                className="h-[56px]  p-[6px_12px] w-full  border-[1px] border-[#f0f1f5]"
                placeholder="Password"
                type={formData.showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <button
                onClick={toggleShowPassword}
                className="bg-[#ff2e2e] font-[700]  p-[15px_24px] h-[56px] text-white rounded-r-[1.25rem] "
              >
                {formData.showPass ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between text-[16px] font-[400] mb-2 text-white ">
              <div className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <span>Remember my preference</span>
              </div>
              <p
                className="cursor-pointer"
                onClick={() => router.push("/forgetpassword")}
              >
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className="capitalize font-[700] bg-white w-full h-[56px] rounded-[1.25rem] text-sky"
            >
              Sign Me In
            </button>

            <p
              onClick={() => router.push("/register")}
              className="mt-[1rem] text-white cursor-pointer"
            >
             {` Don't have an account? Sign up`}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
