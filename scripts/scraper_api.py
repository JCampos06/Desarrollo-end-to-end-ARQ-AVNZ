import json
import logging
import sys

from scraper import buscar_productos

logging.disable(logging.CRITICAL)


def main():

    if len(sys.argv) < 2:

        print(json.dumps({
            "success": False,
            "mensaje": "Debe enviar una búsqueda"
        }))

        return

    termino = sys.argv[1]

    try:

        productos = buscar_productos(termino)

        print(json.dumps({
            "success": True,
            "busqueda": termino,
            "cantidad": len(productos),
            "productos": productos
        }, ensure_ascii=False))

    except Exception as e:

        print(json.dumps({
            "success": False,
            "error": str(e)
        }))


if __name__ == "__main__":
    main()