
const {Tags} = require('../models');


const findTag = async (request, response) => {
    const tag = await Tags.findAll();
    response.json({ results: tag })
};

const findTagById = async (request, response) => {
    const tagId = request.params.id;
    const tags = await Tags.findOne({
        where: {
            id: tagId
        }
    });
    response.json(tags)
};

const addTag = async (request, response) => {

    let {
        name
    } = request.body;


    const tag = await Tags.create({
        name,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The tag was added successfully", tag })
};

const updateTag =async (request, response) => {
    let tagId = request.params.id;
 
    let {
        name
    } = request.body;
    try {
        const tags = await Tags.update({
            name,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: tagId
            }
        }); 
        const tag = tags[1][0].dataValues;
        response.json(tag);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The tag has not updated correctly" });
    }
};

const deleteTag = async (request, response) => {
    let tagId = request.params.id;
    let tag = await Tags.destroy({where: {id: tagId}});
    response.json({
        message: "The tag has been deleted succesfully",
        tag
    });
};


// EXPORT
module.exports = {
    addTag,
    findTag,
    findTagById,
    deleteTag,
    updateTag
}



