import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useDispatch } from "react-redux";
import { addItem } from "../utils/cart";

export default ({ props }) => {
    const item = props;

    const [quantity, setQuantity] = React.useState(1);

    const dispatch = useDispatch()

    return (
        <>
            <div className="col-lg-4 col-md-6 mb-3" key={item.id}>
                <div className="card h-100">
                    <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center">
                        <span className="fs-6 d-block">{item.name}</span>
                        <span className="badge bg-primary rounded-pill">{item.price} ฿</span>
                    </div>
                    <div className="card-body">
                        <div></div>
                        <LazyLoadImage effect="blur" src={"./images/" + item.image} alt={item.name} width="100%" loading="lazy" />
                        <div className="w-100">
                            <p className="card-text mt-3">{item.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nam sit recusandae nihil vitae voluptatum reiciendis voluptatem! Cumque earum tempora temporibus, praesentium dolor, saepe assumenda molestias fugit amet, totam ab!</p>
                            <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target={`#item-${item.id}-modal`}>More Details</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <div className="modal fade" id={`item-${item.id}-modal`} tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{item.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <LazyLoadImage effect="blur" src={"./images/" + item.image} alt={item.name} width="100%" loading="lazy" />
                            <div className="w-100 d-flex justify-content-between mb-3">
                                <span>{item.name}</span>
                                <span className="badge bg-primary rounded-pill">{item.price} ฿</span>
                            </div>
                            <div className="input-group mb-1">
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
                                <input type="number" className="form-control text-center" onChange={e => setQuantity(Number(e.target.value))} value={quantity} />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button type="button" className="btn btn-primary w-100" onClick={() => {
                                dispatch(addItem({ ...item, quantity, image: item.image }))
                                setQuantity(1)
                            }}><i class="bi bi-plus-circle"></i> Add to cart</button>
                            <p className="mt-3">
                                {item.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint nam sit recusandae nihil vitae voluptatum reiciendis voluptatem! Cumque earum tempora temporibus, praesentium dolor, saepe assumenda molestias fugit amet, totam ab!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}