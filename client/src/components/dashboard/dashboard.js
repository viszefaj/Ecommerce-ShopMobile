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
  const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Calculate the index range of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(productItems.length / itemsPerPage);

  return (
    <section className="flash background">
      <div className="container">
        <h2
          style={{
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >
          Our products
        </h2>
        <div
          className="row row-cols-1 row-cols-md-3 g-4"
          style={{ width: "100%" }}
        >
          {currentItems.map((item) => (
            <div className="col mb-4" key={item.id}>
              <div className="card h-100" style={{ minWidth: "345px" }}>
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
        <div
          className="pagination"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`btn ${currentPage === pageNumber ? "active" : ""}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
