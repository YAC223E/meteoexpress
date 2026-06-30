from flask import Flask, request

from backend.auth.models import init_db
from backend.auth.session import read_session
from backend.config import AUTH_SECRET_KEY

SESSION_COOKIE = "meteoexpress_session"


def create_app():
    init_db()

    app = Flask(
        __name__,
        template_folder='templates',
        static_folder='static'
    )
    app.secret_key = AUTH_SECRET_KEY

    from backend.routes.weather import weather_bp
    app.register_blueprint(weather_bp)

    from backend.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    @app.context_processor
    def inject_user():
        token = request.cookies.get(SESSION_COOKIE)
        user = read_session(token)
        return dict(user=user)

    return app


if __name__ == "__main__":
    create_app().run(debug=True, host="0.0.0.0", port=5000)
