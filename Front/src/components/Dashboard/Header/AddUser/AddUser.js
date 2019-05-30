import React, { Component } from 'react'
import DBService from '../../../../services/DBService'


class AddUser extends Component {
    constructor(params){
        super(params)
        this.state = {
            username: "",
            password: "",
            roles: ""
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    handleFormChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault()
        var user = {
            username: this.state.username,
            password: this.state.password,
            roles: this.state.roles
        }
        DBService.addUser(user).then(res => {
            if (res.message !== "OK")
                alert(res.message)
        })
        this.props.closeModalFun()
    }
    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem"}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Dodaj Użytkownika</h3>
                <div class="form-group">
                    <label for="name">Nazwa Użytkownika</label>       
                    <input type="text" class="form-control" id="username" placeholder="Wpisz nazwę użytkownika" onChange={this.handleFormChange} />
                </div>
                <div class="form-group">
                    <label for="name">Hasło</label>       
                    <input type="password" class="form-control" id="password" placeholder="Wpisz hasło" onChange={this.handleFormChange} />
                </div>
                <div class="form-group">
                    <label for="name">Role</label>       
                    <input type="text" class="form-control" id="roles" placeholder="Wpisz nazwę ról użytkownika" onChange={this.handleFormChange} />
                </div>
                <button type="submit" className="pokemons-button" style={{width: "100%", marginTop: "15px"}}>Dodaj</button>
            </form>
        )
    }
}

export default AddUser