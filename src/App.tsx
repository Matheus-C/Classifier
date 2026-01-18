import { useState } from 'react'
import './App.css'
import { InputForm } from './components/inputForm'
import { Result } from './components/results'

function App() {

  return (
    <>
      <h1>Classificador de E-mails</h1>
      <div className="card">
        <InputForm />
      </div>
      <div className="card">
        <Result />
      </div>
    </>
  )
}

export default App
