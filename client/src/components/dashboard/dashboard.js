import { useState } from "react";
import Data from "../FlashDeals/Data";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

const Dashboard = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const { productItems } = Data;

  return (
    <section className="flash background">
      <div className="container">
        <h2>Our products</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productItems.map((item) => (
            <div className="col mb-4" key={item.id}>
              <div className="card h-100">
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h5 className="card-text">${item.price}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
