import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { checkOut, removeItem } from "../utils/cart";

import items from "../utils/items.json";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default () => {
    const cartItems = useSelector(state => state.cart.items)
    const cartPrice = useSelector(state => state.cart.totalPrice)
    const cartQuantity = useSelector(state => state.cart.quantity)

    const dispatch = useDispatch()

    const category = []
    new Set(items.map(item => item.category)).forEach(item => category.push(item))

    const [now, setNow] = React.useState(window.location.hash.replace("#", "") || "#")

    document.now = now

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container">
                    <a href="./" className="navbar-brand">Food Shop</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-between" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#" onClick={() => setNow("#")} className={"nav-link" + (now == "#" ? " active" : "")}>Home</a>
                            </li>
                            {category.map(key => {
                                return (
                                    <li className="nav-item">
                                        <a href={`#${key}`} style={{ textTransform: "capitalize" }} className={"nav-link" + (now == key ? " active" : "")} onClick={() => setNow(key)}>{key}</a>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link active" data-bs-toggle="modal" data-bs-target="#cartModal">
                                    <span><i class="bi bi-cart"></i> Cart</span>
                                    <span className="badge bg-danger rounded-circle" style={{
                                        marginLeft: "3px"
                                    }}>{cartItems.length}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Cart modal */}
            <div className="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartModalLabel"><i class="bi bi-cart"></i> Cart</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {cartItems.length > 0 ? cartItems.map((item, id, arr) => {
                                return (
                                    <div className={`card${id + 1 != cartItems.length ? " mb-3" : ""}`}>
                                        <div className="row g-0">
                                            <div className="col-md-4 d-flex align-items-center">
                                                <img src={`images/${item.image}`} className="img-fluid rounded-start" alt={item.name} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text limit-1-line">{item.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa numquam, rerum excepturi cum, natus enim quibusdam eos unde eum, doloribus in accusamus illo laudantium ducimus voluptatibus nulla quisquam nihil ipsam.</p>
                                                    <p className="card-text">Price: {item.price}฿ * {item.quantity}</p>
                                                    <button className="btn btn-danger" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <p>Cart is empty</p>}
                        </div>
                        <div className="modal-footer">
                            <span className="badge text-bg-dark">Total: {cartQuantity} items, {cartPrice}฿</span>
                            <button type="button" className="btn btn-primary" disabled={cartItems.length > 0 ? false : true} onClick={() => dispatch(checkOut())}><i class="bi bi-credit-card"></i> Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}