import React from 'react';
import './css/Table.css';
import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";

export const Table = ({ rows, deleteRow, editRow }) => {
  return <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Member</th>
          <th className="expand">Description</th>
       
          <th>Progress</th>
          <th>Deadline</th>
          {/* <th>Done</th> */}
        
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row, idx) => {
            const progressText = row.progress.charAt(0, 2).toUpperCase() + row.progress.slice(1);
            
            
            return <tr key={idx}>
              <td>{row.id}</td>
              <td>{row.member}</td>
              <td className="expand">{row.task}</td>
              {/* <td>{row.toDo}</td> */}
              <td> <span className={`label label-${row.progress}`}>
                {progressText}</span> </td>
                <td>{row.deadline}</td>
                <td><span className="actions">   <BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx)}/> 
                <BsFillPencilFill onClick={() => editRow(idx)}/>  </span> </td>
            </tr>
          })
        }
        {/* <tr>
        <td>Id1</td>
        <td>Dev1</td>
        <td>To do styling for the page</td>
   
        <td> <span className="label label-inprogress">In Progress</span> </td>
        <td>may 25th</td>
<td><span className="actions">   <BsFillTrashFill className="delete-btn"/> <BsFillPencilFill/>  </span> </td>
        </tr> */}
        {/* <tr>
        <td>Id2</td>
        <td>Dev2</td>
        <td>To create new page</td>
      
       
        <td><span className="label label-todo">To Do</span></td>
        <td>may 27th</td>
        <td> <span className="actions"><BsFillTrashFill className="delete-btn"/><BsFillPencilFill/> </span> </td>
        </tr> */}
        {/* <tr>
        <td>Id3</td>
        <td>Dev3</td>
        <td>To fix file structure</td>
     <td><span className="label label-done">Done</span></td>
          <td>may 30th</td>
        <td> <span className="actions"><BsFillTrashFill className="delete-btn"/> <BsFillPencilFill/></span> </td> </tr> */}
       
      </tbody>
    </table>
  </div>
}
