import React from "react";

export default function Date(time){

    const date = new Date(time);

// Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
    var formattedDate = day + "-" + month + "-" + year;
    console.log(formattedDate);  // Prints: 04-05-2022
    
    return formattedDate;
    }