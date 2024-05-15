const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRoute=require("./routes/authRoute");
const productRoute=require("./routes/productRoute");
const categoryRoute=require("./routes/categoryRoute");
const brandRoute=require("./routes/brandRoute");
const couponRoute=require("./routes/couponRoute");
const colorRoute=require("./routes/colorRoute");
const enqRoute=require("./routes/enqRoute");

const cors =require("cors") 
const bodyParser = require("body-parser");
const {notFound,errorHandler} = require("./middlewares/errorHandler");
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
dbConnect();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())

app.use('/api/user',authRoute);
app.use('/api/product',productRoute);
app.use('/api/category',categoryRoute);
app.use('/api/brand',brandRoute);
app.use('/api/coupon',couponRoute);
app.use('/api/color',colorRoute);
app.use('/api/enquiry',enqRoute);


app.use(notFound)
app.use(errorHandler)




app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
