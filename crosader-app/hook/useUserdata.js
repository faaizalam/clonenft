import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCookie } from "cookies-next";
import { getMainRole } from "../Utility/helper";
import userRoutes from "./../userRoutes.json";
import { DOMAIN } from "../config/config";

const cookiesOptions = {
  path: "/",
  domain: DOMAIN,
};

export default function useUserData() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = jwt_decode(getCookie("token", cookiesOptions));
    user.mainRole = getMainRole(user);
    user.allowedRoutes = userRoutes[user.mainRole].allowedRoutes;
    setUserData(user);
  }, []);

  return userData;
}
