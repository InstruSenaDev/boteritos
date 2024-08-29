
import Login from '../components/Login.astro';
import {Layout} from '../layouts/Layout.jsx';

const isLogin = true


import React from 'react'

export const index = () => {
  return (
    <Layout titleHeader="Boteritos">
    <>
        {
            isLogin ? 
            <Login /> :
            <p>Hola</p>
        }
    </>
</Layout>
  )
}

