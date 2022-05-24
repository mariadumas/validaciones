const {validationResult} = require("express-validator")



const MainController = {
    index: (req, res) => {
        res.render("index")
    },
    services: (req, res) =>{
        res.send("Llegaste a la página de services")
    },
    // admin: (req, res) => {
    //     let errores = validationResult(req)
    //     if (errores.isEmpty()) {
    //         // Acá va lo que ya hacía el controlador: en este ejemplo, crea el usuario en la base de datos y lo redirige
    //         let user = req.body
    //         userID = usersModel.create(user)
    //         res.redirect("/users" + userID)
    //     }
    //     else {
    //         // si errores no está vacío, vuelve al formulario para que se completen los datos incorrectos. Para darle indicación sobre cuál es el error, mandamos los errores a la vista. 

    //         res.render("/users/create/", {errores: errores.array()})
    //     }
    // }, 
    register: (req, res) => {
        res.render("register")
    },

    processRegister: (req, res) => {
        //validation result espera que le pase todo el request y con las reglas de validación que hice me va a decir qué campos tuvieron error
        let resultValidation = validationResult(req)

        if (resultValidation.errors.length >0) {
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body,
               
            }) 
        }

        res.send("Ok, las validaciones se pasaron y no tienes errores")
    },
    login: (req, res) => {
        res.render("login")
    }    
}



module.exports = MainController