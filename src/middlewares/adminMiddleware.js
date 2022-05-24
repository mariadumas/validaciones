const {check} = require("express-validator")

let users = ["Ada", "Greta", "Vim", "Tim"]

function adminMiddleware (req, res, next) {
    let usuario = users.find(function (user) {
       return req.query.user === user
    })
    if (!usuario) {

        res.send("No tienes privilegios para ingresar")
    }
    next()
}


module.exports = adminMiddleware
