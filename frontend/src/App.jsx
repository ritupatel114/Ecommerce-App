import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <h2>My E-Commerce Store</h2>
                <Link to="/register">Register</Link> |{' '}
                <Link to="/login">Login</Link> |{' '}
                <Link to="/products">Products</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;