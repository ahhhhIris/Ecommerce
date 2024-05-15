import React, { useEffect, useState } from 'react'
import { BsArrowDownRight } from "react-icons/bs";
import { Table } from "antd";
import { Column } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlice';

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
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "price",
  },
  {
    title: "Created Time",
    dataIndex: "time",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const Dashboard = () => {
  
  const dispatch=useDispatch()
  const monthlyDataState=useSelector(state=>state.auth.monthlyData)
  const yearlyDataState=useSelector(state=>state.auth.yearlyData)
  const orderState=useSelector(state=>state.auth.orders)
  // console.log(orderState);
  console.log(yearlyDataState);
  // console.log(monthlyDataState);
  const [dataMonthly,setDataMonthly]=useState([])
  const [dataMonthlySales,setDataMonthlySales]=useState([])
  const [orderDara,setorderDara]=useState([])

  const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

 const config3 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

  useEffect(()=>{
    dispatch(getMonthlyData(config3))
    dispatch(getYearlyData(config3))
    dispatch(getOrders(config3))
  },[])

  useEffect(()=>{
    let monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let data=[]
    let monthlyOrderCount=[]
    for(let i=0;i<monthlyDataState?.length;i++){
      const element=monthlyDataState[i]
      // console.log(monthlyDataState[i]);
      data.push({type:monthNames[element?._id-1],income:element?.amount})
      monthlyOrderCount.push({type:monthNames[element?._id-1],sales:element?.count})
      // console.log(monthNames[element?._id?.month]);
      // console.log(element?._id?.count);
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)
    

    const data1=[]
    for(let i=0;i<orderState?.length;i++){
      let totalCount=0
      const chinaTime = new Date(orderState[i].createdAt).toLocaleString("zh-CN", {timeZone: "Asia/Shanghai"})
      for(let j=0;j<orderState[i]?.orderItem?.length;j++){
        totalCount=totalCount+orderState[i].orderItem[j]?.quantity
      }
      data1.push({
        key:i+1,
        name:orderState[i]?.user?.firstname +" "+ orderState[i]?.user?.lastname,
        product:totalCount,
        price:orderState[i]?.totalPriceAfterDiscount,
        status:orderState[i]?.orderStatus,
        time:chinaTime,
      })
    }
    setorderDara(data1)

  },[orderState,monthlyDataState,yearlyDataState])

  const config = {
    data:dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data:dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Yearly Total Income</p>
            <h4 className="mb-0 sub-title">RMB {yearlyDataState&&yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Yearly Total Sales</p>
            <h4 className="mb-0 sub-title">Orders {yearlyDataState&&yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            
          </div> 
        </div>
      </div>
      <div className='d-flex justify-content-between gap-3'>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderDara} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard
