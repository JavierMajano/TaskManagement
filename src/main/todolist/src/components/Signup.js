import React from "react";
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
    }
});

class Signup extends React.Component{
    constructor(props) {
        super();
        this.state={
            token:'',
            isAuthenticated:false,
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",

        }
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    }
    render() {
        const Signup = (e) =>{
            e.preventDefault()
            const user = {
                userName: this.state.userName,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            };

            return axiosInstance.post("/api/signup", user)
                .then(response => {
                    if (response.data && response.data.token) {
                        localStorage.setItem("jwtToken", response.data.token);
                        localStorage.setItem("isAuthenticated", true);
                    }

                    console.log(response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error(error);
                });

        }
        return(
            <div className="container-fluid">
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign up
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={Signup}>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName
                                            </label>
                                        <input type="text" name="userName" id="user"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="username" required="" value={this.state.userName}
                                               onChange={this.handleInputChange}/>

                                    </div>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                            email</label>
                                        <input type="email" name="email" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="name@email.com" required="" value={this.state.email}
                                            onChange={this.handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            First Name</label>
                                        <input type="text" name="firstName" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="First Name" required=""  value={this.state.firstName}
                                            onChange={this.handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                        <input type="text" name="lastName" id="password" placeholder="Last Name"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""  value={this.state.lastName}
                                            onChange={this.handleInputChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password
                                            </label>
                                        <input type="password" name="password" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="••••••••" required=""  value={this.state.password}
                                            onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox"
                                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                       required=""/>
                                            </div>
                                        </div>

                                    </div>
                                    <button type="submit"
                                            className="rounded-full w-full text-white bg-blue-400 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign
                                        up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Signup;