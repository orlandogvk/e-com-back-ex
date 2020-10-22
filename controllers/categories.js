
const { Categories } = require('../models');


/* const findCategory = async (request, response) => {
    try {
        const categories = await Categories.findAll({
            include: [{
                model: Categories,
                as: 'Categories'
            }]
        });
        response.json({ results: categories })
    }
    catch (error) {
        console.log(error);
        response.status(400).json({ message: "Error to get the categories" });
    }

}; */

const searchCategory = async (request, response) => {

    try {
        const limit = request.query.limit || 10;
        const page = request.query.page || 1;

        //Offset se refiere al numero de registros que excluiremos de la consulta
        const categories = await Categories.findAndCountAll({
            offset: limit * (page - 1),
            limit: limit,
        })

        const pages = Math.ceil(categories.count / limit);

        let nextPage = page < pages ? page + 1 : pages
        let prevPage = page > 1 ? page - 1 : 1

        response.json({ nextPage, prevPage, pages: pages, results: categories })

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "Error to find the page category" });
    }

};

const findCatById = async (request, response) => {
    const catId = request.params.id;
    try {
        const categories = await Categories.findOne({
            where: {
                id: catId
            }
        });
        response.json(categories)

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The category has not been found" })
    }


};

const addCategory = async (request, response) => {

    let {
        name,
        parent_id
    } = request.body;

    try {

        const category = await Categories.create({
            name,
            parent_id
        });
        response.json({ message: "The category has been added successfully", category });

    }
    catch (error) {
        console.log(error);
        response.status(400).json({ message: "Error to create the category" });
    }

};

const updateCategory = async (request, response) => {
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
    
    try {
        let category = await Categories.destroy({ where: { id: catId } });
        response.json({
            message: "The category has been deleted succesfully",
            category
        });

    } catch (error) {
        console.log(error);
        response
        .status(400)
        .json({ message: "The category has not been deleted"})
    }

};



// EXPORT
module.exports = {
    addCategory,
    searchCategory,
    // findCategory,
    findCatById,
    deleteCategory,
    updateCategory
}



