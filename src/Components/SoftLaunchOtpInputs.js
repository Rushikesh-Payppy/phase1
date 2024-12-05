'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationOtpVerification from '@/apis/RegistrationOtpVerification';
import ResendOtp from '@/apis/ResendOtp';
import VerifyOtpApi from '@/apis/auth/VerifyOtpApi';
import SentOtpApi from '@/apis/auth/SentOtpApi';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
    

function SoftLaunchOtpInputs({name,lastname,accessToken,phone_number,setUserInfoView,sessionId})
{

    let router=useRouter();
    let otp=useRef([6]);
    let[timer,setTimer]=useState(60);
    let[invalidOtp,setInvalidOtp]=useState(false);
    let[isOtpResend,setIsOtpResend]=useState(false);
    let[payloadSessionId,setPayloadSessionId]=useState(sessionId);


    useEffect(()=>{
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1); // Update based on previous value
            }, 1000);
    
            return () => clearInterval(interval); // Cleanup on unmount or timer reset
        }
    },[timer])

    function handleOtp(e,index)
    {
        
        let value=e.target.value.replace(/[^0-9 ]/g, "");

        if(value=='' )
        {
            otp.current[index].value="";
            otp.current[index].classList.remove("custom-text-white", "bg-black");       
            return;
        }

        if (value.length>0) {
            otp.current[index].classList.add("custom-text-white", "bg-black");
          }
       

       
        if(value.length>1 )
        {
            return;
        }
        if(value.length===1&&index<5)
        {
            otp.current[index+1].focus();
        }
            
        //when all fields get filled then api hit automactically
        if (allInputsFilled())
        {
            verifyOtp();   
        }

    }

    function handleBackspace(e,index)
    {
        let value=e.target.value.replace(/[^0-9 ]/g, "");

        if(e.key==='Backspace'&&value=='')
            {
                otp.current[index-1]?.focus();
            }
    
    }

    function handleBackBtn(backBtnpressed=false)
    {
         // Reset all OTP input fields
        otp.current.forEach((element) => {
            if (element) {
                element.value = ""; // Clear the input value
                element.classList.remove("custom-text-white", "bg-black"); // Remove the applied classes
            }
        });

        otp.current[0].focus();

        if(backBtnpressed)
        {
            //set the previous view
            setUserInfoView(2);
        }
    }

    //verify otp
    function verifyOtp()
    {
        setInvalidOtp(false);

        let payloadObj={
            "first_name":name,
            "last_name":lastname,
            "phone":"+91"+phone_number,
            "session_uuid":payloadSessionId,
            "otp":getOtp()
        }
        VerifyOtpApi(payloadObj,accessToken)
        .then((response)=>{
            if(response&&'message' in response)
            {
                if(response.message==='Mobile number verified successfully.')
                {
                    router.push('/landing-page');
                }
                if(response.message==='session validation failed' || response.message==='session_uuid is not valid')
                {
                        setInvalidOtp(true);
                        handleBackBtn();
                }
            }
        })
        .catch((error)=>{
            console.error(error);
        })

    }

    //to check all input fileds are filled
    function allInputsFilled()
    {
        let value=otp.current.every(element=> element.value.length>0);
        return value;
    }

    //to return otp;
    function getOtp()
    {
        let payloadOtp='';

        otp.current.forEach((element)=>{
            payloadOtp=payloadOtp+element.value;
        })

        return payloadOtp;
    }


    //to resend otp
    function handleResendOtp()
    {
        let obj={
            'phone_number':'+91'+phone_number
        }
        setIsOtpResend(false);

        SentOtpApi(obj)
        .then((response)=>{
            if(response&&'data' in response)
            {
                if('session_uuid' in response.data)
                {
                    setPayloadSessionId(response.data.session_uuid);
                    setIsOtpResend(true);
                    handleBackBtn();
                }
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}>
            <div className="page-center-parent-container small-border custom-border-grey600 relative">
                <div className="flex flex-col px-6 pt-6 pb-10 background-custom-grey100 gap-8 h-screen ">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={36} height={36} alt='img' quality={100} onClick={()=>{handleBackBtn(true)}}/>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="heading-h2 custom-text-grey900 ">Enter 6 digit code we sent to <br />+91 {phone_number}</h2>
                            </div>
                            <div className="flex flex-col gap-5 ">
                                <div className="grid grid-cols-6 small-border border-l-0 custom-border-grey800 w-full ">
                                    {Array(6).fill(0).map((element,index)=>{
                                        return<div className={`${index>0?' small-border-left ':'' } h-16 custom-border-grey800 flex justify-center items-center `} key={index}>
                                            <input type="text"  ref={ref=>(otp.current[index]=ref)} className={`outline-none h-full px-5 heading-h2 w-full otp-input-fields text-center `} maxLength={1} onChange={(e)=>{handleOtp(e,index)}} onKeyDown={(e)=>{handleBackspace(e,index)}} />
                                        </div>
                                    })}
                                   
                                </div>
                               {invalidOtp&&<div className="custom-text-alert body-sm">Incorrect Code or Otp Expired</div>}

                               {timer>0 ?<div className="custom-text-grey500 body-sm">Resend code in 00:{timer}sec</div>:
                               <div className="custom-text-grey800 body-sm-bold cursor-pointer underline" onClick={handleResendOtp}>Resend code</div>}

                              {isOtpResend&& <div className="custom-text-grey800 body-sm cursor-pointer " >Code Resend!</div>}
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </>
    )
}

export default SoftLaunchOtpInputs;