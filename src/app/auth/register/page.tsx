import React from 'react'
import AuthLayout from '../_layout'
import RegisterForm from '../components/registerForm';


const pageMetadata: {title: string; name: string; desrciption: string} = {
  title: 'Register',
  name : 'Sign Up',
  desrciption : 'Get started with windam'
} 
const Register = () => {
  return (
    <AuthLayout description={pageMetadata.desrciption} name={pageMetadata.name} >
     <RegisterForm />
    </AuthLayout>
  )
}

export default Register