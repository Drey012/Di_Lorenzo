import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
ENV_FILE = ROOT / ".env"
MAP_CONFIG_KEYS = ("GOOGLE_API_KEY", "GOOGLE_PLACE_ID")


def load_map_config():
    config = {key: os.environ.get(key, "") for key in MAP_CONFIG_KEYS}

    if ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            name, separator, value = line.partition("=")
            name = name.strip()
            if separator and name in MAP_CONFIG_KEYS and not config[name]:
                config[name] = value.strip().strip("\"'")

    return config


class SiteHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)

        if path == "/api/maps-config":
            config = load_map_config()
            if not all(config.values()):
                self.send_error(503, "Google Maps configuration is incomplete.")
                return

            body = json.dumps(
                {
                    "apiKey": config["GOOGLE_API_KEY"],
                    "placeId": config["GOOGLE_PLACE_ID"],
                }
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return

        if any(part.startswith(".") for part in path.split("/") if part):
            self.send_error(404)
            return

        super().do_GET()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), SiteHandler)
    print("Serving at http://localhost:4173")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()
