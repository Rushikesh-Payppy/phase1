"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

// icons
import arrowIcon from "@/Images/home/arrow-right.svg";

//logo
import hotAndCoolLogo from "@/Images/login/hotandcool.svg";

// Feature images
import foryouImage0 from "@/Images/flix/for-you.png";
import featureImg1 from "@/Images/flix/feature2.jpg";



//base URL
let baseUrl = "https://strapi.payppy.app/";


const FlixBlogContent = ({ data }) => {
  let router = useRouter();


  function handleReadMore() {
    router.push("/flix/" + data.documentId);
  }

  
  return (
    <>
      <article className="relative w-full h-full flex flex-col justify-end snap-start snap-always ">
       {/* hot and cool LOGO */}
       <Image src={hotAndCoolLogo} width={58} height={44} alt="hot&cool" quality={100} className="absolute bottom-10 right-9" />

       {/* blog image */}
        <Image  src={getImgUrl(data)} alt="img" width={390} height={802} quality={100} className="absolute top-0 left-0 min-w-[200px] w-full h-full object-cover -z-[1]" />
       
       {/* Blog title */}
        <section  className={ "section-gradient w-full h-1/2 flex justify-center items-center " + plus_jakarta_sans.className} >
  
          <Link  href={"/flix/flix-blogs/" + data.documentId} className="gap-6 mx-4 flex flex-col items-center py-10" >
            <h1 className="heading-h1 custom-text-white text-center ">
              {data.Title}
            </h1>

            {/* Read More Link */}
            <div className=" gap-1.5 flex flex-row items-center " onClick={handleReadMore} >
              <p className="all-caps-10-bold custom-text-white uppercase ">
                Read more
              </p>
              <Image  src={arrowIcon} height={18} width={18} alt="Arrow Icon" quality={100} />
            </div>

          </Link>
        </section>
      
      {/* footer */}
        {/* <FlixFooter positionValue="absolute" backOption="/" /> */}
      
      </article>
    </>
  );
};

export default FlixBlogContent;


function getImgUrl(data) {
  if (data.FeaturedImageOrVideo?.ext == "mp4") { return foryouImage0;}
  let imgName = data.FeaturedImageOrVideo.formats?.large?.url || data.FeaturedImageOrVideo.formats?.medium?.url ||  data.FeaturedImageOrVideo.formats?.small?.url || data.FeaturedImageOrVideo.formats?.thumbnail.url;
  return !imgName ? featureImg1 : baseUrl + imgName;
}

export {getImgUrl};


//   {/* Back Button */}
//   <button onClick={handleBack} className={`absolute top-0 left-0 mt-6 ml-6 bg-[#FDFBF8] gap-8 p-3 border-[0.5px] border-[#3D3E40] rounded-[90px]`}>
//   <Image  src={leftChevron} width={24} height={24} alt="img" quality={100} />
// </button>