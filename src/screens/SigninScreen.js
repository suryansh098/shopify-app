import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SigninScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        // [TODO] : Signin Action
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
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
                        Didn't have an  account? <Link to="/register">Create your account</Link>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default SigninScreen;
