import React ,{useEffect, useState}from 'react'
import axios from 'axios'
import EditTodo from './EditTodo';
import DeleteIcon from '@mui/icons-material/Delete';

function ListTodo() {

    const [todos, setTodos] = useState([]);

    async function getTodods(){
        try {
            const response = await axios.get("http://localhost:3001/get")
            const jsonData = await response.data;

            setTodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getTodods();
    })

    async function deleteTodo(id) {
        try {

          const response = await axios.delete(`http://localhost:3001/delete/${id}`);
          console.log(response.data); // Log the response data

          setTodos(todos.filter(todo => (todo.todo_id !==id)))
        } catch (err) {
          console.log(err.message); // Log the error message
        }
      }

  return (
    <div className='container list mx-auto mt-5 table-responsive'>
      <table className="table mx-auto table-hover">
      <tbody>
        {todos.map(todo => {
          return<tr key ={todo.todo_id} >
              <td>{todo.tasks}</td>
              <td><EditTodo  todo = {todo}/></td>
              <td>
                  <DeleteIcon  style = {{color: '#c62828'}} onClick = {() => deleteTodo(todo.todo_id)}></DeleteIcon>
              </td>
          </tr>
        })}
      </tbody>
  </table>
    </div>
  )
}

export default ListTodo;
