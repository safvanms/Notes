import React from 'react'
import './Index.css'
import {
     Link
   } from "react-router-dom";

export default function Header() {
  return (
    <div className="nav">
        <Link to='/card'>Notes</Link>
        <Link to='/form'>Form</Link>
    </div>
  )
}
