import React from "react"

import { useSelector, useDispatch } from "react-redux"
import { addItem, removeItem } from "./utils/cart"

import items from "./utils/items.json"

export default () => {
    const cartItems = useSelector(state => state.cart.items)
    const cartQuantity = useSelector(state => state.cart.quantity)
    const cartPrice = useSelector(state => state.cart.totalPrice)

    const dispatch = useDispatch()

    return (
        <>
            <h1>Cart</h1>
            {cartItems.map(item => {
                return (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <button onClick={() => dispatch(removeItem(item))}>Remove</button>
                    </div>
                )
            })}

            <h2>Total</h2>
            <p>Quantity: {cartQuantity}</p>
            <p>Price: {cartPrice}</p>

            {items.map((item) => {
                return (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <img src={"./images/" + item.image} width="100px" />
                        <p>{item.price}</p>
                        <button onClick={() => dispatch(addItem({ ...item, quantity: 1, image: item.image }))}>Add</button>
                    </div>
                )
            })}
        </>
    )
}