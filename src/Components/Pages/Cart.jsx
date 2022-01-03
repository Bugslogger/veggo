import React from 'react';
import { Link } from 'react-router-dom';

export const Cart = () => {
    return (
        <div className='cart-container'>
            <div className="no-item-in-cart">
                Go Add Veggies Now
                <Link to="/" >
                    <button className="niic-btn">
                        Add Veggies
                    </button>
                </Link>
            </div>
        </div>
    )
}
