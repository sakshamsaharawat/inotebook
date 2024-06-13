import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const host = 'http://localhost:4000';
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials
        console.log(name, email, password)
        const response = await fetch(`${host}/user/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.token);
            navigate("/");
        }
        else {
            alert("Invalid Credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <div className='container my-5'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Name" />
                        </div>
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} placeholder="Password" minLength={5} required />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputcPassword">confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputcPassword" name="confirmPassword" onChange={onChange} placeholder="Password" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )

}

export default Signup
