
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
    deleteOrder_Product,
    updateOrder_Product
}



