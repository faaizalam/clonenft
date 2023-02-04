import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
 
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(token)
  const allowedPublic = [
    "/spaces",
    "/collection",
    "/login",
    "/collection/[details]",
  ];
  // useEffect(() => {
  //   const name = router.pathname;
  //   const localToken = localStorage.getItem("token");

  //   if (localToken) {
  //     setAuthenticated(true);
  //     setToken(localToken);
  //     if (name === "/login") {
  //       router.push("/spaces");
  //     }
  //   } else {
  //     if (!allowedPublic.includes(name)) {
  //       router.push("/login");
  //     }
  //   }
  // }, [router]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
