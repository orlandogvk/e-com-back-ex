const jwt = require('jsonwebtoken');

const user = {
    id: 7,
    email: "orlandog79@gmail.com",
    first_name: "Orlando",
    last_name: "Rodriguez",
    roles: [
        {
            "id": 17,
            "name": "Admin"
        }
    ]
}

const genAuthToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles
    }, process.env.JWT_SECRET, {expiresIn: '1hr'});
    return token;
}

module.exports = {
    genAuthToken,
    user
}
