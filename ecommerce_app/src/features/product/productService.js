import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/all-products`);

  return response.data;
};

const getSingleProducts = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`,config);
  // console.log(response.data);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(`${base_url}product/wishlist`, {prodId},config);
  if(response.data){
    return response.data;
  }
};

const productService = {
  getProducts,
  createProduct,addToWishlist,
  getSingleProducts
};

export default productService;
