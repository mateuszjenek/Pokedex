import React, { Component } from 'react';
import AuthService from '../../services/AuthService'
import { Redirect } from 'react-router-dom'
import logo_pokedex from '../../assets/logo_pokedex.png'
import background_video from '../../assets/login_background.mp4'
import './Login.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            redirectRequest: false,
        }
        
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = function(event){
        event.preventDefault();
        AuthService.authenticate(() => {
            this.setState({ redirectRequest: true });
        })
    }

    handleUsernameChange = function(event){
        this.setState({ username: event.target.value })
    }

    handlePasswordChange = function(event){
        this.setState({ password: event.target.value })
    }

    componentDidMount() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden"
    }

    render() {
        if (this.state.redirectRequest || AuthService.isAuthenticated) return( <Redirect to='/' />)
        else return (
            <div className="h-100 row align-items-center"> 
            <video className="d-none d-md-block" muted autoPlay loop id="login-background-video" style={{height: "100%", overflow: "hidden"}}>
                <source src={background_video} type="video/mp4"/>
            </video>
            <div style={{width: "110vw", height: "100%", position: "absolute", background: "black", opacity: ".4", left: "0", top: "0"}}/>
            <div className="d-md-none" style={{width: "110vw", height: "100vh", position: "absolute", background: "#f5f6fa", left: "0", top: "0"}}/>

                <div className="col col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2 p-5" style={{backgroundColor: "#f5f6fa", borderRadius: "10px"}}>
                    <form className="form text-center" onSubmit={this.handleSubmit}>
                        <img src={logo_pokedex} alt="Pokedex Logo" style={{width: "100%"}} className="mb-5"/>
                        <input className="form-control my-2" type="text" id="InputUsername" placeholder="Nazwa użytkownika" onChange={this.handleUsernameChange}/>
                        <input className="form-control my-2" type="password" id="InputPassword" placeholder="Hasło" onChange={this.handlePasswordChange}/>
                        <button className="mt-3 login-submit-btn" type="submit">Zaloguj się</button>
                    </form>
                </div>
            </div>
        );
    }
}
