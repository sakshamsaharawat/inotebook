import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const host = 'http://localhost:4000';
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/user/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.token);
            props.showAlert("Logged in successfully ", "success")
            navigate("/");

        }
        else {
            props.showAlert("Invalid credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className='container my-5'>
                    <div className="form-group ">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control " value={credentials.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" value={credentials.password} name="password" id="exampleInputPassword1" placeholder="Password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </div>
            </form>
        </div>
    )

}
export default Login
