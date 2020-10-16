
const {Roles} = require('../models');



const findRole = async (request, response) => {
    const role = await Roles.findAll();
    response.json({ results: role })
};

const findRoleById = async (request, response) => {
    const roleId = request.params.id;
    const roles = await Roles.findOne({
        where: {
            id: roleId
        }
    });
    response.json(roles)
};

const addRole = async (request, response) => {

    let {
        name
    } = request.body;


    const role = await Roles.create({
        name,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "It has added the role successfully", role })
};

const updateRole =async (request, response) => {
    let roleId = request.params.id;
 
    let {
        name
    } = request.body;
    try {
        const roles = await Roles.update({
            name,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: roleId
            }
        }); 
        const role = roles[1][0].dataValues;
        response.json(role);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The role has not updated correctly" });
    }
};

const deleteRole = async (request, response) => {
    let roleId = request.params.id;
    let role = await Roles.destroy({where: {id: roleId}});
    response.json({
        message: "The role been deleted succesfully",
        role
    });
};



// EXPORT
module.exports = {
    addRole,
    findRole,
    findRoleById,
    deleteRole,
    updateRole
}



