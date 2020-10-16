
const {Product_Categories} = require('../models');



const findProduct_Cat = async (request, response) => {
    const productCat = await Product_Categories.findAll();
    response.json({ results: productCat })
};

const findProduct_CatById = async (request, response) => {
    const productCatId = request.params.id;
    const productCat = await Product_Categories.findOne({
        where: {
            id: productCatId
        }
    });
    response.json(productCat)
};

const addProduct_Cat = async (request, response) => {

    let {
        category_id,
        product_id
    } = request.body;


    const productCat = await Product_Categories.create({
        category_id,
        product_id,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The product category has been added successfully", productCat })
};

const updateProduct_Cat =async (request, response) => {
    let productCatId = request.params.id;
 
    let {
        category_id,
        product_id
    } = request.body;
    try {
        const productCats = await Product_Categories.update({
            category_id,
            product_id,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: productCatId
            }
        }); 
        const productCat = productCats[1][0].dataValues;
        response.json(productCat);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteProduct_Cat = async (request, response) => {
    let productCatId = request.params.id;
    let productCat = await Product_Categories.destroy({where: {id: productCatId}});
    response.json({
        message: "The product category has been deleted succesfully",
        productCat
    });
};


// EXPORT
module.exports = {
    addProduct_Cat,
    findProduct_Cat,
    findProduct_CatById,
    deleteProduct_Cat,
    updateProduct_Cat
}



