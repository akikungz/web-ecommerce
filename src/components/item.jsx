import React from "react";

import { useDispatch } from "react-redux";
import { addItem } from "../utils/cart";

export default ({ props }) => {
    const item = props;

    const [quantity, setQuantity] = React.useState(1);

    const dispatch = useDispatch()

    return (
        <div className="col-lg-4 col-md-6 mb-3" key={item.id}>
            <div className="card h-100">
                <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center">
                    <span className="fs-6 d-block">{item.name}</span>
                    <span className="badge bg-primary rounded-pill">{item.price} ฿</span>
                </div>
                <div className="card-body">
                    <div></div>
                    <img src={"./images/" + item.image} alt={item.name} width="100%" />
                    <div>
                        <button className="btn btn-primary w-100" data-bs-toggle="collapse" data-bs-target={"#des-" + item.id + "-collapse"}>Description</button>
                        <p className="card-text collapse" id={"des-" + item.id + "-collapse"}>
                            {item.description}
                        </p>
                    </div>
                </div>
                <div class="card-footer d-flex flex-column">
                    <div className="input-group mb-1">
                        <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
                        <input type="text" className="form-control text-center" value={quantity} />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <button class="btn btn-secondary" onClick={() => {
                        dispatch(addItem({ ...item, quantity, image: item.image }))
                        setQuantity(1)
                    }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}