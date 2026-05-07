import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Rides } from './pages/Rides';
import { Drivers } from './pages/Drivers';
import { Settings } from './pages/Settings';
import { Locations } from './pages/Locations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
