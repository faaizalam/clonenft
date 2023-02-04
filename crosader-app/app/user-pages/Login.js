import Link from "next/link";
import { useRouter } from "next/router";
import React, { Component, useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import customAxios from "../../config/config";
import Backdrop from "../basic-ui/Backdrop/Backdrop";
import { setCookies } from "cookies-next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const { token, setToken, authenticated, setAuthenticated } =
    useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (token && authenticated) {
      router.push("/projects");
    }
  });

  // Form submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setIsloading(true);

    customAxios.post("users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setAuthenticated(true);
        // setIsloading(false);
        setCookies("token", res.data.token);
      })
      .catch((err) => {
        setIsloading(false);
        setError("Unable to authenticate!");
      });
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        {isloading && (
          <Backdrop>
            <div className="loader relative top-56 z-50"></div>
          </Backdrop>
        )}
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={"assets/images/logo.png"} alt="logo" />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form onSubmit={handleSubmit} className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    className="h-auto"
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-auto"
                  />
                </Form.Group>
                {error && (
                  <p className={"text-red-500 mt-2 text-center italic"}>
                    {error}
                  </p>
                )}
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    // href="/dashboard"
                    type="submit"
                  >
                    SIGN IN
                  </Button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-muted"
                  >
                    Forgot password?
                  </a>
                </div>
                {/* <div className="mb-2">
                    <button
                      type="button"
                      className="btn btn-block btn-facebook auth-form-btn"
                    >
                      <i className="mdi mdi-facebook me-2"></i>Connect using
                      facebook
                    </button>
                  </div> */}
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <Link href="/user-pages/register" className="text-primary">
                    Create
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
