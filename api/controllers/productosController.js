const scraper = require("../services/scraperService");

exports.buscar = async (req, res) => {

    try {

        const termino = req.query.busqueda;

        if (!termino) {

            return res.status(400).json({
                success: false,
                mensaje: "Debe enviar ?busqueda="
            });

        }

        const resultado = await scraper.buscar(termino);

        res.json(resultado);

    }

    catch (e) {

        res.status(500).json({

            success: false,
            error: e.message

        });

    }

};