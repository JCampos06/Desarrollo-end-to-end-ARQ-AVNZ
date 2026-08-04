const router = require("express").Router();

const controller = require("../controllers/productosController");

router.get("/", controller.buscar);

module.exports = router;