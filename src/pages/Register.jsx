import React from 'react';

const Register = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;