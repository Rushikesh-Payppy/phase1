import React from "react";
import Image from "next/image";

//icons
import arrowUp from "@/Images/flix/arrow-up.svg";
import arrowDown from "@/Images/flix/arrow-down.svg";

const ScrollButtons = ({containerName}) => {

    const scrollUp = () => {
        if (containerName?.current)
          { containerName.current.scrollBy({top: -window.innerHeight,behavior: "smooth",});}
      };
    
      const scrollDown = () => {
        if (containerName?.current) 
          {containerName.current.scrollBy({ top: window.innerHeight, behavior: "smooth", });}
      };

  return (
    <>
      <aside className="hidden lg:fixed lg:top-[90vh] lg:pb-10 lg:right-[31%] lg:transform lg:-translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-4">
        
        <button className="gap-2.5 p-1.5" onClick={scrollUp} type="button" aria-label="Scroll Up" >
          <Image src={arrowUp} width={28} height={28} alt="" quality={100} />
        </button>

        <button type="button" onClick={scrollDown} className="gap-2.5 p-1.5" aria-label="Scroll Down">
          <Image src={arrowDown} width={28} height={28} alt="" quality={100} />
        </button>
        
      </aside>
    </>
  );
};

export default ScrollButtons;
