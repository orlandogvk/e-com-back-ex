
const {Categories} = require('../models');


const findCategory = async (request, response) => {
    const categories = await Categories.findAll();
    response.json({ results: categories })
};

const findCatById = async (request, response) => {
    const catId = request.params.id;
    const categories = await Categories.findOne({
        where: {
            id: catId
        }
    });
    response.json(categories)
};

const addCategory = async (request, response) => {

    let {
        name,
        parent_id
    } = request.body;


    const category = await Categories.create({
        name,
        parent_id,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The category has been added successfully", category })
};

const updateCategory =async (request, response) => {
    let catId = request.params.id;
 
    let {
        name,
        parent_id
    } = request.body;
    try {
        const categories = await Categories.update({
            name,
            parent_id,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: catId
            }
        }); 
        const category = categories[1][0].dataValues;
        response.json(category);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteCategory = async (request, response) => {
    let catId = request.params.id;
    let category = await Categories.destroy({where: {id: catId}});
    response.json({
        message: "The category has been deleted succesfully",
        category
    });
};



// EXPORT
module.exports = {
    addCategory,
    findCategory,
    findCatById,
    deleteCategory,
    updateCategory
}



