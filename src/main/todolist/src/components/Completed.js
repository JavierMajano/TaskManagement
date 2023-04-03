import React  from "react";
import axios, {all} from "axios";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        Authorization : `Bearer ${localStorage.getItem("jwtToken")}`
    }
});



class Completed extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            completedTask : []
        }

    }

    componentDidMount() {
        axiosInstance.get("/api/AllTask",{
        })
            .then(res => {
                console.log(res.data)
                this.setState({completedTask:res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
let resetComplete = (e) =>{
    axiosInstance.delete("/api/resetCompleted")
        .then(res => {
            this.setState({completedTask:[]})
        console.log(res.data)
    })
        .catch(error => {
            console.log(error)
        })
}
        return(
            <div className="relative overflow-x-auto bg-teal-200 h-screen w-full">
                <div className="text-center text-black mt-20" ><h2 className="text-3xl font-bold">Completed Task</h2></div>
                <div className="text-center text-black mt-20" ><button onClick={()=>(resetComplete())} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-400 bg-red-400 hover:text-white">Reset</button></div>
                <div className="rounded-xl ">
                    <table className="w-5/6 text-sm text-center text-white dark:text-gray-400 mx-auto pt-6 mt-20 table-auto">
                        <thead className="text-xs text-white uppercase  bg-violet-400">
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
                                Task Completed
                            </th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.state.completedTask.map((task,index) => (
                            <tr className=" border-b text-white dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                <td className="px-6 py-4">{task.id}</td>
                                <td className="px-6 py-4">{task.name}</td>
                                <td className="px-6 py-4">{ new Date(task.date).toDateString()}</td>
                                <td className="px-6 py-4">{ new Date(task.completed).toDateString()}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
export default Completed;
