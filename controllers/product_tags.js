
const {Product_Tags} = require('../models');





const findProduct_Tag = async (request, response) => {
    const productTag = await Product_Tags.findAll();
    response.json({ results: productTag })
};

const findProduct_TagById = async (request, response) => {
    const productTagId = request.params.id;
    const productTags = await Product_Tags.findOne({
        where: {
            id: productTagId
        }
    });
    response.json(productTags)
};

const addProduct_Tag = async (request, response) => {

    let {
        product_id,
        tag_id
    } = request.body;


    const productTag = await Product_Tags.create({
        product_id,
        tag_id,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The product tag has been added successfully", productTag })
};

const updateProduct_Tag =async (request, response) => {
    let productTagId = request.params.id;
 
    let {
        product_id,
        tag_id
    } = request.body;
    try {
        const productTags = await Product_Tags.update({
            product_id,
            tag_id,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: productTagId
            }
        }); 
        const productTag = productTags[1][0].dataValues;
        response.json(productTag);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteProduct_Tag = async (request, response) => {
    let productTagId = request.params.id;
    let productTag = await Product_Tags.destroy({where: {id: productTagId}});
    response.json({
        message: "The product tag has been deleted succesfully",
        productTag
    });
};


// EXPORT
module.exports = {
    addProduct_Tag,
    findProduct_Tag,
    findProduct_TagById,
    deleteProduct_Tag,
    updateProduct_Tag
}



