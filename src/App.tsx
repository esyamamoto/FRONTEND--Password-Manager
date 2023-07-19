import React, { useState } from 'react';
import Form from './components/Form';
import Title from './components/Title';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleCadastrar = () => {
    setShowForm(true);
  };

  const handleCancelar = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Title />
      {showForm ? (
        <Form handleCadastrar={ handleCadastrar } handleCancelar={ handleCancelar } />
      ) : (
        <button onClick={ () => setShowForm(true) }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
