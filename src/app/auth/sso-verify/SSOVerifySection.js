'use client';
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoadingAnimation from "../LoadingAnimation";

export const dynamic = 'force-dynamic'; // Ensure this page is rendered dynamically


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})

function SSOVerifySection() {
    let searchParams=useSearchParams();
    let accessToken=searchParams.get('url');
    let refferalCode=localStorage.getItem('ref');
    let obj={
        'referral_code':refferalCode
    }
    useEffect(()=>{
        fetch('https://payppy.in/auth/generate-new-access-token',{
            method:'POST',
            headers:{
                'Authorization':'Bearer '+accessToken,
                'Content-Type':'application/json',
            },
            credentials:'include',
            body:JSON.stringify(obj)
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            // console.log('response :',response);
            if(response&&'message' in response&&response.message==='New access token generated successfully.')
            {
                console.log(response);
                
                window.location.href='/store/user-info';
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    },[accessToken])
    return(
        <>
            <section className={"flex justify-center h-screen w-full background-custom-grey100   " + plus_jakarta_sans.className}>
                <div className="page-center-parent-container  h-full  overflow-scrollbar-hidden small-border-x custom-border-grey800 overflow-scroll flex flex-col items-center justify-center gap-7" >
                    <LoadingAnimation/>
                    <h2 className="heading-h2 custom-text-grey900 text-center">Verifying your email..</h2>
                </div>
               {/* <button className={`py-4 px-7 w-full flex justify-center items-center shadow-sm custom-text-white all-caps-12 text-center   bg-black `}><LoadingAnimation borderColor='border-white'/></button> */}

            </section>
        </>
    )
}
export default SSOVerifySection;