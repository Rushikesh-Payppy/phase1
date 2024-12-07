//Original code
"use client";
import React, { useEffect, useRef, useState } from "react";

// Feature images
import foryouImage0 from "@/Images/flix/for-you.png";
import featureImg1 from "@/Images/flix/feature2.jpg";
import featureImg2 from "@/Images/flix/feature3.jpg";


// Components
import ScrollButtons from "@/Components/ScrollButtons";
import FlixBlogContent from "@/Components/FlixBlogContent";
import FlixForYouApi from "../../apis/flix/FlixForYouApi";

//API's



const Page = ({scrollButtons=true, navbar=true}) => {

  const scrollContainer = useRef(null);

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
        getFlixData()
      },[])

   let imgs={
    0:foryouImage0,
    1:featureImg1,
    2:featureImg2
   }

  return (
    <>
   {/* snap-start snap-always used for scrolling inside flix home page */}
      <article className="h-screen relative min-w-[200px] min-h-[200px] max-w-[52.7vh] flex flex-col items-center justify-between mx-auto snap-start snap-always ">
        {/* navbar */}
      {/* {navbar&& <FlixNavbar/>} */}
      
      <main className="absolute top-0 left-0 h-full w-full">
          <section ref={scrollContainer}  className="h-full w-full snap-y snap-mandatory overflow-y-scroll " >
            {response.length>0&&response.map((element,index)=>{
             return  <FlixBlogContent data={element} key={index} />
            })}
          </section>
        </main>
      
         {/* Scroll Buttons */}
        {scrollButtons&& <ScrollButtons containerName={scrollContainer} />}
      </article>
    </>
  );
};

export default Page;
