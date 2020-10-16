const bcrypt = require('bcryptjs');
const {Users} = require('../models');


const findUsers = async (request, response) => {
    const users = await Users.findAll();
    response.json({ results: users })
};

const findById = async (request, response) => {
    const userId = request.params.id;
    const users = await Users.findOne({
        where: {
            id: userId
        }
    });
    response.json(users)
};

const searchUserByPage=async(request,response)=>{
    const limit = request.query.limit;
    const page = request.query.page;
    
     //Offset se refiere al numero de registros que excluiremos de la consulta
     const users = await Users.findAndCountAll({
        offset: limit * (page - 1),
        limit: limit,
    })

    const pages=Math.ceil(users.count/limit);

    let nextPage=page<pages?page+1:pages
    let prevPage=page>1?page-1:1

    response.json({nextPage, prevPage, pages: pages, results: users })

};

//Generating short token
const generateToken = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
};

const addUser = async (request, response) => {


    let {
        email,
        first_name,
        last_name,
        active,
        password,
        token
    } = request.body;

    //Encrypting the password with bcryptjs
    const passwordEncrypted = bcrypt.hashSync(password, 10);

    const user = await Users.create({
        email,
        first_name,
        last_name,
        password: passwordEncrypted,
        token: generateToken(8),
        created_at: new Date(),
        updated_at: new Date()
    })
    await Users.update({active:true},{ where: {id:user.id}})
    response.json({ message: "The user was added successfully", user })
};

const updateUser =async (request, response) => {
    let userId = request.params.id;
 
    let {
        email,
        first_name,
        last_name,
        active,
        password,
        token,
    } = request.body;
    try {
        const users = await Users.update({
            email,
            first_name,
            last_name,
            active,
            password,
            token,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: userId
            }
        }); 
        const user = users[1][0].dataValues;
        response.json(user);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteUser = async (request, response) => {
    let userId = request.params.id;
    let decoded = jwt.verify(request.token, process.env.JWT_SECRET);
    try{
        let user = await Users.findOne({
            where: {
                id: userId
            }
        });
        if(decoded.id !== Number(userId) && user){
            await Users.update({active: false}, {
                where: {
                    id: userId
                }
            });
            response.json({message: "The account has been inactive"});
        }else{
            response.status(400).json({message: "There's an error to try to disable the acount"});
        }
    }catch(error){
        response.status(400).json({message: "There's an error to try to disable the acount"});
    }

};

const me = async(request, response) => {
    response.json({results: request.decoded})
};



// EXPORT
module.exports = {
    addUser,
    findUsers,
    findById,
    searchUserByPage,
    deleteUser,
    updateUser,
    me
}



