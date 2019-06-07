import AuthService from "./AuthService";

const DBService = {
    _baseUrl: "https://www.mocky.io/v2/",
    _baseUrl2: "http://localhost:5002/",

    addUser(user){
        //fake
        return fetch(this._baseUrl + "5ccc69cf330000ae5ae01ca7?mocky-delay=1000ms").then(res => res.json())
    },


    getPokemonList() {
        //fake
        return fetch(this._baseUrl + "5cc6ec9b3200006700b94f93?mocky-delay=1000ms").then(res => res.json())
    },
    removePokemon(id) {
        //fake
        return fetch(this._baseUrl + "5cc755773200001b3eb951db?mocky-delay=1000ms").then(res => res.json())
    },
    updatePokemon(pokemon) {
        //fake
        return fetch(this._baseUrl + "5ccc697b3300006e5be01ca6?mocky-delay=1000ms").then(res => res.json())
    },
    addPokemon(pokemon) {
        //fake
        return fetch(this._baseUrl + "5ccc69cf330000ae5ae01ca7?mocky-delay=1000ms").then(res => res.json())
    },


    getTypeList() {
        //fake
        return fetch(this._baseUrl + "5cc6ec9b3200006700b94f93?mocky-delay=1000ms").then(res => res.json())
    },
    addType(type) {
        //fake
        return fetch(this._baseUrl + "5ccc69cf330000ae5ae01ca7?mocky-delay=1000ms").then(res => res.json())
    },
    removeType(id) {
        //fake
        return fetch(this._baseUrl + "5cc755773200001b3eb951db?mocky-delay=1000ms").then(res => res.json())
    },

    
    async getTrainerList() {
        const response = await fetch(this._baseUrl2 + "trainers", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: {
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                }
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
        })

        console.log(response)

        return [{id: 1, name: "XD"}]
    },
    removeTrainer(id) {
        //fake
        return fetch(this._baseUrl + "5cc755773200001b3eb951db?mocky-delay=1000ms").then(res => res.json())
    },
    updateTrainer(pokemon) {
        //fake
        return fetch(this._baseUrl + "5ccc697b3300006e5be01ca6?mocky-delay=1000ms").then(res => res.json())
    },
    addTrainer(pokemon) {
        //fake
        return fetch(this._baseUrl + "5ccc69cf330000ae5ae01ca7?mocky-delay=1000ms").then(res => res.json())
    },
}

export default DBService