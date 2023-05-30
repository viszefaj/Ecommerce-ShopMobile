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
  const renderTableRows = () => {
    return products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>${product.price}</td>
        <td>{product.quantity}</td>
        <td>
          <button
            className="btn btn-danger btn-sm ml-2"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
          <button
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
    <div className="container">
      <h2 className="mt-5 d-flex justify-content-center">Add/Edit Product</h2>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <form onSubmit={editProductId ? handleUpdate : handleAdd}>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
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
              <label htmlFor="description">Description</label>
              <input
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
              <label htmlFor="price">Price</label>
              <input
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
              <label htmlFor="quantity">Quantity</label>
              <input
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
            <button type="submit" className="btn btn-primary">
              {editProductId ? "Update Item" : "Add Item"}
            </button>
            {editProductId && (
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
      <h2 className="mt-5">Items</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default ProductsLogs;
