const supabase = require("../services/supabaseService");

exports.insertarItems = async (req, res) => {

    try {

        const items = req.body;

        if (!Array.isArray(items)) {

            return res.status(400).json({

                success: false,
                mensaje: "El body debe ser un arreglo."

            });

        }

        const { error } = await supabase
            .from("scraped_items")
            .insert(items);

        if (error) {

            return res.status(500).json({

                success: false,
                error: error.message

            });

        }

        res.json({

            success: true,
            insertados: items.length

        });

    }

    catch (e) {

        res.status(500).json({

            success: false,
            error: e.message

        });

    }

};



exports.obtenerItems = async (req, res) => {

    try {

        const { data, error } = await supabase

            .from("scraped_items")

            .select("*")

            .order("created_at", { ascending: false });

        if (error) {

            return res.status(500).json({

                success: false,
                error: error.message

            });

        }

        res.json({

            success: true,

            cantidad: data.length,

            items: data

        });

    }

    catch (e) {

        res.status(500).json({

            success: false,
            error: e.message

        });

    }

};