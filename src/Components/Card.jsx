import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import './Index.css'
import Form from './Form'

const LOCAL_STORAGE_KEY = 'todo:savedTasks'

export default function Card() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    designation: '',
  })
  const [edited, setEdited] = useState(null)
  console.log(edited)
  console.log('object', formData)

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved === undefined) return
    if (saved) setData(JSON.parse(saved))
  }

  useEffect(() => {
    loadSavedTasks()
  }, [])

  function setTasksAndSave(newTasks) {
    setData(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }

  //  Add / Update the data into the Api by clicking the form submit

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const editData = () => {
    const update = {
      id: edited,
      ...formData,
    }
    const response = axios.put(
      `http://localhost:3000/employees/${edited}`,
      update,
    )
    setData([...formData, response])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const request = {
      id: uuidv4(),
      ...formData,
    }
    const response = axios.post('http://localhost:3000/employees', request)
    setTasksAndSave([...formData, response])
  }

  //   handle edit section

  const handleEdit = (id) => {
    let editItem = data.find((item) => {
      return item.id === id
    })
    console.log(editItem)
    setFormData(editItem)
    setEdited(id)

    // const request = {
    //   id: id,
    //   ...formData,
    // }
    // axios.put(`http://localhost:3000/employees/${id}`, request).then((res) => {
    //   setData([...formData])
    // })
  }

  //    deleting the data from API

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/employees/${id}`).then((res) => {
      setData(res)
    })
    const deleteItem = data.filter((item) => id !== item)
    setData(deleteItem)
  }

  // getting the data from the API

  useEffect(() => {
    axios
      .get('http://localhost:3000/employees')
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log('errrrr', err)
      })
  }, [])

  // data mapping and adding to the panel

  return (
    <>
      {/* input form section  */}

      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        editData={editData}
      />

      <div className="container">
        {data.map((item) => {
          return (
            <div className="cards">
              <div key={item.id} className="card">
                <div className="items">
                  <p>{item.name}</p>
                  <p>{item.place}</p>
                  <h5>{item.designation}</h5>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    {' '}
                    delete
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleEdit(item.id)}
                  >
                    {' '}
                    edit
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
