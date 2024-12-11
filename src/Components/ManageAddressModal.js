'use client';
import { useState } from "react";
import LoadingAnimation from "../app/auth/LoadingAnimation";

function ManageAddress()
{
    let[loadingAnimation,setLoadingAnimation]=useState(false);

    return(
        <div className="page-center-parent-container        ">
        <div className={`w-full  flex flex-col gap-8 px-6 pb-10 pt-14 background-custom-grey50 min-h-screen mt-auto duration-500 small-border border-black `} >
            <div className="flex justify-center items-center">
                <div className="w-12 h-0.5 background-custom-grey400"></div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <h2 className="heading-h2 text-center custom-text-grey900">Manage address</h2>
                <div className="body font-normal custom-text-grey700 text-center">Enter or edit your address for accurate delivery</div>
            </div>

            <div className="flex flex-col gap-6 ">

                    <div className="flex flex-col gap-1.5">
                        <div className="all-caps-12-bold custom-text-grey900 uppercase">house/flat number, Street Name</div>
                        <input type="text" name="email"  className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                        {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        
                        <div className="all-caps-12-bold custom-text-grey900 uppercase">apartment, suite (Optional)</div>
                        <input type="password" name="password"  className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                    {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}                    
                        </div>

                        <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1.5">
                            <div className="all-caps-12-bold custom-text-grey900 uppercase">house/flat number, Street Name</div>
                            <input type="text" name="email"  className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                            {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="all-caps-12-bold custom-text-grey900 uppercase">house/flat number, Street Name</div>
                            <input type="text" name="email"  className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' />
                            {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}
                        </div>
                        
                    </div>




                    <div className="flex flex-col gap-2">
                      <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `}   >{loadingAnimation?<LoadingAnimation borderColor='border-white'/>:<span>Proceed</span>}</button>
                      


                    </div>



                  

            </div>
        </div>
    </div>
    )
}


export default ManageAddress;