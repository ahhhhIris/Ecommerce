const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    shippingInfo:{
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        mobile:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        other:{
            type:String,
            required:true,
        }
    },
    orderStatus:{
        type:String,
        default:"Ordered",
        enum:["Ordered","Cash on Delivery","Processing","Dispatched","Delivered","Cancelled"],
    },
    orderItem:[
        {products:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        }
    }
    ],
    paiedAt:{
        type:Date,
        default:Date.now(),
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    totalPriceAfterDiscount:{
        type:Number,
        required:true,
    }
    },{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);