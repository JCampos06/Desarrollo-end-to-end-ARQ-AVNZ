const express = require("express");
const cors = require("cors");

const items = require("./routes/items");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", items);

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