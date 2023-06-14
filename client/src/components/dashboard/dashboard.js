import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import { get } from "../../utils/axiosUtil.js";
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    console.log("itemToAdd", item);
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const getProducts = async () => {
    const response = await get("/dashboard/products");
    setData(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Calculate the index range of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
            <div className="col mb-4" key={item.product_id} id="product">
              <div className="card h-100" style={{ maxWidth: "320px" }}>
                <img
                  src={item.file}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
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
