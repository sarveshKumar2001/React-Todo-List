import React, {useState} from 'react'
import axios from 'axios'
import EditNoteIcon from '@mui/icons-material/EditNote';

function EditTodo(props) {

    const [todo, setTodo] = useState(props.todo.tasks);

    async function updateTodo(e){
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/update/${props.todo.todo_id}`,{
                task:todo
            });
            console.log(response.data);
            window.location = "/";
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
    <div>
<EditNoteIcon style = {{color: '#3d5afe'}} type="button"  data-toggle="modal" data-target={`#id${props.todo.todo_id}`}>
</EditNoteIcon>

<div className="modal" id={`id${props.todo.todo_id}`}
onClick = { () => setTodo(props.todo.tasks)}>
  <div className="modal-dialog">
    <div className="modal-content">


      <div className="modal-header">
        <h4 className="modal-title">Edit Todo</h4>
        <button type="button" className="close" data-dismiss="modal" onClick = { () => setTodo(props.todo.tasks)}>&times;</button>
      </div>


      <div className="modal-body">
       <input type="text" className='form-control' value = {todo} onChange = {e => setTodo(e.target.value)}/>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = {updateTodo}>Edit</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = { () => setTodo(props.todo.tasks)}>Close</button>
      </div>


    </div>
  </div>
</div>
    </div>
  )
}

export default EditTodo
