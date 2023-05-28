import React from "react";

const FlashCard = ({ productItems }) => {
  return (
    <>
      {productItems.map((productItems) => {
        return (
          <div className="box">
            <div className="product mtop">
              <div className="img">
                <span className="discount">{productItems.discount}% Off</span>
                <img src={productItems.cover} alt="" />
                <div className="product-like">
                  <label>0</label> <br />
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
              <div className="product-details">
                <h3>{productItems.name}</h3>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="price"></div>
                <h4>{productItems.price}.00</h4>
                <button>
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FlashCard;
