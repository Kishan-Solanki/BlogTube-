const jwt = require("jsonwebtoken");

const seceret = "Any$eceret@!123";

function createTokenForUser(user) {
    const payload = {
        _id:user.id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        fullName:user.fullName,
        role:user.role,
    };
    const token = jwt.sign(payload,seceret);
    return token;
};
function validateToken(token){
    const payload=jwt.verify(token,seceret);
    return payload;
};
module.exports={
    createTokenForUser,
    validateToken,
}