"use client";
import React, { useState } from "react";
import Images from "../_componets/Images";
import { useRouter } from "next/navigation";
import { registerUser, selectAuth } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    user_name: "",
    email: "",
    pwd: "",
    confirmPassword: "",
    store_name: "",
  };

  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    pwd: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("pwd"), null], "Passwords must match")
      .required("Confirm password is required"),
    store_name: Yup.string().required("Store name is required"),
  });
  const [showPasswords, setShowPasswords] = useState({
    pwd: false,
    confirmPassword: false,
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(registerUser(values)).unwrap();
      if (result) {
        toast.success(result.data.message);
        router.push("/login");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (e, field) => {
    e.preventDefault();
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="h-svh flex items-center justify-center">
      <div className="w-full md:w-[540px] rounded-md bg-sky p-[25px] md:p-[50px] flex items-center flex-col">
        <Images
          file={"svg"}
          name={"logo-full.svg"}
          classname={" w-[300px] h-auto"}
        />

        <p className="text-white text-[18px] mb-4">
          Create Your Seller Account Free
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="w-full">
              <div>
                <label className="text-white inline-block  w-full text-[16px] mb-1">
                  full name
                </label>
                <div className="mb-[1rem]">
                  <Field
                    className="h-[56px] w-full p-[6px_12px]  border-[1px] border-[#f0f1f5]"
                    placeholder="full name"
                    type="text"
                    name="user_name"
                    // value={formData.user_name}
                    // onChange={handleChange}
                  />
                  <ErrorMessage
                    name="user_name"
                    component="div"
                    className="text-red-500 text-sm font-bold"
                  />
                </div>
                <label className="text-white inline-block  w-full text-[16px] mb-1">
                  Email
                </label>
                <div className="mb-[1rem]">
                  <Field
                    className="h-[56px] w-full p-[6px_12px]  border-[1px] border-[#f0f1f5]"
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    // value={formData.email}
                    // onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm font-bold"
                  />
                </div>

                <label className="text-white inline-block  w-full text-[16px] mb-1">
                  password
                </label>
                <div className=" mb-[1rem]">
                  <div className="flex items-center">
                    <Field
                      className="h-[56px]  p-[6px_12px] w-full  border-[1px] border-[#f0f1f5]"
                      placeholder="Enter Password"
                      type={showPasswords.pwd ? "text" : "password"}
                      name="pwd"
                      // value={formData.pwd}
                      // onChange={handleChange}
                    />

                    <button
                      onClick={(e) => togglePasswordVisibility(e, "pwd")}
                      className="bg-[#ff2e2e] font-[700]  p-[15px_24px] h-[56px] text-white rounded-r-[1.25rem] "
                    >
                      Show/Hide
                    </button>
                  </div>
                  <ErrorMessage
                    name="pwd"
                    component="div"
                    className="text-red-500 text-sm font-bold"
                  />
                </div>
                <label className="text-white inline-block  w-full text-[16px] mb-1">
                  Confirm Password
                </label>
                <div className="mb-[1rem]">
                  <div className="flex items-center ">
                    <Field
                      className="h-[56px]  p-[6px_12px] w-full  border-[1px] border-[#f0f1f5]"
                      placeholder="Enter Confirm password"
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      // value={formData.confirmPassword}
                      // onChange={handleChange}
                    />

                    <button
                      onClick={(e) =>
                        togglePasswordVisibility(e, "confirmPassword")
                      }
                      className="bg-[#ff2e2e] font-[700]  p-[15px_24px] h-[56px] text-white rounded-r-[1.25rem] "
                    >
                      Show/Hide
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm font-bold"
                  />
                </div>
                <label className="text-white inline-block  w-full text-[16px] mb-1">
                  Store Name
                </label>
                <div className="mb-[1rem]">
                  <Field
                    className="h-[56px] w-full p-[6px_12px]  border-[1px] border-[#f0f1f5]"
                    placeholder="Enter Store Name"
                    type="text"
                    name="store_name"
                    // value={formData.store_name}
                    // onChange={handleChange}
                  />
                  <ErrorMessage
                    name="store_name"
                    component="div"
                    className="text-red-500 text-sm font-bold"
                  />
                </div>
                <button
                  type="submit"
                  // onClick={(e) => handleSubmit(e)}
                  className="capitalize font-[700] bg-white w-full h-[56px] rounded-[1.25rem] text-sky"
                >
                  Sign me up
                </button>

                <p
                  onClick={() => router.push("/login")}
                  className="mt-4 text-white cursor-pointer"
                >
                  Already have an account? Sign in
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Page;
