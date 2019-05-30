import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Header.css'
import pokeball from '../../../assets/pokeball.png'
import AuthService from '../../../services/AuthService'
import Popup from 'reactjs-popup'
import AddUser from './AddUser'



export default class Header extends Component {
    
    constructor(props) {
        super(props)
        this.state = { redirectRequest: false }
        this.signout = this.signout.bind(this)
    }
    
    signout = function() {
        AuthService.signout(() =>
            this.setState({ redirectRequest: true })
        )    
    }
    
    addUserButton = () => {
        return(
            AuthService.role === "dr_oak_role" ? (
            <Popup trigger={<button className="header-button header-button-adduser"><i className="fas fa-user-plus"></i><span className="d-none d-md-inline" style={{marginLeft: "10px"}}>Dodaj uzytkownika</span></button>} modal closeOnDocumentClick>
                { close => <AddUser closeModalFun={close} /> }
            </Popup>
            ) : null
        )
    }

    render() {
        if (this.state.redirectRequest || !AuthService.isAuthenticated) {
            return( <Redirect to='/login' />)
        }
        return(
            <div className="shadow" style={{backgroundColor: '#e74c3c', height: '3.8rem', marginBottom: '3rem'}}>
                <img src={pokeball} alt="pokeball" className="pokeball" style={{height: "5rem", marginLeft: "auto", marginRight: "auto", display: "block", transform: "translateY(1.2rem)"}}/>
                <div className="header-button-container" style={{right: "1rem"}}>
                    <this.addUserButton />
                    <button onClick={this.signout} className="header-button header-button-signout"><i className="fas fa-sign-out-alt"></i><span className="d-none d-md-inline" style={{marginLeft: "10px"}}>Wyloguj</span></button>
                </div>                
            </div>
        )
    }
}