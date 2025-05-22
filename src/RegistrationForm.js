import React from 'react';
import { useForm } from 'react-hook-form';
import './RegistrationForm.css'; // We'll create this next for styling

function RegistrationForm() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = async data => {
    // Example backend POST request (replace URL with your backend)
    try {
      const response = await fetch('https://your-backend-api.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Registration successful!');
        reset();
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const password = watch('password');

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <label>Username:</label>
      <input
        {...register('username', { required: 'Username is required' })}
        placeholder="Enter username"
      />
      {errors.username && <p className="error">{errors.username.message}</p>}

      <label>Email:</label>
      <input
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' }
        })}
        placeholder="Enter email"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <label>Phone Number:</label>
      <input
        type="tel"
        {...register('phone', {
          required: 'Phone number is required',
          pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number' }
        })}
        placeholder="Enter phone number"
      />
      {errors.phone && <p className="error">{errors.phone.message}</p>}

      <label>Password:</label>
      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' }
        })}
        placeholder="Enter password"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <label>Confirm Password:</label>
      <input
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match'
        })}
        placeholder="Confirm password"
      />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
