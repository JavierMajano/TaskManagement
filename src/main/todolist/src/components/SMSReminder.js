import React from "react";




export default function SMSReminder(){
    return(<div className="relative px-6  border-gray-200  bg-[#ACC8E5] h-screen w-full ">

        <div className="pt-3  text-center text-white">
            <div className="max-w-[700px] mx-auto px-3 lg:px-6">
                <h2 className="text-3xl font-bold mb-12 text-[#112A46]">Send A SMS Reminder?</h2>
                <form>
                    <div className="form-group mb-6">
                        <input type="number" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                               placeholder="Phone Number:+11234567890"  min='0' required/>
                    </div>
                    <button type="submit" className="px-6 py-2.5
          bg-blue-600
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out">Send
                    </button>
                </form>
            </div>
        </div>

    </div>);
}