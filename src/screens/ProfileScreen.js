import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../contants/userConstants';

const ProfileScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { 
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if(!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET});
      dispatch(detailsUser());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);


  const submitHandler = (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('Password and Confirm Password does not match!');
    } else {
      dispatch(updateUserProfile({ 
        userId: user._id,
        name,
        email,
        password
      }));
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div><h1>User Profile</h1></div>
        {
          loading ? (
            <Loading></Loading> 
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              { loadingUpdate && <Loading></Loading> }
              { errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox> }
              { successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
              <div>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Enter name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter email"
                  autoComplete="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="Enter confirm password"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <label/>
                <button className="primary" type="submit">
                  Update
                </button>
              </div>

            </>
          )
        }
      </form>
    </div>
  );
}

export default ProfileScreen;