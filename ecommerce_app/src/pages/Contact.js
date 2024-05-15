import React, { useEffect } from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch } from 'react-redux';
import { createEnquiry } from '../features/enquiry/enquirySlice';
import* as yup from "yup"
import { useFormik } from 'formik';

const contactSchema = yup.object({
  name:yup.string().nullable().required("Name is Required"),
  email:yup.string().nullable().email("Email should be valid").required("Email is Required"),
  comment: yup.string().nullable().required("Please Input Your Comments"),
  mobile:yup.string().nullable().required("Mobile is Required"),
});

const Contact = () => {
  const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile:'',
      comment:'',
    },
    validationSchema:contactSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(createEnquiry(values))
    },
  });
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1835.6945030182733!2d113.40425773352861!3d23.046195760415827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340252ee08400b49%3A0x6b322e71fe984562!2sSouth%20China%20University%20of%20Technology!5e0!3m2!1sen!2shk!4v1715398400857!5m2!1sen!2shk"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="name"
                      className="form-control"
                      placeholder="Name"
                      name='name'
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                    />
                  </div>
                    <div className='errors'>
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name='email'
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className='errors'>
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </div>
                  </div>
                  <div>
                    <input
                      type="mobile"
                      className="form-control"
                      placeholder="Mobile Number"
                      name='mobile'
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      value={formik.values.mobile}
                    />
                    <div className='errors'>
                      {
                        formik.touched.mobile && formik.errors.mobile
                      }
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="comment"
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      value={formik.values.comment}
                    >
                    </textarea>
                    <div className='errors'>
                      {
                        formik.touched.comment && formik.errors.comment
                      }
                    </div>
                  </div>
                 
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                      South China University of Technology
                      , Guangdong Province, Guangzhou, Panyu District
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="mobile:+92 3039255409">+86 13432786400</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="sa5882218@gmail.com">
                        irishuang0807@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contact
