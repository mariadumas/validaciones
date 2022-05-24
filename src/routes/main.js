const router = require("express").Router();

const {body} = require("express-validator")

const MainController = require("../controllers/MainController");
// const adminMiddleware = require("../middlewares/adminMiddleware")

//Creamos un array con las distintas validaciones que queremos implementar y luego lo pasamos por la ruta; usamos la función body que es igual a check.
const validaciones = [
    body("nombre").notEmpty().withMessage("Debes completar el campo de nombre"),
    body("email")
    .notEmpty().withMessage("Debes completar el campo").bail()
    .isEmail().withMessage("Debes incluir un email válido"),
    body("pass").notEmpty().withMessage("Debes completar el campo de contraseña"),
    body("image").custom((value, {req})=> {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".jpeg", ".gif"]
        
       
        if (!file){
            throw new Error ("Debes subir una imagen")
        } else {
            let fileExtension = path.extname(file.originalname);
             //includes devuelve un booleano
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error ("Las extensiones de archivo permitidas son " + acceptedExtensions.join(", ")) 

        }
       
        } 

        return true
    })
]

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
      cb(null, path.join(__dirname, "../../public/images"));
    },
    filename:  (req, file, cb) =>{
      let imageName=Date.now()+path.extname(file.originalname); 
      cb(null,imageName);
    }
  });
  
const upload = multer({storage})



router.get("/", MainController.index)
router.get("/services", MainController.services)
// router.get("/admin", adminMiddleware, MainController.admin)
router.get("/register", MainController.register)
router.post("/register", upload.single("image"), validaciones, MainController.processRegister)
router.get("/login", MainController.login)
// router.post("/login", MainController.processLogin)




module.exports = router;