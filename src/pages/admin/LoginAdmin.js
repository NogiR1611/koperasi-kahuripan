import React,{useState} from 'react';
import axios from 'axios';

const LoginAdmin = (props) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    
    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            username : username,
            password : password
        };
        axios.post('http://localhost:8000/api/admin/login',data)
        .then( res => {
            if(res.status === 200){
                let user = {
                    username : username,
                    isLoggedIn : true
                };
                localStorage.setItem('TOKEN_KEY',res.data.access_token);
                localStorage['UserData'] = JSON.stringify(user);
                props.history.push('/admin/dashboard');
                setIsLoggedIn(!isLoggedIn);
            }
        })
        .catch( err => console.log(err));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div>
                <img class="mx-auto w-3/7" src={require('./../../assets/admin/img/logo-koperasi.png').default} alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login
                </h2>
                <span class="text-lg text-gray-400 mx-auto font-bold">Silahkan Masukan Username dan Password Anda</span>
                </div>
                <form class="mt-8 space-y-6" onSubmit={onSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                    <label for="email-address" class="sr-only">Username : </label>
                    <input
                        id="email-address"
                        name="email"
                        type="text"
                        onChange={ (e) => setUsername(e.target.value) }
                        autocomplete="email"
                        required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                    />
                    </div>
                    <div>
                    <label for="password" class="sr-only">Password : </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={ (e) => setPassword(e.target.value) }
                        autocomplete="current-password"
                        required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                    </div>
                </div>
                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    Login
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;