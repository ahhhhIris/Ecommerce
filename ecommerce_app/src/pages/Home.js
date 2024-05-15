import React, { useEffect } from 'react'
import Container from '../components/Container'
import Marquee from 'react-fast-marquee';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/product/productSlice';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishlist } from "../features/product/productSlice";

// import { useDispatch, useSelector } from "react-redux"; 

const Home = () => {
  const productState=useSelector((state)=>state?.product?.products)
  
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  useEffect(()=>{
    getProducts();
  },[])
  const getProducts=()=>{
    dispatch(getAllProducts())
  }
  const addWishlist=(id)=>{
    dispatch(addToWishlist(id))
  }
  return (
    <>
      <Container className='home-wrapper-1 py-5'>
          <div className='row'>
            <div className='col-6'>
              <div className="main-banner position-relative ">
                <img src='images/main-banner-1.jpg' className='img-fluid rounded-3' alt='main banner' />
                <div className='main-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                  <Link  className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className='col-6'>
             <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">  
                <div className="small-banner position-relative">
                    <img
                      src="images/catbanner-01.jpg"
                      className="img-fluid rounded-3"
                      alt="main banner"
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>Best Sake</h4>
                      <h5>iPad S13+ Pro.</h5>
                      <p>
                        From $999.00 <br /> or $41.62/mo.
                      </p>
                    </div>
                  </div>
                  <div className="small-banner position-relative">
                    <img
                      src="images/catbanner-02.jpg"
                      className="img-fluid rounded-3"
                      alt="main banner"
                    />
                    <div className="small-banner-content position-absolute">
                      <h4>NEW ARRIVAL</h4>
                      <h5>But IPad Air</h5>
                      <p>
                        From $999.00 <br /> or $41.62/mo.
                      </p>
                    </div>
                  </div>
                  <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>But IPad Air</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>But IPad Air</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
      
      
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img 
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-4.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>


      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {
            productState&&productState?.map((item,index)=>{
              // console.log(item);
              if(item.tags[0]==="special"){
                return <SpecialProduct 
                  key={index}
                  brand={item?.brand}
                  id={item?._id}
                  title={item?.title}
                  totalRating={item?.totalRating.toString()}
                  price={item?.price}
                  sold={item?.sold}
                  quantity={item?.quantity}
                   />
              }
            })
          }
          
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
        {
            productState&&productState?.map((item,index)=>{
              // console.log(item);
              if(item.tags[0]==="popular"){
                return(
                  <div
                  key={index}
                  className={ "col-3" }
                >
                  <div
                    className="product-card position-relative"
                  >
                    <div className="wishlist-icon position-absolute">
                      <button className="border-0 bg-transparent" 
                      onClick={(e)=>{
                        addWishlist(item?._id)
                      }}>
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className="product-image">
                      <img src={item?.images[0]?.url} 
                        className="img-fluid mx-auto" 
                        alt="product image"
                        width={300} />
                      <img src={watch2} 
                        className="img-fluid mx-auto" 
                        alt="product image"
                        width={300} />
                    </div>
                    <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className="product-title">
                      {item?.title}
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={item?.totalRating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      
                      <p className="price">RMB: {item?.price}</p>
                    </div>
                    <div className="action-bar position-absolute">
                      <div className="d-flex flex-column gap-15">
                        <button className="border-0 bg-transparent">
                          <img src={prodcompare} alt="compare" />
                        </button>
                        <button className="border-0 bg-transparent">
                          <img onClick={()=>Navigate("/product/"+item?._id)} src={view} alt="view" />
                        </button>
                        <button className="border-0 bg-transparent">
                          <img src={addcart} alt="addcart" />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
                )
              }
            })
          }
        </div>

      </Container>

      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

    </>
  )
}

export default Home
