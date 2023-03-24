import React  from "react";
import axios, {all} from "axios";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        Authorization : `Bearer ${localStorage.getItem("jwtToken")}`
    }

});


class TaskManage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            allTask : [],
            completedTask : []
        }

    }

    componentDidMount() {
        axiosInstance.get("/api/ManageTask",{
        })
            .then(res => {
                console.log(res.data)
                this.setState({allTask:res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {

        let completeTasks = (id,index) =>{
            let date = new Date();
            var year = date.toLocaleString("default", { year: "numeric" });
            var month = date.toLocaleString("default", { month: "2-digit" });
            var day = date.toLocaleString("default", { day: "2-digit" });
// Generate yyyy-mm-dd date string
            var completed = day + "-" + month + "-" + year;
            const updateTask = {
                id: id,
                completed: date,
            };
            console.log(updateTask)
            axiosInstance.put(`/api/updatetask/${id}` ,updateTask)
                .then(res =>{
                    console.log(res.data)
                    this.setState({
                        allTask:this.state.allTask.filter((_, i) => i !== index)})
                }).catch(err =>{
                console.error(err);
            })
        }
        let  removeElement = (name,id,index)=> {
            console.log(name);
            console.log(index)
            console.log(id);
            axiosInstance.delete("/api/deleteTask/" + id)
                .then(res =>{
                    console.log(res.data)
                    this.setState({
                        allTask:this.state.allTask.filter((_, i) => i !== index)})
                }).catch(err =>{
                console.error(err);
            })
        }

        return(
            <div className="relative overflow-x-auto bg-sky-300 h-screen w-full">
                <div className="text-center text-white mt-20" ><h2 className="text-3xl font-bold">Task to be Completed</h2></div>
                <div className="rounded-xl ">
                <table className="w-5/6 text-sm text-center text-white dark:text-gray-400 mx-auto pt-6 mt-20 table-auto">
                    <thead className="text-xs text-white uppercase bg-sky-800 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Task Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Task Created
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Complete
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remove
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.allTask.map((task,index) => (
                        <tr className=" border-b text-white dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                            <td className="px-6 py-4">{task.id}</td>
                            <td className="px-6 py-4">{task.name}</td>
                            <td className="px-6 py-4">{ new Date(task.date).toDateString()}</td>
                            <td><button onClick={() => completeTasks(task.id,index)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-teal-400 hover:bg-teal-400">Done</button></td>
                            <td><button onClick={() => removeElement(task.name,task.id,index)}  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-400 hover:text-white hover:bg-red-400">Remove</button></td>

                        </tr>
                    ))}

                    </tbody>
                </table>
                </div>

            </div>
        );
    }

}
export default TaskManage;
