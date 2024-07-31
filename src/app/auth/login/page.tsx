"use client";

import React from 'react';
import AuthLayout from '../_layout';
import LoginForm from '../components/loginForm';


const Login: React.FC = () => {
  const pageMetadata: {title: string; name: string; desrciption: string} = {
    title: 'Login',
    name : 'Sign In',
    desrciption : 'Sign in to your account'
  } 

  return (
    <AuthLayout name={pageMetadata.name} description={pageMetadata.desrciption} >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
