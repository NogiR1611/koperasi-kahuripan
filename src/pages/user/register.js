import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            confirm_password : '',
            redirect : false
        }
    }

    componentDidMount(){
        this.onSubmit();
    }

    onSubmit = () => { 
        const {username,password,confirm_password} = this.state;
        const data = {
            username : username,
            password : password
        };

        if(password !== confirm_password){
            alert("harap samakan");
        }
        else{
            axios.post('http://localhost:8000/register',data)
            .then(res => {
                console.log(res);
                this.setState({ redirect : true });
            })
            .catch(err => console.log(err));
        }
    }

    render(){
        const {username,password,confirm_password,redirect} = this.state;
        if(redirect){
            return (
                <Redirect to='/login' />
            );
        }        

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>username : </label>
                    <input
                        type="text"
                        value={username}
                        onChange={ e => this.setState({ username : e.target.value })}
                    />
                    <label>password : </label>
                    <input
                        type="password"
                        value={password}
                        onChange={ e => this.setState({ password : e.target.value })}
                    />
                    <label>confirm password : </label>
                    <input
                        type="password"
                        value={confirm_password}
                        onChange={ e => this.setState({ confirm_password : e.target.value })}
                    />
                    <button type="submit">Daftar</button>
                </form>
            </div>
        );
    }
}

export default Register;