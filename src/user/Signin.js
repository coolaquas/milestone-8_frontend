import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticate } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "sandip.das@gmail.com",
        password: "Test@123",
        error: "",
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, error, loading, redirectToReferrer } = values;
    const{user} = isAuthenticate();
    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        })
                }
            })
    }
    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted"> E-mail </label>
                <input onChange={handleChange('email')} type="emial" className="form-control"
                    value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted"> Password </label>
                <input onChange={handleChange('password')} type="Password" className="form-control"
                    value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary"> Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : "none" }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>loading.....</h2>
        </div>)
    )
    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticate()){
            return <Redirect to="/" />

        }
    }
    return (
        <Layout
            title="Signin Page"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signupForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin