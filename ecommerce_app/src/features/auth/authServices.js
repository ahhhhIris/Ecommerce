import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);
  if(response.data){
    return response.data;
  }
  
};

const addToCart=async (data) => {
  const response = await axios.post(`${base_url}user/cart`, data,config);
  if(response.data){
    return response.data;
  }
};

const deleteFromCart=async (id) => {
  const response = await axios.delete(`${base_url}user/cart/${id}`,config);
  if(response.data){
    return response.data;
  }
};

const changeCartQuantity=async (id,quantity) => {
  const response = await axios.put(`${base_url}user/updatecart/${id}`,{quantity:quantity},config);
  if(response.data){
    return response.data;
  }
};

const getCart=async (ata) => {
  const response = await axios.get(`${base_url}user/get-cart`,config);
  if(response.data){
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  // console.log(orderDetail);
  const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail, config);
  if(response.data){
    return response.data;
  }
};

const getMyOrders = async () => {
  const response = await axios.get(`${base_url}user/get-my-orders`, config);
  if(response.data){
    console.log(response.data);
    return response.data;
  }
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(
    `${base_url}user/wishlist`,
    config
  );
    if(response.data){
      return response.data;
    }
  
};

const authService = {
  login,
  getOrders,
  getOrder,
  register,
  getUserWishlist,
  addToCart,
  getCart,deleteFromCart,changeCartQuantity,
  createOrder,getMyOrders
};

export default authService;
