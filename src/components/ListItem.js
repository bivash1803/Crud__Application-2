import React from 'react'

const ListItem = (props) => {
    return <li  className="list-group-item">
    <button 
      className="btn btn-sm btn-info m-2"
      onClick={props.editTodo}>
      U
    </button>
    
    {props.item.name}
    
    <button 
      className="btn-sm btn btn-danger m-2"
      onClick={props.deleteTodo}>
      X
    </button>
    </li>
}

export default ListItem