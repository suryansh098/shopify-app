import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

const ProfileScreen = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser());
  }, [dispatch]);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const submitHandler = (event) => {
    event.preventDefault();
    // TODO: dispatch update profile
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div><h1>User Profile</h1></div>
        {
          loading ? <Loading></Loading> :
          error ? <MessageBox variant="danger">{error}</MessageBox> :
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter name"
                defaultValue={user.name}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter email"
                autoComplete="email"
                defaultValue={user.email}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter password"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Enter confirm password"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label/>
              <button className="primary" type="submit">
                Update
              </button>
            </div>

          </>
        }
      </form>
    </div>
  );
}

export default ProfileScreen;