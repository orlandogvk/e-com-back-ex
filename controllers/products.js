
const {Products} = require('../models');





const findProduct = async (request, response) => {
    const product = await Products.findAll();
    response.json({ results: product })
};

const findProductById = async (request, response) => {
    const productId = request.params.id;
    const products = await Products.findOne({
        where: {
            id: productId
        }
    });
    response.json(products)
};

const searchProductByPage=async(request,response)=>{
    const limit = request.query.limit;
    const page = request.query.page;
    
     //Offset se refiere al numero de registros que excluiremos de la consulta
     const products = await Products.findAndCountAll({
        offset: limit * (page - 1),
        limit: limit,
    })

    const pages=Math.ceil(users.count/limit);

    let nextPage=page<pages?page+1:pages
    let prevPage=page>1?page-1:1

    response.json({nextPage, prevPage, pages: pages, results: products })

};


const addProduct = async (request, response) => {

    let {
        sku,
        name,
        description,
        product_status_id,
        regular_price,
        discount_price,
        quantity,
        taxable
    } = request.body;


    const product = await Products.create({
        sku,
        name,
        description,
        product_status_id,
        regular_price,
        discount_price,
        quantity,
        taxable,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The product has been added successfully", product })
};

const updateProduct =async (request, response) => {
    let productId = request.params.id;
 
    let {
        sku,
        name,
        description,
        product_status_id,
        regular_price,
        discount_price,
        quantity,
        taxable
    } = request.body;
    try {
        const products = await Products.update({
            sku,
            name,
            description,
            product_status_id,
            regular_price,
            discount_price,
            quantity,
            taxable,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: productId
            }
        }); 
        const product = products[1][0].dataValues;
        response.json(product);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteProduct = async (request, response) => {
    let productId = request.params.id;
    let product = await Products.destroy({where: {id: productId}});
    response.json({
        message: "The product has been deleted succesfully",
        product
    });
};

// EXPORT
module.exports = {
    addProduct,
    findProduct,
    findProductById,
    searchProductByPage,
    deleteProduct,
    updateProduct
}



