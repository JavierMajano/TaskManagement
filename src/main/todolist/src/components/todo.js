import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {redirect, useNavigate} from "react-router-dom";
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
});
function List(props){
    return(
        <div>
            
        <div className="flex mb-4 items-center">
            <p key = {props.key} className="w-full text-grey-darkest">{props.item} </p>
            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
        </div>
         
    </div>
    )
}
let realList = [];
class todo extends Component{
    constructor(props){
        const current = new Date().toDateString();
        const date = current;
        super(props);
        this.state ={
         toDoitems:  [],
         currentItem:'',
         date:date,
            message: ''
        }
      
    }
    
componentDidMount(){
    const token = `${localStorage.getItem("jwtToken")}`;
    const isAuthenticated = false;
    console.log(token)
    // Set the Authorization header with the token for each request
    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


}
    render(){


        // Save items while changing
     
        let handleChange = (e) => {
            let item = e.target.value
        
            this.setState({
                currentItem:item
            })
      
          }
          let addItem = (e) => {
            console.log(e)
            let name = this.state.currentItem;
            let date = new Date();
            e.preventDefault();

            axiosInstance.post("/api/tasks",{
                name,date
            })
                .then(res => {
                    console.log(res.data)

                 })
                .catch(error => {
                    console.log(error)
                })

             this.setState({
                toDoitems:[...this.state.toDoitems,this.state.currentItem],
                currentItem:''
            })
        realList.push(this.state.currentItem);
            window.localStorage.setItem('items',JSON.stringify(realList) )
          console.log(realList);
          console.log(this.state.toDoitems)
         
        

          }
          let UpdateElement = (todo,id,index) =>{
            alert("type in inpu")
            console.log(index)
              console.log(todo)
              axiosInstance.delete("/api/deleteTask/" + id)
                  .then(response =>{
                      console.log(response.data)
                      this.setState({
                          toDoitems:this.state.toDoitems.filter((_, i) => i !== index),

                  })
                      realList = this.state.toDoitems.filter((_,i)=> i !== index)
                      console.log(realList);
                      window.localStorage.setItem('items',JSON.stringify(realList) )

            }).catch(err =>{
                console.error(err);
              })

          }
    return(
        <div className="h-screen w-full flex items-center justify-center bg-teal-100 font-sans" >
       
	<div className="bg-white rounded  p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
    <form onSubmit={addItem}>
        <div className="mb-4">
            <h1 className="text-3xl font-bold ">
            Task Manager
    </h1>
            <div className="flex mt-4">
              
                <input id="mainInput" name="add" value={this.state.currentItem} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" onChange={handleChange} required/>
                <button  className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-400 hover:text-white hover:bg-teal-400" >Add</button>
                
            </div>
        </div>
        </form>
        {this.state.toDoitems.map((todo,index) => (
            
        <div className="flex mb-4 items-center ">
            <p key = {todo.id} className="w-full text-grey-darkest border rounded w-full py-2 px-3 mr-2" >{todo}</p>
            <button onClick={() => UpdateElement(todo,todo.id,index)} className="flex-no-shrink p-2 border-2 rounded-full text-teal border-yellow-400 hover:text-white hover:bg-yellow-400">Update</button>
            
        </div>

        ))}

    </div>
   
   
</div>
    );
   } 
}

export default todo;