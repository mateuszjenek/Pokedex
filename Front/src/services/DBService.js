import AuthService from "./AuthService";

const DBService = {
    _baseUrl: "https://www.mocky.io/v2/",
    _baseUrl2: "http://localhost:5002/",

    async addUser(user){
        const response = await fetch(this._baseUrl2 + "register", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: user.username,
                  password: user.password,
                  isProfessor: user.roles === "dr_oak_role" ? 1 : 0
                }
            })
        }).then(res => res.json())
        
        if (response === "User successfully added.") alert("Dodano użytkownika, proszę odświeżyć stronę")
        else alert(response)
    },


    async getPokemonList() {
        const response = await fetch(this._baseUrl2 + "pokemons", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                }
            })
        }).then(res => res.json())

        var result = []

        for(let i in response.pokemons){
            result.push({
                id: response.pokemons[i].ID,
                name: response.pokemons[i].name,
                type: response.pokemons[i].type
            })
        }
        console.log(response)
        return result
    },
    async removePokemon(id) {
        const response = await fetch(this._baseUrl2 + "deletepokemon", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                },
                pokemon_id: id
            })
        }).then(res => res.json())

        if(response === "Pokemon successfully deleted.") return;
        else alert(response)
    },
    async addPokemon(pokemon) {
        console.log(pokemon)
        const response = await fetch(this._baseUrl2 + "newpokemon", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                },
                pokemon_id: pokemon.id,
                pokemon_name: pokemon.name,
                pokemon_type: pokemon.type
            })
        }).then(res => res.json())

        if(response === "Pokemon successfully added.") return;
        else alert(response)
    },
    async updatePokemon(pokemon) {
        console.log(pokemon)
        this.removePokemon(pokemon.id)
        this.addPokemon(pokemon)
    },
    


    async getTypeList() {
        const response = await fetch(this._baseUrl2 + "types", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                }
            })
        }).then(res => res.json())

        var result = []

        for(let i in response.types){
            result.push({
                id: i,
                name: response.types[i].name
            })
        }
        return result
    },
    async addType(type) {
        const response = await fetch(this._baseUrl2 + "newtype", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                },
                type_name: type.name
            })
        }).then(res => res.json())

        if(response === "Type added successfully.") return;
        else alert(response)
    },
    async removeType(type) {
        const response = await fetch(this._baseUrl2 + "deletetype", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                },
                type_name: type.name
            })
        }).then(res => res.json())

        if(response === "Type successfully deleted.") return;
        else alert(response)
    },

    
    async getTrainerList() {
        const response = await fetch(this._baseUrl2 + "trainers", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                }
            })
        }).then(res => res.json())

        var result = []

        for(let i in response.trainers){
            result.push({
                id: i,
                name: response.trainers[i].username
            })
        }
        return result
    },
    async assignToTrainer(trainer, pokemon_id) {
        const response = await fetch(this._baseUrl2 + "partnership", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                },
                pokemon_id: pokemon_id
            })
        }).then(res => res.json())

        if(response === "Partnership added successfully.") return;
        else alert(response)
    },
    async getTrainerPokemons(trainer) {
        const response = await fetch(this._baseUrl2 + "trainerspokemon/"+trainer.name, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: {
                  username: AuthService.username,
                  password: AuthService.passHash,
                }
            })
        }).then(res => res.json())

        const pokemons = await this.getPokemonList()

        var result = []

        for(let i in response.partnerships){

            var pokemon = response.partnerships[i].pokemon_ID

            for(let pok in pokemons) {
                if(pokemons[pok].id === response.partnerships[i].pokemon_ID) {
                    pokemon = pokemons[pok].name
                    break
                }
            }
            result.push({
                id: i,
                name: pokemon
            })
        }
        return result
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