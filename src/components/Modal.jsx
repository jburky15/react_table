import './Modal.css'
import { useState } from 'react'

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
   const [formState, setFormState] = useState(
    defaultValue || {
    Page: "",
    Description: "",
    Status: "Live"
   });

   const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.page && formState.description && formState.status) {
            setErrors("");
            return true;
        } else {
        let errorFields = [];
        for (const [key, value] of Object.entries(formState)) {
            if (!value) {
                errorFields.push(key);
            }
        }
        setErrors(errorFields.join(", "));
        return false;
        }
    };
 
   const handleChange = (e) => {
    setFormState({
        ...formState,
        [e.target.name]: e.target.value
    })
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if(!validateForm()) return;

      onSubmit(formState)
      closeModal()
   }

    return (
    <div className='modal-container' onClick={ (e) => {
        if(e.target.className === "modal-container") {
            closeModal()
        }}
    }>
        <div className='modal'>
            <form action="submit">
                <div className='form-group'>
                    <label htmlFor="page">Page</label>
                    <input type="text" name='page' value={ formState.page } onChange={ handleChange }/>
                </div>
                <div className='form-group'>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name='description' value={ formState.description } onChange={ handleChange }/>
                </div>
                <div className='form-group'>
                    <label htmlFor="status">Status</label>
                    <select name='status' value={ formState.status } onChange={ handleChange }>
                        <option value="Live">Live</option>
                        <option value="Draft">Draft</option>
                        <option value="Error">Error</option>
                    </select>
                </div>
                {errors && <div className="error">{`Please include: ${errors}`}</div>}
                <button type='submit' className='btn' onClick={ handleSubmit }>Submit</button>
            </form>
        </div>
    </div>
  )
}
