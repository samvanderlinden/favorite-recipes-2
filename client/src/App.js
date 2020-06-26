import React from 'react';
import M from 'materialize-css';
import Navbar from './components/layout/Navbar';

const App = () => {
  M.AutoInit();
  return (
    <div>
      <Navbar />
      This is my Recipe App!
    </div>
  );
}

export default App;
