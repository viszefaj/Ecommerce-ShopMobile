import { useState } from "react";

const ProductsLogs = ({
  products,
  handleDelete,
  handleEdit,
  editProductId,
  handleUpdate,
  handleAdd,
  formData,
  handleChange,
  handleCancelEdit,
}) => {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const getTotalPages = () => Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderTableRows = () => {
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const slicedProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return slicedProducts.map((product) => (
      <tr key={product.id}>
        <td style={{ fontSize: "12px" }}>{product.id}</td>
        <td style={{ fontSize: "12px" }}>{product.name}</td>
        <td style={{ fontSize: "12px" }}>{product.description}</td>
        <td style={{ fontSize: "12px" }}>${product.price}</td>
        <td style={{ fontSize: "12px" }}>{product.quantity}</td>
        <td>
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-danger btn-sm ml-2"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
          <button
            style={{ marginLeft: "5px", fontSize: "12px" }}
            className="btn btn-primary btn-sm ml-2"
            onClick={() => handleEdit(product.id)}
          >
            Edit
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <section>
        <h2 className="mt-5 d-flex justify-content-center">Add/Edit Product</h2>
        <div className="d-flex justify-content-center">
          <div className="w-50">
            <form onSubmit={editProductId ? handleUpdate : handleAdd}>
              <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="name">
                  Name
                </label>
                <input
                  style={{ fontSize: "12px" }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="description">
                  Description
                </label>
                <input
                  style={{ fontSize: "12px" }}
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="price">
                  Price
                </label>
                <input
                  style={{ fontSize: "12px" }}
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="quantity">
                  Quantity
                </label>
                <input
                  style={{ fontSize: "12px" }}
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  required
                />
              </div>
              <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="quantity">
                  Image URL
                </label>
                <input
                  style={{ fontSize: "12px" }}
                  type="string"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center">
                  <button
                    style={{ fontSize: "12px" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    {editProductId ? "Update Item" : "Add Item"}
                  </button>
                </div>
                {editProductId && (
                  <div className="d-flex justify-content-center">
                    <button
                      style={{ fontSize: "12px", marginLeft: "5px" }}
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      <section style={{ paddingTop: "-25px" }}>
        <h2 className="mt-5 d-flex justify-content-center">Items</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ fontSize: "12px" }}>ID</th>
              <th style={{ fontSize: "12px" }}>Name</th>
              <th style={{ fontSize: "12px" }}>Description</th>
              <th style={{ fontSize: "12px" }}>Price</th>
              <th style={{ fontSize: "12px" }}>Quantity</th>
              <th style={{ fontSize: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map(
              (pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    activePage === pageNumber ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  <button className="page-link">{pageNumber}</button>
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ProductsLogs;
