import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomesForUser from './pages/HomesForUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomesForUser />} />
      </Routes>
    </Router>
  );
};

export default App;
