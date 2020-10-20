
const { Roles } = require('../models');



const findRole = async (request, response) => {
    try {

        const role = await Roles.findAll();
        response.json({ results: role })

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The roles can't be found" })
    }

};

const findRoleById = async (request, response) => {

    const roleId = request.params.id;
    try {

        const roles = await Roles.findOne({
            where: {
                id: roleId
            }
        });
        response.json(roles)

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The role can't be dound" })
    }

};

const addRole = async (request, response) => {

    let {
        name
    } = request.body;

    try {

        const role = await Roles.create({
            name
        })

        response.json({ message: "It has added the role successfully", role })
    } catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The role has been created" })
    }

};

const updateRole = async (request, response) => {
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

    try {

        let role = await Roles.destroy({ where: { id: roleId } });
        response.json({
            message: "The role been deleted succesfully",
            role
        });

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The Role has been deleted" })
    }

};



// EXPORT
module.exports = {
    addRole,
    findRole,
    findRoleById,
    deleteRole,
    updateRole
}



