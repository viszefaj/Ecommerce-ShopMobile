import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slice/cartSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { post } from "../../utils/axiosUtil";
import { selectId } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectId);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };


  const handleClearCart = () => {
    dispatch(clearCart());
  }

  console.log("userId", userId)
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  console.log("cartItems", cartItems);

  const confirmOrder = async () => {
    try {
      cartItems.forEach(async (item) => {
        console.log("item", item);
        const response = await post("/finish-order", {
          user_id: userId,
          product_id: item.product_id,
          total: item.price * item.quantity,
          status: 'Pending',
          payment_method: 'Catering',
          date: new Date().toLocaleDateString()
        }).then(() => {
          handleClearCart();
          navigate("/my-orders");
          toast.success("Order sent");
        }).catch((err) => {
          console.log("error", err);
          toast.error(err.response.data.message);
        })
      })
    }
    catch (err) {
      console.log("error", err);
      toast.error("Order failed");
    }
  }


  return (
    <div className="container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item.product_id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <h4>Total: ${calculateTotal()}</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px'
            }}>
              <button className="btn btn-primary" style={{ height: '26px' }}
                onClick={confirmOrder}
              >
                Procced Order With Delivering</button>
              <div style={{
                width: '18px',
              }}>
                <PayPalButtons
                  style={{
                    layout: "horizontal",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    width: 20,
                    height: 25,
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: calculateTotal(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details) {
                      post("/finish-order", {
                        user_id: userId,
                        product_id: cartItems[0].product_id,
                        total: calculateTotal(),
                        status: 'Pending',
                        payment_method: 'Paypal',
                        date: new Date().toLocaleDateString()
                      }).then(() => {
                        handleClearCart();
                        navigate("/my-orders");
                        toast.success("Order sent");
                      });
                    });
                  }}
                  onError={(err) => {
                    console.log("err", err);
                    toast.error("Order failed");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
