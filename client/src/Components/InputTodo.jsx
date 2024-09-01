import React, { useState} from 'react'
import axios from 'axios'
import AddCircleIcon from '@mui/icons-material/AddCircle';

function InputTodo() {

    const [inputTask, setInputTask] = useState("");

    async function onSubmitForm(e){
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/add",{
            task : inputTask
          });
          setInputTask("");
        } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className='input mx-auto'>
      <h1 className='text-center mt-5'>Todo List</h1>
      <form className='d-flex' onSubmit = {onSubmitForm}>
        <input type="text" className='form-control' placeholder = "Enter your task..." value = {inputTask} onChange = {e => setInputTask(e.target.value)}/>
        <button className='btn btn-success'>Add</button>
      </form>
    </div>
  )
}

export default InputTodo;
