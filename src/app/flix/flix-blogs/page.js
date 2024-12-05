"use client";
import React, { useEffect, useRef, useState } from "react";

// Feature images
import foryouImage0 from "@/Images/flix/for-you.png";
import featureImg1 from "@/Images/flix/feature2.jpg";
import featureImg2 from "@/Images/flix/feature3.jpg";


// Components
import FlixNavbar from '@/Components/FlixNavbar';
import ScrollButtons from "@/Components/ScrollButtons";

//API's

import FlixBlogContent from "../../../Components/FlixBlogContent";
import FlixForYouApi from "@/apis/flix/FlixForYouApi";
import { Plus_Jakarta_Sans } from "next/font/google";
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import IntialLoadingAnimation from "@/Components/InitialPageLoadingAnimation";


const plus_jakarta_sans=Plus_Jakarta_Sans({
  subsets:['latin'],
  display:'swap'
})

const Page = ({scrollButtons=true, navbar=true}) => {

  const scrollContainer = useRef(null);
  let[gettingAccessToken,setGettingAccessToken]=useState(true);

  let[response,setResponse]=useState('');
      //for api data
      function getFlixData()
      {
        FlixForYouApi()
        .then((data)=>{
          setResponse(data.data);
        })
        .catch((error)=>{
          console.log(error);
        })
      }

      useEffect(()=>{
        getFlixData();
      },[])

      useEffect(()=>{
        getAccessToken();
      },[])

   let imgs={
    0:foryouImage0,
    1:featureImg1,
    2:featureImg2
   }


   //getting access token
   function getAccessToken()
   {
       GetAccessTokenAPI()
       .then((response)=>{
           if(response&&'message' in response&&response.message==='Refresh token is missing!')
           {
               window.location.href='/auth/user-auth';
           }
       })
       .catch((error)=>{

       })
       .finally()
       {
           setGettingAccessToken(false);
       }
   }

   if(gettingAccessToken)
   {
    return <IntialLoadingAnimation/>
   }
  return (
    <>
   {/* snap-start snap-always used for scrolling inside flix home page */}
   <section className={"flex justify-center h-screen w-full background-custom-grey100   " + plus_jakarta_sans.className}>
                <div className="page-center-parent-container  h-full  overflow-scrollbar-hidden small-border-x custom-border-grey800 overflow-scroll flex flex-col items-center justify-between  relative " >
                {/* {navbar&&response&& <FlixNavbar data={response}/>} */}
      
      <main className="absolute top-0 left-0 h-full w-full">
          <section ref={scrollContainer}  className="h-full w-full snap-y snap-mandatory  overflow-y-scroll " >
            {response.length>0&&response.map((element,index)=>{
             return  <FlixBlogContent data={element} key={index} />
            })}
          </section>
        </main>
      
         {/* Scroll Buttons */}
        {scrollButtons&& <ScrollButtons containerName={scrollContainer} />}
                </div>
    </section>
     
    </>
  );
};

export default Page;
