import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './Game'
import { createContext, useState } from 'react';

export const AppContext = createContext();

export default function App() {
  const [mineLocation, setMineLocation] = useState(false);

  return (
    <>
      <AppContext.Provider value={{
        mineLocation, setMineLocation
      }}>
        <Router>
          <Routes>
            <Route path='/' element={<Game />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}
