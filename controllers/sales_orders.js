
const { Sales_Orders, Coupons, Sessions, Users } = require('../models');



const findSale_Order = async (request, response) => {

    try {
        const saleOrder = await Sales_Orders.findAll({
            model: Coupons,
            as: 'Coupons',
            // attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            attributes: ['id', 'code', 'description', 'active', 'value', 'multiple', 'start_date', 'end_date']
        }, {
            model: Sessions,
            as: 'Sessions',
            // attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            attributes: ['id', 'data']
        }, {
            model: Users,
            as: 'Users',
            // attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
            attributes: ['id', 'email', 'first_name', 'last_name']
        }
        );
        response.json({ results: saleOrder })

    } catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The sale orders has not found" })
    }

};

const findSale_OrderById = async (request, response) => {
    const saleOrderId = request.params.id;

    try {

        const salesOrders = await Sales_Orders.findOne({
            where: {
                id: saleOrderId
            }
        });
        response.json(salesOrders)

    }
    catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The sale order not found" })

    }

};

/* const searchSalesOrderByPage = async (request, response) => {

    try {
        const limit = request.query.limit;
        const page = request.query.page;

        //Offset se refiere al numero de registros que excluiremos de la consulta
        const salesOrders = await Sales_Orders.findAndCountAll({
            offset: limit * (page - 1),
            limit: limit,
        })

        const pages = Math.ceil(users.count / limit);

        let nextPage = page < pages ? page + 1 : pages
        let prevPage = page > 1 ? page - 1 : 1

        response.json({ nextPage, prevPage, pages: pages, results: salesOrders })

    } catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The sales order's page not found " })
    }

};
 */
const addSale_Order = async (request, response) => {

    let {
        order_date,
        total,
        coupon_id,
        session_id,
        user_id
    } = request.body;

    try {

        const salesOrder = await Sales_Orders.create({
            order_date,
            total,
            coupon_id,
            session_id,
            user_id
        })

        response.json({ message: "It has added the sale order successfully", salesOrder })

    } catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The sale order can't be created" })
    }

};

const updateSale_Order = async (request, response) => {
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

    try {

        let saleOrder = await Sales_Orders.destroy({ where: { id: saleOrderId } });
        response.json({
            message: "The sale order been deleted succesfully",
            saleOrder
        });

    } catch (error) {
        console.log(error)
            .status(400)
            .json({ message: "The sale order has not been deleted" })
    }

};


// EXPORT
module.exports = {
    addSale_Order,
    findSale_Order,
    findSale_OrderById,
    // searchSalesOrderByPage,
    deleteSale_Order,
    updateSale_Order
}



