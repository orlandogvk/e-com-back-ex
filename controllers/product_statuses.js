
const {Product_Statuses} = require('../models');



const findProduct_Stat = async (request, response) => {
    const productStat = await Product_Statuses.findAll();
    response.json({ results: productStat })
};

const findProduct_StatById = async (request, response) => {
    const productStatId = request.params.id;
    const productStat = await Product_Statuses.findOne({
        where: {
            id: productStatId
        }
    });
    response.json(productStat)
};

const addProduct_Stat = async (request, response) => {

    let {
        name
    } = request.body;


    const productStat = await Product_Statuses.create({
        name,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The product status has been added successfully", productStat })
};

const updateProduct_Stat =async (request, response) => {
    let productStatId = request.params.id;
 
    let {
        name
    } = request.body;
    try {
        const productStats = await Product_Statuses.update({
            name,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: productStatId
            }
        }); 
        const productStat = productStats[1][0].dataValues;
        response.json(productStat);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteproduct_Stat = async (request, response) => {
    let productStatId = request.params.id;
    let productStat = await Product_Statuses.destroy({where: {id: productStatId}});
    response.json({
        message: "The product status has been deleted succesfully",
        productStat
    });
};


// EXPORT
module.exports = {
    addProduct_Stat,
    findProduct_Stat,
    findProduct_StatById,
    deleteproduct_Stat,
    updateProduct_Stat
}



