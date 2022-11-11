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
                    <span className="fs-3 d-block">{item.name}</span>
                    <span className="badge bg-primary rounded-pill">{item.price} ฿</span>
                </div>
                <div className="card-body">
                    <img src={"./images/" + item.image} alt={item.name} width="100%" />
                </div>
                <div class="card-footer d-flex flex-column">
                    <input type="number" className="form-control mb-1" value={quantity} onChange={(e) => setQuantity(e.target.value)} defaultValue={1} min={1} />
                    <button class="btn btn-secondary" onClick={() => {
                        dispatch(addItem({ ...item, quantity, image: item.image }))
                    }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}