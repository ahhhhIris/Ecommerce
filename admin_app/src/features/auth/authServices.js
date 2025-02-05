import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${base_url}user/logout`,config);
  console.log(response.data);
  // if (response.data) {
    // localStorage.clear();
    localStorage.removeItem("user");
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`,config);
  
  return response.data;
};
const getSingleOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getsingleorder/${id}`, config);
  // console.log(response.data);
  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.put(`${base_url}user/update-order/${data.id}`,{status:data.status}, config);
  return response.data;
};


const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    
    config
  );

  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseIncome`,
    data
  );
  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    data
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,getYearlyStats,
  getSingleOrder,updateOrderStatus,
  logout
};

export default authService;
