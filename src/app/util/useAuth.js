import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { getAuthToken } from "./api";
import { logout } from "@/store/slices/authThunk";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthData = async () => {
      const token = await getAuthToken();

      if (token) {
        if (checkTokenExpiry(token)) {
          const decodedToken = jwt.decode(token);
          setUserData({ id: decodedToken.id, role: decodedToken.role });
        } else {
          handleLogout();
        }
      } else {
        const allowedRoutes = [
          "/forgetpassword",
          "/resetPassword",
          "/register",
        ];

        if (pathname) {
          const isAllowedRoute = allowedRoutes.some((route) =>
            pathname.startsWith(route)
          );

          if (!isAllowedRoute) {
            handleLogout();
          }
        } else {
          console.error("Router pathname is undefined.");
        }
      }

      setAuthChecked(true);
    };

    const checkTokenExpiry = (token) => {
      try {
        const decodedToken = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken?.exp > currentTime;
      } catch (e) {
        console.error("Error decoding token:", e);
        return false;
      }
    };

    const handleLogout = () => {
      Cookies.remove("authToken");
      localStorage.clear();
      dispatch(logout());
      router.push("/login");
    };

    if (!authChecked) {
      getAuthData();
    }
  }, [router, authChecked, dispatch]);

  return { userData };
};
