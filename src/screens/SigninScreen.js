import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { signin } from '../actions/userActions';

const SigninScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>

        <div>
          {loading && <Loading></Loading>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>

        <div>
          <label htmlFor="email">Email Address :</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
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
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>

        <div>
          <label />
          <div>
            Didn't have an  account? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
          </div>
        </div>

      </form>

    </div>
  )
}

export default SigninScreen;
