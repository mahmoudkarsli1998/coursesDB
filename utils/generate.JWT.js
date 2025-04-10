const jwt = require('jsonwebtoken');
module.exports = async(payload)=>{
    // generate JWT token
    const token = await jwt.sign(
       payload,  //  {email:newUser.email , id:newUser._id}
        process.env.JWT_SECRET_KEY, {expiresIn: '1h'}
    );
    return token;
};