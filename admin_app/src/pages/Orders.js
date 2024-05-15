import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    let totalCount=0
      for(let j=0;j<orderState[i]?.orderItem?.length;j++){
        totalCount=totalCount+orderState[i].orderItem[j]?.quantity
      }
    data1.push({
      key: i + 1,
      name: orderState[i].user.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]._id}`}>
          View Orders
        </Link>
      ),
      amount:totalCount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
         <select name="" defaultValue={orderState[i].orderStatus} onChange={(e)=>updateOrder(orderState[i]?._id,e.target.value)} className="form-control form select" id="">
          <option value="Ordered">Ordered</option>
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        </>
      ),
    });
  }
  const updateOrder=(a,b)=>{
    dispatch(updateOrderStatus({id:a,status:b}))
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
