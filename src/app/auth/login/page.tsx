"use client";

import React from 'react';
import AuthLayout from '../_layout';
import LoginForm from '../components/loginForm';

const pageMetadata: {title: string; name: string; desrciption: string} = {
  title: 'Login',
  name : 'Sign In',
  desrciption : 'Sign in to your account'
} 

const Login: React.FC = () => {

  return (
    <AuthLayout name={pageMetadata.name} description={pageMetadata.desrciption} >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
