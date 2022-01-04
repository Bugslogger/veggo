import React from 'react';
import { Link } from 'react-router-dom';

export const Cart = () => {
    return (
        <div className='cart-container'>
            {/* <div className="no-item-in-cart">
                Your Cart Is Empty Buy Some Healthy Veggies 
                <Link to="/" >
                    <button className="niic-btn">
                        Add Veggies
                    </button>
                </Link>
            </div> */}
            <div className="cart-left-container"></div>
            <div className="cart-right-container">
                <div className="cr-bill-container">
                    <div className="cr-item-container">
                        <div className="cr-item-card">
                            <div className="cr-item-shop">
                                <img src="" alt="" className="cr-image" />
                                <div className="shope-name">name of shop</div>
                            </div>
                            <div className="cr-item-info">
                                <div className="cr-item-name"></div>
                                <div className="cr-item-qty"></div>
                                <div className="cr-item-price"></div>
                            </div>
                        </div>
                        <div className="crc">
                            <input type="text" placeholder="Enter Discount Code Here" />
                            <button className="crc-btn">Apply</button>
                        </div>
                        <div className="cr-bill-container">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
