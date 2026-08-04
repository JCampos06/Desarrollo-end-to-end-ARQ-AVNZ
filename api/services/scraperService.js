const { spawn } = require("child_process");
const path = require("path");
require("dotenv").config();

exports.buscar = (busqueda) => {

    return new Promise((resolve, reject) => {

        const python = process.env.PYTHON_PATH;

        if (!python) {

            reject(new Error("No existe PYTHON_PATH"));

            return;

        }

        const script = path.resolve(
            __dirname,
            "../../scripts/scraper_api.py"
        );

        const proceso = spawn(python, [script, busqueda]);

        let stdout = "";
        let stderr = "";

        proceso.stdout.on("data", data => {

            stdout += data.toString();

        });

        proceso.stderr.on("data", data => {

            stderr += data.toString();

        });

        proceso.on("close", code => {

            if (code !== 0) {

                reject(new Error(stderr));

                return;

            }

            try {

                resolve(JSON.parse(stdout));

            }

            catch {

                reject(new Error(stdout));

            }

        });

    });

};