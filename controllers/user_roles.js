
const {User_Roles} = require('../models');


const findUser_Role = async (request, response) => {
    const user_role = await User_Roles.findAll();
    response.json({ results: user_role })
};

const findUser_RoleById = async (request, response) => {
    const userRId = request.params.id;
    const user_roles = await User_Roles.findOne({
        where: {
            id: userRId
        }
    });
    response.json(user_roles)
};

const addUser_Role = async (request, response) => {

    let {
        user_id,
        role_id
    } = request.body;


    const user_role = await User_Roles.create({
        user_id,
        role_id,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "It has added the user_role successfully", user_role })
};

const updateUser_Role =async (request, response) => {
    let userRId = request.params.id;
 
    let {
        user_id,
        role_id
    } = request.body;
    try {
        const user_roles = await User_Roles.update({
            user_id,
            role_id,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: userRId
            }
        }); 
        const user_role = user_roles[1][0].dataValues;
        response.json(user_role);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteUser_Role = async (request, response) => {
    let userRId = request.params.id;
    let user_role = await User_Roles.destroy({where: {id: userRId}});
    response.json({
        message: "The row has been deleted succesfully",
        user_role
    });
};


// EXPORT
module.exports = {
    addUser_Role,
    findUser_Role,
    findUser_RoleById,
    deleteUser_Role,
    updateUser_Role
}



