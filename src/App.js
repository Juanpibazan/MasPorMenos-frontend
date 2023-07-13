import {Routes, Route} from 'react-router-dom';

import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import AddBusiness from './Components/BusinessUI/Add_Business';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/business/add' element={<AddBusiness />} />
      </Routes>
    </div>
  );
}

export default App;
