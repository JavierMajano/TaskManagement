import React from "react";
import {Route, Routes, Link, NavLink, BrowserRouter} from "react-router-dom"
import Todo from "./todo";
import Completed from "./Completed";
import TaskManage from "./TaskManage";
import SMSReminder from "./SMSReminder";
import Login from "./login";
import Signup from "./Signup";


export default function Header(){

    return(
<div>
    <BrowserRouter>
<nav className="p-3 border-gray-200  bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div className="container flex flex-wrap  items-center justify-between mx-auto">

      <div className="flex md:order-2">
         <NavLink to="/Login"> <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button></NavLink>
    <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
      </div>
    <div className="items-center hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
          <li>
              <NavLink to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</NavLink>
          </li>
        <li>
          <NavLink to="/ManageTask" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Task Manager</NavLink>
        </li>
          <li>
              <NavLink to="/CompletedTask" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Completed Task</NavLink>
          </li>
        <li>
          <NavLink to="https://javiermajano.github.io/website/" target={"_blank"} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About me</NavLink>
        </li>
          <li>
              <NavLink to="/ReminderSMS" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">SMS Reminder</NavLink>
          </li>
      </ul>
    </div>
  </div>
</nav>

    <Routes>
        <Route path="/" element={<Todo/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/ManageTask" element={<TaskManage/>}/>
        <Route path="/CompletedTask" element={<Completed/>}/>
        <Route path="/ReminderSMS" element={<SMSReminder/>}/>
        <Route path="/Signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
</div>

    );
    }