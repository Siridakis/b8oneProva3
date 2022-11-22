import React from 'react'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { ApolloProvider } from "@apollo/client";
import { client } from "./grapql";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
      </ApolloProvider>
  )
}

export default App
