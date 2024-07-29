"use client";

import React, { useState } from 'react';
import useAuthStore from '../stores/useAuthStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import Axiosinstance from '@/lib/axios';
import { setCookie } from 'cookies-next';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);


  const mutation = useMutation<{ token: string }, unknown, { username: string; password: string }>({
    mutationFn: async ({ username, password }) => {
      const res = await Axiosinstance.post('/auth/token/', { username, password });
      return res.data;
    },
    onSuccess: (data) => {
      const userData = { username, token: data.token };
      setCookie('token', data.token);
    },
  });



  const handleLogin = () => {
    mutation.mutate({ username, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin} >Login</button>
      {mutation.isError && <p>Error: {(mutation.error as Error).message}</p>}
    </div>
  );
};

export default Login;
