import './App.css'
import { Modal } from './components/Modal'
import { Table } from './components/table'
import { useState } from 'react'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const [rows, setRows] = useState ([
    {page: "page 1", description: "This is the home page", status: "live"},
    {page: "page 2", description: "This is the about page", status: "draft"},
    {page: "page 3", description: "This is the contact page", status: "error"}
  ]);

  const [rowToEdit, setRowToEdit] = useState(null)

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, i) => i !== targetIndex))
  }

  const handleEditRow = (i) => {
    setRowToEdit(i)
    setModalOpen(true)
  }

  const handleSubmit = (newRow) => {
    rowToEdit === null
    ? setRows([...rows, newRow])
    : setRows(rows.map((currRow, i) => {
        if (i !== rowToEdit) return currRow

        return newRow
      })
    );
  };

  return (
    <div className='App'>
      <Table rows={ rows } deleteRow={ handleDeleteRow } editRow={ handleEditRow }/>
      <button className='btn' onClick = {() => setModalOpen(true)}> Add </button>
      { modalOpen && (
        <Modal 
          closeModal={() => {
            setModalOpen(false)
            setRowToEdit(null)
          }}

          onSubmit={handleSubmit}
          defaultValue={ rowToEdit !== null && rows[rowToEdit]}
        /> 
      )}
    </div>
  )
}

export default App
