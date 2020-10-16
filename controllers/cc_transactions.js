
const {CC_Transactions} = require('../models');



const findCC_Trans = async (request, response) => {
    const ccTrans = await CC_Transactions.findAll();
    response.json({ results: ccTrans })
};

const findCC_TransById = async (request, response) => {
    const ccTransId = request.params.id;
    const ccTrans = await CC_Transactions.findOne({
        where: {
            id: ccTransId
        }
    });
    response.json(ccTrans)
};

const addCC_Trans = async (request, response) => {

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


    const cc_trans = await CC_Transactions.create({
        code,
        order_id,
        transdate,
        processor,
        processor_trans_id,
        amount,
        cc_num,
        cc_type,
        response,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The transaction has been added successfully", cc_trans })
};

const updateCC_Trans =async (request, response) => {
    let ccTransId = request.params.id;
 
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
    } = request.body;
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
        response.json(ccTrans);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteCC_Trans = async (request, response) => {
    let ccTransId = request.params.id;
    let ccTrans = await CC_Transactions.destroy({where: {id: ccTransId}});
    response.json({
        message: "The transaction has been deleted succesfully",
        ccTrans
    });
};



// EXPORT
module.exports = {
    addCC_Trans,
    findCC_Trans,
    findCC_TransById,
    deleteCC_Trans,
    updateCC_Trans
}



