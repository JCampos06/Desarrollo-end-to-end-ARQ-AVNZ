const router = require("express").Router();

const controller = require("../controllers/productosController");

router.get("/", controller.buscar);
router.get("/todos", controller.buscarTodos);

module.exports = router;