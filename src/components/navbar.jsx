import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { checkOut, removeItem } from "../utils/cart";

import items from "../utils/items.json";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default () => {
    const cartItems = useSelector(state => state.cart.items)
    const cartPrice = useSelector(state => state.cart.totalPrice)

    const dispatch = useDispatch()

    const category = []
    new Set(items.map(item => item.category)).forEach(item => category.push(item))

    const [now, setNow] = React.useState(window.location.hash.replace("#", "") || "#")

    document.now = now

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <a href="./" className="navbar-brand">Food Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-lg-flex justify-content-lg-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" onClick={() => setNow("#")} className={ "nav-link" + ( now == "#" ? " active" : "" ) }>Home</a>
                        </li>
                        {category.map(key => {
                            return (
                                <li className="nav-item">
                                    <a href={`#${key}`} style={{ textTransform: "capitalize" }} className={ "nav-link" + ( now == key ? " active" : "" ) } onClick={() => setNow(key)}>{key}</a>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropstart">
                            <a href="#" className="nav-link active d-flex align-items-center dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                <span><i class="bi bi-cart"></i> Cart</span>
                                <span className="badge bg-danger rounded-circle" style={{
                                    marginLeft: "3px"
                                }}>{cartItems.length}</span>
                            </a>
                            <ul class="dropdown-menu w-auto cart-dropdown">
                                <li className="dropdown-item-text"><i class="bi bi-cart"></i> Cart</li>
                                <li className="dropdown-item-text"><hr class="dropdown-divider" /></li>
                                {cartItems.length > 0 ? cartItems.map(item => {
                                    return (
                                        <li className="dropdown-item d-flex justify-content-between align-items-center">
                                            {/* <span style={{ marginRight: "1em" }}>{item.name}</span> */}
                                            <div className="mr-5">
                                                <span style={{ marginRight: "1em" }}>{item.name}</span>
                                            </div>
                                            <div>
                                                <span className="badge bg-primary" style={{ marginRight: "4px" }}>{item.quantity} * {item.price}</span>
                                                <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                                            </div>
                                        </li>
                                    )
                                }) : <li className="dropdown-item-text">Cart is empty</li>}
                                <li className="dropdown-item-text"><hr class="dropdown-divider" /></li>
                                <li className="dropdown-item-text">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Total</span>
                                        <span className="badge bg-primary rounded-pill">{cartPrice} ฿</span>
                                    </div>
                                </li>
                                {cartItems.length > 0 ? (
                                    <li className="dropdown-item">
                                        <button className="btn btn-primary w-100" disabled={cartItems.length > 0 ? false : true} onClick={() => dispatch(checkOut())}>Checkout</button>
                                    </li>
                                ) : null}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}