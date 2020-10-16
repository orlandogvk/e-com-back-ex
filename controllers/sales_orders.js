
const {Sales_Orders} = require('../models');



const findSale_Order = async (request, response) => {
    const saleOrder = await Sales_Orders.findAll();
    response.json({ results: saleOrder })
};

const findSale_OrderById = async (request, response) => {
    const saleOrderId = request.params.id;
    const salesOrders = await Sales_Orders.findOne({
        where: {
            id: saleOrderId
        }
    });
    response.json(salesOrders)
};

const searchSalesOrderByPage=async(request,response)=>{
    const limit = request.query.limit;
    const page = request.query.page;
    
     //Offset se refiere al numero de registros que excluiremos de la consulta
     const salesOrders = await Sales_Orders.findAndCountAll({
        offset: limit * (page - 1),
        limit: limit,
    })

    const pages=Math.ceil(users.count/limit);

    let nextPage=page<pages?page+1:pages
    let prevPage=page>1?page-1:1

    response.json({nextPage, prevPage, pages: pages, results: salesOrders })

};

const addSale_Order = async (request, response) => {

    let {
        order_date,
        total,
        coupon_id,
        session_id,
        user_id
    } = request.body;


    const salesOrder = await Sales_Orders.create({
        order_date,
        total,
        coupon_id,
        session_id,
        user_id,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "It has added the sale order successfully", salesOrder })
};

const updateSale_Order =async (request, response) => {
    let saleOrderId = request.params.id;
 
    let {
        order_date,
        total,
        coupon_id,
        session_id,
        user_id
    } = request.body;
    try {
        const salesOrders = await Sales_Orders.update({
            order_date,
            total,
            coupon_id,
            session_id,
            user_id,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: saleOrderId
            }
        }); 
        const saleOrder = salesOrders[1][0].dataValues;
        response.json(saleOrder);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The sale order has not updated correctly" });
    }
};

const deleteSale_Order = async (request, response) => {
    let saleOrderId = request.params.id;
    let saleOrder = await Sales_Orders.destroy({where: {id: saleOrderId}});
    response.json({
        message: "The sale order been deleted succesfully",
        saleOrder
    });
};


// EXPORT
module.exports = {
    addSale_Order,
    findSale_Order,
    findSale_OrderById,
    searchSalesOrderByPage,
    deleteSale_Order,
    updateSale_Order
}



