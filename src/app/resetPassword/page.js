"use client";

import { resetPassword, selectAuth } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Images from "../_componets/Images";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Suspense } from "react";

function ResetPasswordComponent() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        resetPassword({ token, password })
      ).unwrap();
      const successMessage = response.messege;
      toast.success(successMessage);
      router.push("/login");
    } catch (err) {
      const errorMessage = err;
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (token) {
      try {
        const decodedEmail = atob(token);
        setEmail(decodedEmail);
      } catch (e) {
        toast.error("Invalid token.");
      }
    }
  }, [token]);
  return (
    // <div className="authincation h-100">
    //   <div className="container h-100">
    //     <div className="row justify-content-center h-100 align-items-center">
    //       <div className="col-md-6">
    //         <div className="authincation-content">
    //           <div className="auth-form">
    //             <div className="text-center mb-3 flex justify-center">
    //               <img
    //                 src="/images/logo-text.png"
    //                 alt="Logo"
    //                 style={{ maxWidth: "300px" }}
    //               />
    //             </div>
    //             <h4 className="text-center mb-4 text-white">Reset Password</h4>
    //             <form onSubmit={handleSubmit}>
    //               <input type="hidden" name="token" value={"token"} />
    //               <div className="form-group">
    //                 <label className="text-white">
    //                   <strong>User</strong>
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className="form-control"
    //                   value={"userEmail"}
    //                   readOnly
    //                 />
    //               </div>
    //               <div className="form-group">
    //                 <label className="text-white">
    //                   <strong>Password</strong>
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="form-control"
    //                   placeholder="Enter new password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                   required
    //                 />
    //               </div>
    //               <div className="text-center">
    //                 <button
    //                   type="submit"
    //                   className="btn bg-white font-bold text-primary btn-block"
    //                 >
    //                   SUBMIT
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="h-svh flex items-center justify-center">
      <div className="w-full md:w-[540px] rounded-md bg-sky p-[25px] md:p-[50px] flex items-center flex-col">
        <Images
          file={"svg"}
          name={"logo-full.svg"}
          classname={"mb-[1rem] w-[300px] h-auto"}
        />

        <p className="text-white text-[18px] mb-4">Reset Password</p>
        <form className="w-full">
          <div>
            <label className="text-white inline-block  w-full text-[16px] mb-1">
              User
            </label>
            <input
              className="h-[56px] w-full p-[6px_12px] mb-[1rem] border-[1px] border-[#f0f1f5]"
              placeholder="email"
              type="text"
              value={email}
              readOnly
            />

            <label className="text-white inline-block  w-full text-[16px] mb-1">
              Password
            </label>
            <div className="flex items-center mb-[1rem]">
              <input
                className="h-[56px] w-full p-[6px_12px] mb-[1rem] border-[1px] border-[#f0f1f5]"
                placeholder="Enter new password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="capitalize font-[700] bg-white w-full h-[56px] rounded-[1.25rem] text-sky"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}
