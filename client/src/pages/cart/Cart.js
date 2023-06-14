import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const addMoreHandler = () => {
    navigate("/");
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    auth.isLoggedIn ?
      <div className="container">
        <h2 style={{
          textAlign: "center",
        }}>Cart</h2>
        <br />
        <br />
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul className="list-group">
              {cartItems.map((item) => (
                <li
                  key={item.product_id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.title}</strong> - ${item.price}
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <button
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => handleRemoveFromCart(item.product_id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-secondary btn-sm mr-2"
                      onClick={() => handleDecreaseQuantity(item.product_id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-secondary btn-sm mr-2"
                      onClick={() => handleIncreaseQuantity(item.product_id)}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3" style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <button onClick={addMoreHandler} className="btn btn-primary mr-2">
                Add More Items
              </button>
              <button
                className="btn btn-success"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      : navigate("/login")
  );
};

export default Cart;
