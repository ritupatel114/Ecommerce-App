
import { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data))
            .catch(() => console.log('Unable to load products'));
    }, []);

    const addToCart = (product) => {
        const existing = cart.find(item => item._id === product._id);

        if (existing) {
            setCart(cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const changeQuantity = (id, amount) => {
        setCart(cart.map(item =>
            item._id === id
                ? { ...item, quantity: item.quantity + amount }
                : item
        ).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    return (
        <div>
            <h2>Our Products</h2>

            <h3>Cart Items: {totalItems}</h3>
            <h3>My Cart</h3>

            {cart.map(item => (
                <div key={item._id}>
                    <p>{item.name} - ₹{item.price}</p>

                    <button onClick={() => changeQuantity(item._id, -1)}>
                        -
                    </button>

                    <span> {item.quantity} </span>

                    <button onClick={() => changeQuantity(item._id, 1)}>
                        +
                    </button>

                    <button onClick={() => removeFromCart(item._id)}>
                        Remove
                    </button>
                </div>
            ))}

            <h3>Total: ₹{total}</h3>

            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ₹{product.price}</p>

                    <button onClick={() => addToCart(product)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Products;
