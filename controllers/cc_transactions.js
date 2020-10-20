
const { CC_Transactions, Sales_Orders } = require('../models');



const findCC_Trans = async (request, response) => {
    try {
        const ccTrans = await CC_Transactions.findAll({
            model: Sales_Orders,
            as: 'Sales_Orders',
            attributes: ['id', 'order_date', 'total', 'coupon_id', 'session_id', 'user_id']
        });
        response.json({ results: ccTrans })

    } catch (error) {
        console.log(error);
        console.log(error)
        response
            .status(400)
            .json({ message: "The transactions has not been found" })
    }
};

const findCC_TransById = async (request, response) => {

    const ccTransId = request.params.id;

    try {
        const ccTrans = await CC_Transactions.findOne({
            where: {
                id: ccTransId
            }
        });
        response.json(ccTrans)

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The transaction has not found" })
    }


};

const addCC_Trans = async (req, res) => {

    let {
        code,
        order_id,
        transdate,
        processor,
        processor_trans_id,
        amount,
        cc_num,
        cc_type,
        response
    } = request.body;

    try {
        const cc_trans = await CC_Transactions.create({
            code,
            order_id,
            transdate,
            processor,
            processor_trans_id,
            amount,
            cc_num,
            cc_type,
            response
        })

        res.json({ message: "The transaction has been added successfully", cc_trans })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ message: "The transaction has not been created" });
    }

};

const updateCC_Trans = async (req, res) => {
    let ccTransId = req.params.id;

    let {
        code,
        order_id,
        transdate,
        processor,
        processor_trans_id,
        amount,
        cc_num,
        cc_type,
        response,
    } = req.body;
    try {
        const cc_transactions = await CC_Transactions.update({
            code,
            order_id,
            transdate,
            processor,
            processor_trans_id,
            amount,
            cc_num,
            cc_type,
            response,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: ccTransId
            }
        });
        const ccTrans = cc_transactions[1][0].dataValues;
        res.json(ccTrans);
    } catch (error) {
        res
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteCC_Trans = async (request, response) => {

    let ccTransId = request.params.id;

    try {
        let ccTrans = await CC_Transactions.destroy({ where: { id: ccTransId } });
        response.json({
            message: "The transaction has been deleted succesfully",
            ccTrans
        });
    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The transaction has not been deleted" })
    }

};



// EXPORT
module.exports = {
    addCC_Trans,
    findCC_Trans,
    findCC_TransById,
    deleteCC_Trans,
    updateCC_Trans
}



