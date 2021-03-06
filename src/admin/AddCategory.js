import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticate();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }
    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false)
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            })
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control mb-3" onChange={handleChange} value={name} autoFocus required />
                    <button className="btn btn-outline-primary">
                        Create Category
            </button>
                </div>
            </form>
        )
    }
    const showSuccess = () => {
        if (success) {
            return (
                <h3 className="text-success">{name} is created.</h3>
            )
        }
    }
    const showError = () => {
        if (error) {
            return (
                <h3 className="text-danger">Already one category with same name exist, Please add a unique one.</h3>
            )
        }
    }
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    )

    return (
        <Layout title="Add a new Category"
            description={`Good Day ${user.name}!, Ready to add a new category.`}
            className="container-fluid">
            <div className="row">
                <div className="col-md-8 ofset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory
