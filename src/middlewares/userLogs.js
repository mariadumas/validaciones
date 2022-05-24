const fs = require("fs");
const path = require("path");

function userLogs (req, res, next) {
    fs.appendFileSync(path.join(__dirname, "../logs/userLogs.text"), "El usuario ingresó en la ruta " + req.url + "\n")

    next()
}

module.exports = userLogs;