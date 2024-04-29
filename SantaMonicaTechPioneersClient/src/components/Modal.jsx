import React, {useState} from 'react'
import "./css/Modal.css"

export const Modal = ({closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue || {
  id: "", member:"",task:"",progress:"inprogress",deadline:""});

  const [errors, setErrors] = useState("")

  const validateForm = () => {
if(formState.member && formState.task && formState.progress && formState.deadline) {
  setErrors("")
  return true;
} else {
  let errorFields = [];
  for(const [key, value] of Object.entries(formState)){
    if(!value){
      errorFields.push(key)
    }
  }
  setErrors(errorFields.join(", "));
  return false;
}
  }
  // const handleIdChange = (e) => {
  //   const handleChange = (e) =>{ setFormState({
  //     ...formState, id: e.target.value,
  //     })};
  // }
  // const handleTaskChange = (e) => {
  //   const handleChange = (e) =>{ setFormState({
  //     ...formState, task: e.target.value,
  //     })};
  // }
const handleChange = (e) =>{ setFormState({
...formState, [e.target.name]: e.target.value
})};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) return;
  onSubmit(formState)
  closeModal();
};
  return (
    <div className="modal-container" onClick={(e) => {
         if(e.target.className === "modal-container") closeModal();
        }}>
     <div className="modal">
        <form>
            <div className="form-group">
        <label htmlFor="id">Id</label>
        <input name="id" value={formState.id} onChange={handleChange}/>
        </div>
        <div className="form-group">
        <label htmlFor="Member">Member</label>
        <textarea name="member"value={formState.member} onChange={handleChange}/>
        </div>
        <div className="form-group">
        <label htmlFor="Task">Task</label>
        <textarea name="task" value={formState.task}onChange={handleChange}/>
        </div>
       
        {/* <div className="form-group">
        <label htmlFor="To Do">To Do</label>
        <textarea name="To Do" />
        </div> */}
        <div className="form-group">
        <label htmlFor="progress">Task progress</label>
        <select name="progress" value={formState.progress} onChange={handleChange}>
            <option value="In Progress">In Progress</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
            </select>
        </div>
        <div className="form-group">
        <label htmlFor="deadline">Deadline</label>
        <input type="date" name="deadline" value={formState.deadline} onChange={handleChange} />
        </div>
        {errors && <div className="error">{`Please enter: ${errors}`}</div>}
        <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>
  )
}


