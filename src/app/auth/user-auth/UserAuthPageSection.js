'use client';

//to avoid generate asa static page
export const dynamic='force-dynamic';
import { Plus_Jakarta_Sans } from 'next/font/google';

import Image from 'next/image';
//import 
import Logo from '@/Images/UserAuth/payppy-logo.svg';
import Insta from '@/Images/UserAuth/insta.svg';
import Twit from '@/Images/UserAuth/twit.svg';
import Link from 'next/link';

import Google from '@/Images/UserAuth/google-icon.svg';
import Mail from '@/Images/UserAuth/mail.svg';
import { useEffect, useRef, useState } from 'react';
import PasswordValidationBoxes, { verifyPasswordIsMatchingToCriteriaWhileTyping } from '@/Components/PasswordValidation';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import UserRegisterApi from '@/apis/UserRegistrationApi';
import SignUpByEmail from './SignUpByEmail';
import { useRouter, useSearchParams } from 'next/navigation';
import UserLogin from '@/apis/auth/UserLogin';
import LoadingAnimation from '../LoadingAnimation';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';





const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap'
})
function UserAuthPageSection() {

    //storing values in state
    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');

    //to verify input email or password  is empty or invalid 
    let[invalidEmail,setInvalidEmail]=useState(true);
    let[invalidPassword,setInvalidPassword]=useState(true);

    //to open modal and continue with email view 
    let[showAuthView,setShowAuthView]=useState(false);
    let[emailInputsVisibility,setEmailInputVisibility]=useState(false);

    let[registerSteps,setRegisterSteps]=useState(0);

    //if the user is already verified with email then show alert message by using this state
    let[userAlreadyVerified,setUserAlreadyVerified]=useState(false);
     //if the user inputed invalid credential alert message by using this state
     let[invalidCredentails,setInvalidCredentials]=useState(false);

     //if the user is already registered with email
    let[userAlreadyRegistered,setUserAlreadyRegistered]=useState(false);

    let[signInView,setSignInView]=useState(false);

    let[loadingAnimation,setLoadingAnimation]=useState(false);

    let[accessToken,setAccessToken]=useState('');


    let authInputContainer=useRef();

    let paramsValue=useSearchParams();

    let router=useRouter();


      useEffect(()=>{
        function outsideClick(e)
        {
            if(showAuthView&&authInputContainer.current&&!authInputContainer.current.contains(e.target))
            {
                setShowAuthView(false);
            }
        }

        document.addEventListener('click',outsideClick);

       
        return()=>  {
            document.removeEventListener('click',outsideClick);
        }
      },[showAuthView,emailInputsVisibility])


      //checking email is valid or not with regx
      useEffect(()=>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  //email validation
            setInvalidEmail(!emailRegex.test(email));
     
            //checking password is valid or not with function
            let isPasswordValid=verifyPasswordIsMatchingToCriteriaWhileTyping(password)
            setInvalidPassword(isPasswordValid);
      },[email,password])

    //   useEffect(()=>{
    //     let isPasswordValid=verifyPasswordIsMatchingToCriteriaWhileTyping(password)
    //     setInvalidPassword(isPasswordValid);
    //   },[password])


      //if the url contains the auth=login query then this signInview will gets assign to tru and forgot password & not a member sign up link will get rendered
      useEffect(()=>{
        let referrelId=paramsValue?.get('referral_code');
        if(referrelId)
        {
            localStorage.setItem('ref',referrelId);
        }
        let islogin=paramsValue?.get('auth');
        setSignInView(islogin==='login');
        //when we change the view like sign up or login this below fields are becoming empty
            setEmail('');
            setPassword('');
            setInvalidCredentials(false);
            setUserAlreadyVerified(false);

      },[paramsValue])

      useEffect(()=>{
        getAccessToken();
      },[])


      //handling email input 
      function handleEmailInput(e)
      {
        let value=e.target.value;
        let sanitizedValue=SanitizeInputs(value);       //sanitize value to prevent before use
        setEmail(sanitizedValue);   
      }

      //handling password input
      function handlePasswordInput(e)
      {
        let value=e.target.value;
        let sanitizedValue=SanitizeInputs(value);      //sanitize value to prevent before use
        setPassword(sanitizedValue);
      }

      function handleBecomeAMember(e)
      {
        e.stopPropagation();
        setShowAuthView(true);
      }

      //to show sign up with email input fields
      function handleMailBtn(e)
      {
        e.stopPropagation();
        setEmailInputVisibility(true);
    }
    
    //proceed button for sign up click
    function handleProceedForSignUp()
    {
        //if email or password is invalid then it will return;
        if(invalidEmail || invalidPassword)
        {
            return;
        }
        let refferalCode=localStorage.getItem('ref');
        let obj={
            'login_value':email,
            'password':password,
            'referral_code':refferalCode
        }

        //for showing loading animation
            
        setLoadingAnimation(true);

        UserRegisterApi(obj)
        .then((response)=>{
            // console.log('response :',response);

            if(response&&'status' in response&&response.status==='success'&&'message' in response)
            {

                if(response.message==='Mail send successfully!')
                {
                    setRegisterSteps(1);
                }
                
                if(response.message==='User already exists but is not verified')
                {
                    setUserAlreadyRegistered(true);
                    setRegisterSteps(1);
                }
    
                if(response.message==='User already verified')
                {
                    setUserAlreadyVerified(true);
                }

            }
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
                // for turn off loading animation 
                setLoadingAnimation(false);
        })
       
    }

     //proceed button for sign in click
    function handleProceedForSignIn()
    {
        //if email or password is invalid then it will return;
        setInvalidCredentials(invalidEmail || password.length<8)
        if(invalidEmail || password.length<8)
            {
                return;
            }

            let obj={
                'login_value':email,
                'password':password,
            }
            
            //for showing loading animation
            
            setLoadingAnimation(true);

            UserLogin(obj)
            .then((response)=>{
                // console.log(response);
                if(response&&'status' in response &&response.status==='success')
                {
                    if('message' in response&&response.message==='User is not present please register!')
                    {
                        setInvalidCredentials(true);
                    }
                    //if user login intially or never veriefied his mobile number
                    if('data' in response&&'mobile_verified' in response.data&&!response.data.mobile_verified)
                    {
                            window.location.href='/store/user-info';
                    }
                    if('message' in response&&response.message==='Logged in successfully.')
                    {
                      
                        router.push('/landing-page');
                    }
                     if('message' in response&&response.message==='Please verify your email address.')
                    {
                        setUserAlreadyRegistered(true);
                        setRegisterSteps(1);
                    }
                    
                }
                if('message' in response&&response.message==='Invalid credentials')
              {
                  setInvalidCredentials(true);
              }
            })
            .catch((error)=>{
                console.log(error);
            })
            .finally(()=>{
                    // for turn off loading animation 
                    setLoadingAnimation(false);
            })
           
            
    }


    //to sign in with google
    function handleSignInWithGoogle()
    {
        router.push('https://payppy.in/auth/google-login');
    }

    //when someone hit enter in password
    function handlePasswordKeyDown(e)
    {
        if(e.key==='Enter')
        {
            //if there is no login view and both email and passsword field are valid this condition for sign up
            if(!signInView&&!invalidPassword&&!invalidEmail)
            {
                handleProceedForSignUp();
            }
            else{
                //this condition is for sign in
                handleProceedForSignIn();
            }
        }
    }

     //getting access token
     function getAccessToken()
     {
         GetAccessTokenAPI()
         .then((response)=>{
             if(response&&'access_token' in response)
             {
                router.push('/landing-page');
             }
             
             // if(response&&'message' in response&&response.message==='Refresh token is missing')
             // {
             //     router.push('/auth/')
             // }
         })
         .catch((error)=>{
 
         })
     }
    return (
        <>
           {registerSteps===0&&<section className={"flex justify-center min-h-screen w-full background-custom-grey50    " + plus_jakarta_sans.className}>
                <div className="page-center-parent-container  small-border custom-border-grey600 overflow-y-hidden overflow-scrollbar-hidden flex flex-col justify-end pb-14 px-6 bg-black relative">
                    <video className= 'object-cover h-full w-full -z-1 absolute top-0 left-0' autoPlay loop muted playsInline >
                    <source src="/landingpage-video.mp4" type="video/mp4" />
                    </video>
                <div className={`w-full h-full bg-black absolute top-0 left-0 ${showAuthView?' opacity-70 z-[1] ':' opacity-40 '} `}></div>
              
                <div className="flex flex-col items-center gap-6 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full">
                    <Image src={Logo} width={198} height={32} alt='img' quality={100} className=' h-auto' />
                    <div className={"body-bold custom-text-white text-center  "+plus_jakarta_sans.className}>You've landed on the cool side of the world</div>
                    <button className="all-caps-12-bold background-custom-green py-4 px-7 custom-text-grey900 max-w-xs w-full " onClick={handleBecomeAMember}>Become a Member</button>
                </div>

                     <div className="flex justify-between items-center z-[1]">
                            <div className="flex items-center gap-5">
                               <a href="https://x.com/payppy_app?s=21" target="_blank" rel="noopener noreferrer">
                                    <Image src={Twit} width={16} height={16} alt='img' quality={100} className='' />
                               </a> 
                               <a href="https://www.instagram.com/payppy.app/" target="_blank" rel="noopener noreferrer">
                                    <Image src={Insta} width={16} height={16} alt='img' quality={100} className='' />
                               </a> 
                            </div>
                            <div className="flex items-center gap-5">
                                <Link href='/shipping-return-refund' className='all-caps-10 custom-text-white'>ShippinG</Link>
                                <Link href='/terms-of-use' className='all-caps-10 custom-text-white'>terms</Link>
                                <Link href='/cookies-policy' className='all-caps-10 custom-text-white'>cookies</Link>
                                <Link href='/privacy-policy' className='all-caps-10 custom-text-white'>privacy</Link>
                            </div>
                        </div> 

                  

                    {/* bottom modal */}
                    <div className={`w-full flex flex-col gap-8 pt-2 px-6 pb-10 background-custom-grey50 absolute left-0 duration-500 ${showAuthView ? ' bottom-0 z-[2] ' : ' -bottom-[100%] z-0 '}`} ref={authInputContainer}>
                        <div className="flex justify-center items-center">
                            <div className="w-12 h-0.5 background-custom-grey400"></div>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className="heading-h2 text-center custom-text-grey900">Welcome to Payppy</h2>
                            <div className="body font-normal custom-text-grey700 text-center">Sign up to our exclusive waitlist get a chance to access our next drop, first!</div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between background-custom-white items-center gap-2 py-4 px-5 border-[0.5px] custom-border-grey800  rounded-sm cursor-pointer duration-300 hover:bg-[#F3F1ED] " onClick={handleSignInWithGoogle} >
                                    <Image src={Google} width={20} height={20} alt='img' quality={100} />
                                    <div className="all-caps-12-bold text-center custom-text-grey900 uppercase">Continue with Google</div>
                                    <div></div>
                                </div>
                                {!emailInputsVisibility && <div className="flex justify-between background-custom-white items-center gap-2 py-4 px-5 border-[0.5px] custom-border-grey800 rounded-sm cursor-pointer duration-300 hover:bg-[#F3F1ED] " onClick={handleMailBtn}>
                                    <Image src={Mail} width={20} height={20} alt='img' quality={100} />
                                    <div className="all-caps-12-bold text-center custom-text-grey900 uppercase">Continue with Email</div>
                                    <div></div>
                                </div>}
                            </div>

                            {<div className={`flex flex-col gap-6 duration-500 ${emailInputsVisibility ? ' max-h-[1100px] h-auto' : 'max-h-0 h-0 '}`}>
                                
                                <div className="flex gap-2 items-center justify-center">
                                {/* <p className='body custom-text-grey700 '>Already a member? </p>
                                <button className='custom-text-grey900 underline body-bold'>Log in</button> */}
                                  <> 
                                   {!emailInputsVisibility? 
                                   <div className="flex gap-2 justify-center ">
                                        <div className="custom-text-grey700 body">Already a member? </div>
                                        <Link href='/auth/user-auth?auth=login' className='body-bold custom-text-grey800 underline pb-2.5'>Log in</Link>
                                    </div>
                                       : 
                                       <>
                                        <div className="border border-custom-grey200 grow"></div>
                                        <div className="custom-text-grey900 body">or</div>
                                        <div className="border border-custom-grey200 grow"></div>
                                        </>}
                                    </>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <div className="all-caps-12-bold custom-text-grey900 uppercase">Email Address</div>
                                    <input type="text" name="email" value={email} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' onChange={handleEmailInput}/>
                                    {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>}
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="all-caps-12-bold custom-text-grey900 uppercase">Password</div>
                                        <input type="password" name="password" value={password} className='w-full border-[0.5px] custom-border-grey800 outline-none py-3.5 px-5 ' onChange={handlePasswordInput} onKeyDown={handlePasswordKeyDown}/>
                                    {/* {invalidEmail&&email.length>0&&<span className="custom-text-alert body-sm">Please enter a valid email address</span>} */}

                                    </div>
                                 {!signInView&&<PasswordValidationBoxes password={password} />}
                                </div>

                               {signInView&&<Link href='/auth/reset-password' className='body-bold custom-text-grey800 underline pb-2.5'>Forgot Password?</Link>}

                                <div className="flex flex-col gap-2">
                                  {signInView?  <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `} onClick={handleProceedForSignIn} >{loadingAnimation?<LoadingAnimation borderColor='border-white'/>:<span>Proceed</span>}</button>
                                    :<button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12  text-center ${invalidPassword?' background-custom-grey500 ':'  bg-black '}`} onClick={handleProceedForSignUp} disabled={invalidPassword || invalidEmail}>{loadingAnimation?<LoadingAnimation borderColor='border-white'/>:<span>Proceed</span>}</button>}
                                   {userAlreadyVerified&& <span className="custom-text-alert body-sm text-center">An account with this email already exists. Please log in</span>}
                                   {invalidCredentails&& <span className="custom-text-alert body-sm text-center">invalid Credentials</span>}

                                </div>



                               {signInView ? <div className="flex gap-2 justify-center ">
                                                <div className="custom-text-grey700 body"> Not a Member?  </div>
                                                <Link href='/auth/user-auth' className='body-bold custom-text-grey800 underline pb-2.5'>Sign Up</Link>
                                            </div>
                                        :  <div className="flex gap-2 justify-center ">
                                                <div className="custom-text-grey700 body">Already a member? </div>
                                                <Link href='/auth/user-auth?auth=login' className='body-bold custom-text-grey800 underline pb-2.5'>Log in</Link>
                                            </div>}
                            </div>}
                        </div>
                    </div>
                </div>
            </section>}
           {registerSteps===1&& <SignUpByEmail email={email} alreadyRegistered={userAlreadyRegistered} setRegisterSteps={setRegisterSteps}/>
            }
        </>
    )
}

export default UserAuthPageSection;

