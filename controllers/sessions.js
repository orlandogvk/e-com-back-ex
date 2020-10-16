
const {Sessions} = require('../models');



const findSession = async (request, response) => {
    const session = await Sessions.findAll();
    response.json({ results: session })
};

const findSessionById = async (request, response) => {
    const sessionId = request.params.id;
    const sessions = await Sessions.findOne({
        where: {
            id: sessionId
        }
    });
    response.json(sessions)
};

const addSession = async (request, response) => {

    let {
        data
    } = request.body;


    const session = await Sessions.create({
        data,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "It has added the session successfully", session })
};

const updateSession =async (request, response) => {
    let sessionId = request.params.id;
 
    let {
        data
    } = request.body;
    try {
        const sessions = await Sessions.update({
            data,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: sessionId
            }
        }); 
        const session = sessions[1][0].dataValues;
        response.json(session);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The session has not updated correctly" });
    }
};

const deleteSession = async (request, response) => {
    let sessionId = request.params.id;
    let session = await Sessions.destroy({where: {id: sessionId}});
    response.json({
        message: "The session has been deleted succesfully",
        session
    });
};



// EXPORT
module.exports = {
    addSession,
    findSession,
    findSessionById,
    deleteSession,
    updateSession
}



