'use client';

import ForgotPasswordApi from '@/apis/auth/ForgotPasswordApi';
import Arrow from '@/Images/Otp/arrow-icon.svg';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResetPasswordEmailResendSection from './ResetPasswordEmailResendSection';
import LoadingAnimation from '../LoadingAnimation';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
function ResetPasswordSection()
{
    let[email,setEmail]=useState('');
    let[invalidEmail,setInvalidEmail]=useState(true);
    let[invalidCredential,setInvalidCredential]=useState(false);

    let[sendingPasswordLink,setSendingPasswordLink]=useState(false);

    let[resetPasswordSteps,setResetPasswordSteps]=useState(0);

    let router=useRouter();



    useEffect(()=>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  //email validation
        setInvalidEmail(!emailRegex.test(email));
        setInvalidCredential(false);
    },[email])


    //handling email input 
    function handleEmailInput(e)
    {
      let value=e.target.value;
      let sanitizedValue=SanitizeInputs(value);       //sanitize value to prevent before use
      setEmail(sanitizedValue);   
    }

    //when back button click
    function handleBackButtonClick()
    {
        router.push('/auth/user-auth');
    }

    function handleForgotPasswordProceed()
    {
        if(invalidEmail)
        {
            return;
        }

        let obj={
            "login_value":email
        }
        
        setSendingPasswordLink(true);

        ForgotPasswordApi(obj)
        .then((response)=>{
            // console.log(response);
            if(response&&'message' in response)
            {
                // if(response.message==='User not found.')
                // {
                    //if the user not found then this invalid credential state become true to show invalid credential alert message
                    setInvalidCredential(response.message==='User not found.');
                // }

                if(response.message==='Password reset link has been sent to your email.')
                {
                    setResetPasswordSteps(1);
                }
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setSendingPasswordLink(false);
        })
    }


    //if use click enter button
    function handleKeyEnter(e)
    {
        if(e.key==='Enter')
        {
            handleForgotPasswordProceed();
        }
    }
    return(
        <>
            {resetPasswordSteps==0&&<section className={"flex justify-center  background-custom-grey50   "+plus_jakarta_sans.className}>
                <div className="page-center-parent-container px-6 py-10 small-border border-custom-grey800">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={32} height={32} alt='img' quality={100} className='cursor-pointer' onClick={handleBackButtonClick}/>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h3 className="heading-h3 custom-text-grey900 ">Reset Password</h3>
                                <div className="body-sm custom-text-grey700">We’ll send a confirmation code to your email or phone number. Once verified, you can set a new password.</div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="body-sm-bold custom-text-grey900">Email</div>
                                <input type="text" name="numberOrEmail" value={email} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={handleEmailInput} onKeyDown={handleKeyEnter}/>
                                {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>}
                                {invalidCredential&&<span className="custom-text-alert body-sm">Invalid Email Address</span>}
                            </div>
                            <button className={`py-4 px-7 w-full ${invalidEmail?' background-custom-grey500 ':' bg-black '} shadow-sm custom-text-white all-caps-12 flex justify-center items-center text-center`} disabled={invalidEmail} onClick={handleForgotPasswordProceed}>{sendingPasswordLink?<LoadingAnimation borderColor={'border-white'}/>:'Proceed'}</button>

                        </div>
                    </div>

                </div>
            </section>}
            {resetPasswordSteps==1&&<ResetPasswordEmailResendSection email={email} alreadyRegistered={false} setResetPasswordSteps={setResetPasswordSteps}/>}


        </>
    )
}

export default ResetPasswordSection;