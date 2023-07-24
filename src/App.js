import {Routes, Route} from 'react-router-dom';

import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import AddBusiness from './Components/BusinessUI/Add_Business';
import RegisterBusiness from './Components/BusinessUI/RegisterBusiness';
import LoginBusiness from './Components/BusinessUI/LoginBusiness';
import AddProduct from './Components/BusinessUI/AddProduct';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/business/add' element={<AddBusiness />} />
        <Route path='/business/register' element={<RegisterBusiness/>} />
        <Route path='/business/login' element={<LoginBusiness />} />
        <Route path='/business/product/add' element={<AddProduct />} />
        <Route path='/login/user' element={<Login />} />
        <Route path='/register/user' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
