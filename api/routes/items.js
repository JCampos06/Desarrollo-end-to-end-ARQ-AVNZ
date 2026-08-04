const express = require("express");

const router = express.Router();

const controller = require("../controllers/itemsController");

router.post("/", controller.insertarItems);

router.get("/", controller.obtenerItems);

module.exports = router;