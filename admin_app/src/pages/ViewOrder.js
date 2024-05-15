import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { getOrderByUser, getOrders, getSingleOrder } from "../features/auth/authSlice";
import { BiArrowBack } from "react-icons/bi";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "products Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  }
];

const ViewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  // console.log(orderId);
  const orderState = useSelector((state) => state.auth.singleorder);
  // console.log(orderState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [orderId,dispatch]);
  const goBack = () => {
    navigate(-1);
  };
  const data1 = [];
  if(orderState){
    const chinaTime = new Date(orderState.createdAt).toLocaleString("zh-CN", {timeZone: "Asia/Shanghai"})
  for(let j = 0; j < orderState?.orderItem?.length; j++){
    data1.push({
      key: j + 1,
      name: orderState.orderItem[j].products.title,
      brand: orderState.orderItem[j].products.brand,
      count: orderState.orderItem[j].quantity,
      price: orderState.orderItem[j].products.price,
      date: chinaTime,
      status:orderState.orderStatus,
    });
  }
  }
  // console.log(data1);
  return (
    <div>
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="mb-4 title">View Order</h3>
      <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
      </button>
    </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
  </div>
  );
};

export default ViewOrder;
