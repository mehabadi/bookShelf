const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'SUPERCREATEPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/booksShelf'
    }
}
module.exports.get = function get(env){
    return config[env] || config.default;
}
// OR
// exports.get = function get(env){
//     return config[env] || config.default;
// }