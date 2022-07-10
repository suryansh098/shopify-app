import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { register } from "../actions/userActions";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not same");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="max-width grid-center">
      <div className="signup card card-body">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h2 className="subtitle">Sign Up</h2>
          </div>

          {loading && <Loading></Loading>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          <div>
            <label htmlFor="name">Name :</label>
            <input
              type="name"
              id="name"
              placeholder="Enter name"
              autoComplete="username"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address :</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              autoComplete="useremail"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              autoComplete="new-password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter password again"
              autoComplete="new-password"
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <div>
            <label />
            <button className="primary" type="submit">
              Sign Up
            </button>
          </div>

          <div>
            <label />
            <div className="mb-2">
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
