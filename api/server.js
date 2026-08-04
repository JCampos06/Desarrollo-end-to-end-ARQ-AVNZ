const express = require("express");
const cors = require("cors");

const productos = require("./routes/productos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productos);

app.get("/health", (req, res) => {

    res.json({
        status: "OK"
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Servidor iniciado");
    console.log("Puerto:", PORT);

});