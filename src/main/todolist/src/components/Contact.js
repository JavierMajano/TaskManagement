import React from 'react'
import '../index.css'

function Contact(){
    return(
        <form className='form'>
            <h1>Contact Form</h1>
            <label>Name</label>
            <input placeholder='Name'/>
            <label>Email</label>
            <input placeholder='email'/>
            <label>Message</label>
            <textarea></textarea>
            
            <button type='submit'>Submit</button>
            
        </form>
    );
}


export default Contact;