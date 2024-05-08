const jwt = require("jsonwebtoken");

let generateToken = function(data) {
    let findData = JSON.stringify(data);
    // because it accept string or object literal

    let token = jwt.sign(findData, "samarthvohra");
                                    // secrete key so that it cnt be decode

    return token;
};

module.exports=generateToken;