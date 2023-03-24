import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers:{
        Authorization : `Bearer ${localStorage.getItem("jwtToken")}`
    }
});


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errorMessage: '',
            isAuthenticated: false,
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ token, isAuthenticated: true });

        }
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });}
    render() {
        const Login = (e) => {
            e.preventDefault();

            const user = {
                userName: this.state.userName,
                password: this.state.password
            }

            axiosInstance.post('/api/login', user)
                .then((response) => {
                   console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({errorMessage: error.data});
                })
        }
        return(
            <div className="container-fluid">
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#" onSubmit={Login}>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="text" name="userName" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="name@email.com" required="" value={this.state.username} onChange={this.handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""  value={this.state.password} onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox"
                                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                       required=""/>
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember
                                                    me</label>
                                            </div>
                                        </div>
                                        <a href="#"
                                           className="text-sm font-medium text-white hover:underline dark:text-primary-500">Forgot
                                            password?</a>
                                    </div>
                                    <button type="submit"
                                            className="rounded-full w-full text-white bg-blue-400 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign
                                        in
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <a href="/signup"
                                                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                        up</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login;