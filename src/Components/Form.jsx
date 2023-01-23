import React from 'react'

export default function Form({ handleChange, handleSubmit, formData ,editData}) {
  return (
    <div className='wrap'>
      <form className="form-container"  onSubmit={handleSubmit}>
        <label>
          Title :
          <input
            type="text"
            name="name"
            placeholder=" Enter title"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Note:
          <textarea
            type="text"
            name="place"
            placeholder="Content..."
            value={formData.place}
            onChange={handleChange}
            rows='4'
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="designation"
            placeholder="date"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" onClick={editData} >Submit</button>
      </form>
    </div>
  )
}
