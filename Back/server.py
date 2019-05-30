from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask_jsonpify import jsonify
from sqlalchemy.exc import OperationalError

app = Flask(__name__)
api = Api(app)

super_db_connect = create_engine('mssql+pymssql://SA:3SQ[4Je]5Gl@mssql:1433/PokeDB')
CONNECTION_WARNING = "Cannot connect to database with given credentials."


def db_connection():
    # Pobranie danych użytkownika z żądania HTTP
    user = request.get_json()["user"]
    connection_settings = F'mssql+pymssql://{user["username"]}:{user["password"]}@mssql:1433/PokeDB'

    # Utworzenie połączenia z bazą danych
    db_connect = create_engine(connection_settings)
    return db_connect.connect()


@app.route('/login', methods=['POST'])
def login():
    # Login użytkownika jest również kluczem głównym w tabeli trainers
    username = request.get_json()["user"]['username']

    # Weryfikacja użytkownika
    try:
        conn = db_connection()
    except OperationalError as e:
        return jsonify(str(e))

    query = conn.execute(
        f"select * from trainers where username = '{username}'")

    result = {'result': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
    if not result['result']:
        return jsonify("Trainer isn't inside DB.")
    else:
        return jsonify(result)


@app.route('/register', methods=['POST'])
def register():
    try:
        user = request.get_json()["user"]
        is_professor = request.get_json()["isProfessor"]
        if is_professor is True:
            is_professor = 1
        else:
            is_professor = 0
    except KeyError:
        # Możliwe, że przesyłanie danych z formularza nie będzie w formularzu (request.form), a nie w JSON-ie
        return jsonify("Invalid registration form.")

    # Zalogowanie się na Super Admina, aby mieć super uprawnienia
    conn = super_db_connect.connect()
    query = conn.execute(f"select * from trainers where username = '{user['username']}'")

    result = {'result': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
    if not result['result']:

        try:
            # Nazwa użytkownika jest dostępna.
            conn.execute(f"USE PokeDB;"
                         f"CREATE USER {user['username']} WITH PASSWORD = '{user['password']}'; "
                         f"ALTER ROLE Trainer ADD MEMBER {user['username']}; ")

            if is_professor == 1:
                conn.execute(f"ALTER ROLE Professor ADD MEMBER {user['username']}; ")

            conn.execute(
                f"INSERT INTO trainers (username, isProfessor) VALUES ('{user['username']}', {is_professor});")
            return jsonify("User successfully added.")

        except OperationalError as e:
            return jsonify(str(e))

    else:
        # Nazwa użytkownika jest już zajęta.
        return jsonify("Username already taken.")


@app.route('/trainers', methods=['GET'])
def trainers():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        query = conn.execute("select * from trainers")  # This line performs query and returns json result
        result = {'trainers': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)
    except Exception as e:
        return jsonify(str(e))


@app.route('/trainerspokemon/<string:trainer_id>', methods=['GET'])
def trainerspokemon(trainer_id):
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        query = conn.execute(f"select * from trainerspokemon where trainer_ID = '{trainer_id}' ")
        result = {'partnerships': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)
    except Exception as e:
        return jsonify(str(e))


@app.route('/pokemons', methods=['GET'])
def pokemons():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        query = conn.execute("select * from pokemons")  # This line performs query and returns json result
        result = {'pokemons': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)
    except Exception as e:
        return jsonify(str(e))


@app.route('/pokemon/<int:id>', methods=['GET'])
def pokemon(id):
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        query = conn.execute("select * from pokemons where ID =%d " % int(id))
        result = {'data': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)
    except Exception as e:
        return jsonify(str(e))


@app.route('/newpokemon', methods=['POST'])
def newpokemon():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        pokemon_name = request.get_json()["pokemon_name"]
        pokemon_type = request.get_json()["pokemon_type"]
        pokemon_id = request.get_json()["pokemon_id"]
        conn.execute(
            f"INSERT INTO pokemons(ID, name, type) VALUES ({pokemon_id}, '{pokemon_name}', '{pokemon_type}')")
        return jsonify("Pokemon successfully added.")
    except Exception as e:
        return jsonify(str(e))


@app.route('/deletepokemon', methods=['POST'])
def deletepokemon():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        pokemon_id = request.get_json()["pokemon_id"]
        conn.execute(
            f"DELETE FROM pokemons WHERE ID ={pokemon_id}")
        return jsonify("Pokemon successfully deleted.")
    except Exception as e:
        return jsonify(str(e))


@app.route('/types', methods=['GET'])
def types():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        query = conn.execute("select * from types")  # This line performs query and returns json result
        result = {'types': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)

    except Exception as e:
        return jsonify(str(e))


@app.route('/newtype', methods=['POST'])
def newtype():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        type_name = request.get_json()["type_name"]

        conn.execute(
            f"INSERT INTO types(name) VALUES ('{type_name}')")
        return jsonify("Type added successfully.")
    except Exception as e:
        return jsonify(str(e))


@app.route('/deletetype', methods=['POST'])
def deletetype():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        type_name = request.get_json()["type_name"]
        conn.execute(
            f"DELETE FROM types WHERE name ='{type_name}'")
        return jsonify("Type successfully deleted.")
    except Exception as e:
        return jsonify(str(e))


@app.route('/partnership', methods=['POST'])
def partnership():
    # Weryfikacja użytkownika
    try:
        conn = db_connection()
        pokemon_id = request.get_json()["pokemon_id"]
        trainer_id = request.get_json()["user"]["username"]

        conn.execute(
            f"INSERT INTO partnership(pokemon_ID, trainer_ID, catch_date)"
            f" VALUES ({pokemon_id}, '{trainer_id}', GETDATE())")
        return jsonify("Partnership added successfully.")
    except Exception as e:
        return jsonify(str(e))


@app.route('/init', methods=['POST'])
def init():
    omega_db_connect = create_engine('mssql+pymssql://SA:3SQ[4Je]5Gl@localhost:1433')
    try:
        with open('init.sql', 'r') as f:
            sql_script = f.read()
            omega_db_connect.execute(sql_script)

        return jsonify("Initialization complete.")
    except Exception as e:
        return jsonify(str(e))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port='5002')
