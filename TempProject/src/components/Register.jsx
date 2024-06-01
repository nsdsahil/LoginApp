// src/components/Register.js
import React, { useState } from 'react';
import { register } from '../functions/auth';
import { useNavigate } from 'react-router-dom';
import "../App.css"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z]+$/; 

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name should only contain alphabets';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain alphabets';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        setSuccessMessage('User registered successfully!');
        navigate("/login")
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {errors.general && <div className="error-message">{errors.general}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>First Name</label>
          <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        <div className="input-container">
          <label>Last Name</label>
          <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
        <div className="input-container">
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <div className="input-container">
          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
