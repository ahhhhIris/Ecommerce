import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getCart } from "../features/auth/authSlice";
import* as yup from"yup"
import { useFormik } from "formik";


const shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address is Required"),
  mobile:yup.string().required("Mobile is Required"),
  city:yup.string().required("City is Required"),
  other:yup.string().required("Other Information is Required"),
});


const Checkout = () => {
  const dispatch=useDispatch()
  const cartState = useSelector((state) => state?.auth?.cart);
  console.log(cartState);
  const[totalAmout,setTotalAmout]=useState(null)
  const[shippingInfo,setShippingInfo]=useState(null)
  const[cartProduct,setCartProduct]=useState(null)
  useEffect(() => {
    getCart();
  }, [dispatch]);

  useEffect(()=>{
    let sum=0;
    for(let i=0;i<cartState?.length;i++){
      sum=sum+(Number(cartState[i].quantity)*cartState[i].price)
    }
    setTotalAmout(sum)
  },[cartState])

  useEffect(()=>{
    let items=[];
    for(let i=0;i<cartState?.length;i++){
      items.push({products:cartState[i]?.productId?._id,quantity:cartState[i]?.quantity,price:cartState[i]?.price})
    }
    setCartProduct(items)
  },[cartState])

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      mobile:'',
      city:'',
      other:'',
    },
    validationSchema:shippingSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setShippingInfo(values);
      console.log(shippingInfo);
      dispatch(createOrder({totalPrice:totalAmout,totalPriceAfterDiscount:totalAmout,orderItem:cartProduct,shippingInfo:shippingInfo}))
    },
  },[]);
  useEffect(() => {
    setShippingInfo(formik.values);
  }, [formik.values]);


  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">DS Shope</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                {cartState[0]?.userId?.firstname} {cartState[0]?.userId?.lastname} ({cartState[0]?.userId?.email})
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                <input
                    type="text"
                    placeholder="Mobile"
                    className="form-control"
                    value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  />
                <div className="errors ms-2 my-1">
                  {
                    formik.touched.mobile&&formik.errors.mobile
                  }
                </div>
                  </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  />
                <div className="errors ms-2 my-1">
                  {
                    formik.touched.firstname&&formik.errors.firstname
                  }
                </div>
                  </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    />
                  <div className="errors ms-2 my-1">
                    {
                      formik.touched.lastname&&formik.errors.lastname
                    }
                  </div>
                  </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    />
                  <div className="errors ms-2 my-1">
                    {
                      formik.touched.address&&formik.errors.address
                    }
                  </div>
                  </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    />
                  <div className="errors ms-2 my-1">
                    {
                      formik.touched.other&&formik.errors.other
                    }
                  </div>
                  </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    />
                  <div className="errors ms-2 my-1">
                    {
                      formik.touched.city&&formik.errors.city
                    }
                  </div>
                  </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">Place Order</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                cartState && cartState?.map((item,index)=>{
                  return(
                <div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {item?.quantity}
                    </span>
                    <img className="img-fluid" width={100} height={100} src={item?.productId?.images[0]?.url} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">{item?.productId?.title}</h5>
                  
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">RMB {item?.price*item?.quantity}</h5>
                </div>
              </div>
                  )
                })
              }
              
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">RMB {totalAmout?totalAmout:"0"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">RMB 0</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">RMB {totalAmout?totalAmout:"0"}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
