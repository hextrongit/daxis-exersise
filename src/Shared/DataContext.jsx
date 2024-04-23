import { createContext, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
export const DataContext = createContext({});

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const controller = new AbortController();

function showToast (text, item) {
  toast[item](text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

// eslint-disable-next-line react/prop-types
function DataProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [postResponse, setPostResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const fetchAllProducts = () => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products", {
        headers: {
          Accept: "application/json, text/plain, */*", // Include headers here
        },
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        setAllProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchAllCategories = () => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products/categories", {
        headers: {
          Accept: "application/json, text/plain, */*", // Include headers here
        },
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        setAllCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchProductsBySearch = (query) => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/search?q=${query}`, {
        headers: {
          Accept: "application/json, text/plain, */*", // Include headers here
        },
        signal: controller.signal,
      })
      .then((response) => {
        if (response.status === 200) {
          setAllProducts(response.data.products);
          setLoading(false);
        } else {
          setResponseStatus(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchProductsByCategory = (category) => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/category/${category}`, {
        headers: {
          Accept: "application/json, text/plain, */*", // Include headers here
        },
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        if (response.status === 200) {
          setAllProducts(response.data.products);
          setLoading(false);
        } else {
          setResponseStatus(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchProductDetails = (id) => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`, {
        headers: {
          Accept: "application/json, text/plain, */*", // Include headers here
        },
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        if (response.status === 200) {
          setProductDetails(response.data);
          setLoading(false);
        } else {
          setResponseStatus(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const postProduct = (requestData) => {
    setLoading(true);
    axios
      .post(`https://dummyjson.com/products/add`, requestData, headers, {
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        if (response.status === 200) {
          setPostResponse(response.data);
          setLoading(false);
          setResponseStatus(200);
          showToast(`${requestData.title} added successfully`, "success");
        } else {
          setResponseStatus(null);
          showToast("Something went wrong", "error");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editProduct = (requestData, id) => {
    setLoading(true);
    axios
      .putForm(`https://dummyjson.com/products/${id}`, requestData, headers, {
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        if (response.status === 200) {
          setPostResponse(response.data);
          setLoading(false);
          setResponseStatus(200);
          showToast(`${requestData.title} edited successfully`, "success");
        } else {
          setResponseStatus(null);
          showToast("Something went wrong", "error");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteProduct = (product) => {
    setLoading(true);
    axios
      .delete(`https://dummyjson.com/products/${product.id}`, {
        signal: newAbortSignal(5000),
      })
      .then((response) => {
        if (response.status === 200) {
          setPostResponse(response.data);
          setLoading(false);
          setResponseStatus(200);
          showToast(`${product.title} deleted successfully`, "success");
        } else {
          setResponseStatus(null);
          showToast("Something went wrong", "error");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value = {
    loading,
    allProducts,
    allCategories,
    productDetails,
    postResponse,
    responseStatus,
    fetchProductsBySearch,
    fetchAllProducts,
    fetchProductDetails,
    fetchProductsByCategory,
    fetchAllCategories,
    postProduct,
    editProduct,
    deleteProduct,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
