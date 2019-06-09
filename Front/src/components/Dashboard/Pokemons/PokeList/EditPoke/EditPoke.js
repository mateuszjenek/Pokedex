import React, { Component } from 'react'

class EditPoke extends Component {
    constructor(params) {
        super(params)
        this.state = {
            id: params.pokemon.id,
            name: params.pokemon.name,
            type: params.pokemon.type,
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.removePokemon = this.removePokemon.bind(this)
    }

    handleFormChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault()
        var pokemon = {
            name: this.state.name,
            type: this.state.type,
            id: parseInt(this.state.id, 10)
        }
        this.props.editPokeFun(pokemon)
        this.props.closeModalFun()
    }

    removePokemon() {
        this.props.removePokeFun(this.state.id)
        this.props.closeModalFun()
    }

    

    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem", color: 'black'}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Edycja Pokemona</h3>
                <div className="form-group">     

                    <div class="form-group">
                    <label for="name">Nazwa Pokemona</label>       
                    <input type="text" className="form-control" id="name" value={this.state.name} placeholder="Wpisz nazwę pokemona" onChange={this.handleFormChange} />
                </div>
                <div class="form-group">
                    <label for="name">Nazwa Typu</label>       
                    <input type="text" className="form-control" id="type" value={this.state.type} placeholder="Wpisz nazwę typu" onChange={this.handleFormChange} />
                </div>
                <div class="form-group">
                    <label for="name">PokeID</label>       
                    <input type="text" className="form-control" id="id" value={this.state.id} placeholder="Wpisz PokeID" onChange={this.handleFormChange} />
                </div>
                    
                    
                    
                </div>
                
                <button type="submit" className="pokemons-button" style={{width: "100%", marginTop: "15px"}}>Edytuj</button>
                <button type="button" onClick={this.removePokemon} className="pokemons-button pokemons-button-delete" style={{width: "100%", marginTop: "5px"}}>Usuń</button>
            </form>
        )
    }
}

export default EditPoke