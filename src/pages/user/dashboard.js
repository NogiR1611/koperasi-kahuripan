import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Dashboard = (props) => {
    const [username,setUsername] = useState("");
    const [redirect,setRedirect] = useState(true);
    const [isLoggedIn,setIsLoggedIn] = useState(true);
    
    useEffect(() => {
        let userData = localStorage['UserData'];
        let parseData = JSON.parse(userData);
        
        setUsername(parseData.username);
    },[]);

    const logout = () => {
        let userData = {
            username : '',
            isLoggedIn : false
        }

        localStorage["UserData"] = JSON.stringify(userData);
        localStorage.removeItem("TOKEN_KEY");
        setUsername('');
        setRedirect(false);
        setIsLoggedIn(!isLoggedIn);
    }

    const testing = () => {
        props.history.push('/test');
    }

    if(!redirect){
        return ( <Redirect to='/login' /> );
    }

    return (
        <div>
            <h1>Welcome to dashboard {username}</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={testing}>testing</button>
        </div>
    );
}

/*
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : true,
            isLoggedIn : true,
            username : ""
        };
    }
    
    componentDidMount(){
        let userData = localStorage["UserData"];
        let parseData = JSON.parse(userData);
        this.setState({
            username : parseData.username
        });
    }

    logout = () => {
        let userData = {
            username : '',
            isLoggedIn : false
        }

        localStorage["UserData"] = JSON.stringify(userData);
        localStorage.removeItem("TOKEN_KEY");
        this.setState({
            redirect : false,
            isLoggedIn : false,
            username : ""
        });
    }

    render(){
        const {redirect,username} = this.state;
        if(!redirect){
            return ( <Redirect to='/login' /> );
        }
        return (
            <div>
                <h1>Welcome to dashboard {username}</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}
*/

export default Dashboard;