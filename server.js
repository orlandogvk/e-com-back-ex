const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');


//Import routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const roleRouter=require('./routes/roles');
const user_roleRouter=require('./routes/user_roles');
const tagRouter=require('./routes/tags');
const product_tagRouter=require('./routes/product_tags');
const productRouter=require('./routes/products');
const order_productRouter=require('./routes/order_products');
const couponRouter=require('./routes/coupons');
const cc_transactionRouter=require('./routes/cc_transactions');
const categoryRouter=require('./routes/categories');
const product_categoryRouter=require('./routes/product_categories');
const product_statusRouter=require('./routes/product_statuses');
const sale_orderRouter=require('./routes/sales_orders');
const sessionRouter=require('./routes/sessions');


//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

//Auth routes

app.use(authRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(user_roleRouter);
app.use(tagRouter);
app.use(product_tagRouter);
app.use(productRouter);
app.use(order_productRouter);
app.use(couponRouter);
app.use(cc_transactionRouter);
app.use(categoryRouter);
app.use(product_categoryRouter);
app.use(product_statusRouter);
app.use(sale_orderRouter);
app.use(sessionRouter);

app.get('/', (request, response) => {
    response.send("Hello world");
});


module.exports = app;