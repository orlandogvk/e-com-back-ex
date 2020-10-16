
const {Order_Products} = require('../models');



const findOrder_Product = async (request, response) => {
    const orderProd = await Order_Products.findAll();
    response.json({ results: orderProd })
};

const findOrder_ProductById = async (request, response) => {
    const orderProdId = request.params.id;
    const orderProd = await Order_Products.findOne({
        where: {
            id: orderProdId
        }
    });
    response.json(orderProd)
};

const searchOrderProductByPage=async(request,response)=>{
    const limit = request.query.limit;
    const page = request.query.page;
    
     //Offset se refiere al numero de registros que excluiremos de la consulta
     const orderProducts = await Order_Products.findAndCountAll({
        offset: limit * (page - 1),
        limit: limit,
    })

    const pages=Math.ceil(users.count/limit);

    let nextPage=page<pages?page+1:pages
    let prevPage=page>1?page-1:1

    response.json({nextPage, prevPage, pages: pages, results: orderProducts })

};

const addOrder_Product = async (request, response) => {

    let {
        order_id,
        sku,
        name,
        description,
        price,
        quantity,
        subtotal
    } = request.body;


    const orderProd = await Order_Products.create({
        order_id,
        sku,
        name,
        description,
        price,
        quantity,
        subtotal,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The order product has been added successfully", orderProd })
};

const updateOrder_Product =async (request, response) => {
    let orderProductId = request.params.id;
 
    let {
        order_id,
        sku,
        name,
        description,
        price,
        quantity,
        subtotal
    } = request.body;
    try {
        const orderProducts = await Order_Products.update({
            order_id,
            sku,
            name,
            description,
            price,
            quantity,
            subtotal,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: orderProductId
            }
        }); 
        const orderProduct = orderProducts[1][0].dataValues;
        response.json(orderProduct);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteOrder_Product = async (request, response) => {
    let orderProductId = request.params.id;
    let orderProduct = await Order_Products.destroy({where: {id: orderProductId}});
    response.json({
        message: "The order product has been deleted succesfully",
        orderProduct
    });
};

// EXPORT
module.exports = {
    addOrder_Product,
    findOrder_Product,
    findOrder_ProductById,
    searchOrderProductByPage,
    deleteOrder_Product,
    updateOrder_Product
}



