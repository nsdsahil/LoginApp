
import React, { useState } from 'react';
import { login } from '../functions/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await login(formData);
        setSuccessMessage('User logged in successfully!');
        navigate('/');
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="form-container"> 
            <h2>Login</h2>
            {errors.general && <div className="error-message">{errors.general}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
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
                <button className="submit-button" type="submit">Login</button> 
        </div>
  );
};

export default Login;
