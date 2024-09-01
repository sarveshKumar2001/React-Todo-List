import React, { Fragment } from 'react'
import './App.css'
import InputTodo from './Components/InputTodo'
import ListTodo from './Components/ListTodo';
import Footer from './Components/Footer';

function App() {

  return (
    <div className='app'>
      <InputTodo />
      <ListTodo />
      <Footer />
    </div>
  )
}

export default App
