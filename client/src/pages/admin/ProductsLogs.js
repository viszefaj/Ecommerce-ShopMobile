import { useState, useEffect } from "react";
import { get, post, del, update } from "../../utils/axiosUtil";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { storage } from "../../firebase/config";
import { toast } from "react-toastify";

import { ProtectedRoute } from "../../utils/ProtectedRoute";


const ProductsLogs = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    quantity: "",
    file: ""
  });
  const [reload, setReload] = useState(false)
  const [perc, setPerc] = useState(0);
  const [dataFile, setDataFile] = useState({
    files: [],
    urls: [],
  });

  const [editProductId, setProductItemId] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const getTotalPages = () => Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };



  // console.log("products", products)

  console.log("formData", formData)

  const fetchProducts = async () => {
    try {
      const response = await get("/dashboard/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  const handleDelete = async (id) => {
    try {
      await del(`/dashboard/products/delete/${id}`).then((res) => {
        if (res.status === 200) {
          toast.success("Product deleted successfully");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product_id !== id)
          );
          setReload(!reload);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    setProductItemId(id);
    setFormData(selectedProduct);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await update(`dashboard/products/update`, formData);
      setProducts((prevProducts) =>
        prevProducts.map((item) => (item.id === formData.id ? formData : item))
      );
      setFormData({
        id: "",
        title: "",
        price: "",
        quantity: "",
        file: ""
      });
      setProductItemId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      price: "",
      quantity: "",
      file: ""
    });
    setProductItemId(null);
  };


  const handleChange = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await post("/dashboard/products/add", formData).then((res) => {
        toast.success("Product added successfully");
        const newProduct = res.data;
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setFormData({
          id: "",
          title: "",
          description: "",
          price: "",
          quantity: "",
          file: ""
        });
        setReload(!reload);
        setPerc(0);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const UploadFiles = async (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        }
      );
    });
  };

  useEffect(() => {
    if (dataFile.files.length === 0) {
      return;
    } else {
      UploadFiles(dataFile.files[0]).then((url) => {
        console.log("url", url)
        setFormData((prevData) => (
          {
            ...prevData,
            file: url
          }
        ));
      });
    }
  }, [dataFile.files]);

  const handlefileChange = (e) => {
    setDataFile({
      ...dataFile,
      files: e.target.files
    })
  }


  useEffect(() => {
    fetchProducts();
    setDataFile({
      files: [],
      urls: [],
    });
  }, [reload]);

  const renderTableRows = () => {
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const slicedProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return slicedProducts.map((product) => (
      <tr key={product.id}>
        <td style={{ fontSize: "12px" }}>{product.title}</td>
        <td style={{ fontSize: "12px" }}>{product.description}</td>
        <td style={{ fontSize: "12px" }}>${product.price}</td>
        <td style={{ fontSize: "12px" }}>{product.quantity}</td>
        <td>
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-danger btn-sm ml-2"
            onClick={() => handleDelete(product.product_id)}
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
      <ProtectedRoute>
        <section>
          <h2 className="mt-5 d-flex justify-content-center">Add/Edit Product</h2>
          <div className="d-flex justify-content-center">
            <div className="w-50">
              <form onSubmit={editProductId ? handleUpdate : handleAdd}>
                <div className="mb-3">
                  <label style={{ fontSize: "12px" }} htmlFor="name">
                    Title
                  </label>
                  <input
                    style={{ fontSize: "12px" }}
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
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
                    Image
                  </label>
                  <input
                    style={{
                      fontSize: "12px",
                      width: "180px",

                    }}
                    type="file"
                    id="file"
                    onChange={handlefileChange}
                    className="form-control"
                    required
                  />
                </div>
                {perc > 0 && <progress value={perc} max="100" />}
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
        <section style={{ padding: "50px" }}>
          <h2 className="mt-5 d-flex justify-content-center">Products</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ fontSize: "12px" }}>Title</th>
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
                    className={`page-item ${activePage === pageNumber ? "active" : ""
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
      </ProtectedRoute>
    </>
  );
};

export default ProductsLogs;
