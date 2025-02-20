import React, { useState } from 'react'


function SignUp() {
    const [idd,setidd] =useState("Signupp");
     
  return (
    <div className=' flex justify-center items-center  text-xl h-screen bg-slate-300'>
        
        <div className=' h-300 w-200 rounded-xl bg-white p-5'>
            <div className=' m-4  text-3xl   text-center'>
            Login Form
             </div>
             <div className=' flex  justify-between'>
                <div  onClick={()=>{setidd("Login")}} className='  text-center  w-1/2 hover:bg-white hover:text-black  from-blue-900 to-blue-500 bg-gradient-to-r text-white p-3 rounded-xl font-thin  mr-2'>
                    Login
                </div>
                <div onClick={()=>{setidd("Signup")}}   className='  text-center  w-1/2   hover:text-black from-blue-900 to-blue-500 bg-gradient-to-r text-white p-3 rounded-xl font-thin  hover:bg-white'> 
                    Signup
                </div>
                
             </div>
                <div>
                    <input className=' mt-4 p-2  font-thin border-gray border  rounded-lg' placeholder='Email Address'></input>
                </div>
                <div>
                    <input className=' mt-4 p-2  font-thin border-gray border  rounded-lg' placeholder='Password'></input>
                </div>
                <div>
                    <input className=' mt-4 p-2  font-thin border-gray border  rounded-lg' placeholder='Confirm Password'></input>
                </div>
                <div className='  text-center  w-full mt-5  hover:text-black from-blue-900 to-blue-500 bg-gradient-to-r text-white p-3 rounded-xl font-thin  hover:bg-white'> 
                  {idd}
                </div>
        </div>
        
        </div>
  )
}

export default SignUp