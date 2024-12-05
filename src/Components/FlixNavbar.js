"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/Styles/flix/flix.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useSearchParams } from 'next/navigation';

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});


//icons
import crossIcon from '@/Images/Store/close-icon.svg';
import FlixCatagoriesApi from "@/apis/flix/FlixCatagoriesApi";

//catagory api



const FlixNavbar = ({data}) => {

  let [catagories, setCatagories] = useState([]);

  let params = useSearchParams();
  let [clickedCatagory, setClickedCatagory] = useState();

  // useEffect(() => {
  //   FlixCatagoriesApi()
  //     .then((response) => {
  //       setCatagories(response?.data || []);
  //     })
  //     .catch((error) => {

  //     })
  // }, [])

  useEffect(()=>{
    let uniqueCatagories=[];
    data.forEach((element,index)=>{
      element.Category.split(',').map((catagory)=>{
        let trimmedCatagory=catagory.toString().toLowerCase().trim();
        if(!uniqueCatagories.includes(trimmedCatagory))
        {
          
          uniqueCatagories.push(trimmedCatagory);
        }
      })
    });
    console.log('catagories :',uniqueCatagories);
    
    setCatagories(uniqueCatagories);
  },[data])

  useEffect(() => {
    let result = params.get('catagory');
    setClickedCatagory(result);
  }, [params])

  return (
    <nav className={"pt-4 pb-6 pl-6 custom-text-white z-[10] w-full navbar-gradient flex flex-row " + plus_jakarta_sans.className} aria-label="Main navigation">

      {/* Flix button */}
      <Link href="/flix" className="heading-h2 pr-4 gap-1">
        Flix
      </Link>

      {/* Separator */}
      <div className="border-l custom-border-white opacity-50 h-8"></div>

      {/* categories section */}
      <section className="flex flex-row items-center gap-8 all-caps-12 font-medium tracking-wider overflow-x-scroll overflow-y-hidden scroll-smooth ">

        {catagories.length > 0 && catagories.map((element, index) => {
          return <Link href={'/flix/flix-blogs?catagory=' + element} className={`flex flex-col item-center gap-1 pt-1 ${index === 0 ? " pl-4 " : " "} ${index === catagories.length-1 ? " pr-5 " : " "}`}>
            <div className={`flex item-center ${clickedCatagory == element ? " gap-1 " : " "}`}>
              <div className="all-caps-12-bold custom-text-white whitespace-nowrap">{'#' + element}</div>
              <Image src={crossIcon} height={16} width={16} alt="img" quality={100} className={` get-light-img duration-300 ${clickedCatagory == element.catagory ? " w-4 " : " w-0 "}`} />
            </div>
            {<div className={` background-custom-white mx-auto duration-300 h-[1px] ${clickedCatagory == element ? " w-1/2 " : " w-0 "}`}></div>}
          </Link>
        })
        }

      </section>
    </nav>
  );
};

export default FlixNavbar;







//CODE 2
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import "@/Styles/flix/flix.css";
// import { Plus_Jakarta_Sans } from "next/font/google";

// const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   display: "swap",
// });

// const Header = () => {

//   const [isClicked, setIsClicked] = useState(false);

//   const handleClick = () => {
//     setIsClicked(!isClicked); // Toggle the clicked state
//   };

//   return (
//     <nav className={"pt-4 pb-6 pl-6 custom-text-white z-[10] w-full navbar-gradient flex flex-row " + plus_jakarta_sans.className} aria-label="Main navigation" >

//       {/* Flix button */}
//       <Link href="/flix/flix-reels" className="heading-h2 pr-4 gap-1 "> Flix </Link>

//       {/* Seperator */}
//       <div className="border-l custom-border-white opacity-50 h-8 "></div>

//       {/* categories section */}
//       <section className="flex flex-row items-center gap-5 all-caps-12 font-medium tracking-wider overflow-x-scroll overflow-y-hidden scroll-smooth ">

//         <Link href="/flix/for-you" className="gap-1 py-0.5 pl-4 " onClick={handleClick}>
//           <p className={isClicked ? "clickedText" : "defaultText"} > #ForYou </p>
//         </Link>

//         <Link href="#trends" className="gap-1 py-0.5 " onClick={handleClick} >
//           <p className={isClicked ? "clickedText" : "defaultText"} > #Trends </p>
//         </Link>

//         <Link href="#lookbooks" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Lookbooks </p>
//         </Link>

//         <Link href="#release" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Release </p>
//         </Link>

//         {/* trial */}
//         <Link href="#release" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Release </p>
//         </Link>

//         <Link href="#release" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Release </p>
//         </Link>

//         <Link href="#release" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Release </p>
//         </Link>

//         <Link href="#release" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Release </p>
//         </Link>

//         <Link href="#release" className="gap-1 py-0.5 " onClick={handleClick}>
//          <p className={isClicked ? "clickedText" : "defaultText"}> #Release </p>
//         </Link>

//       </section>
//     </nav>
//   );
// };

// export default Header;
