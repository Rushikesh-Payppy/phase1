//Original code
'use client';
import { useEffect, useState } from "react";
import '@/Styles/flix-blogs/flix-blogs.css';
import Image from "next/image";
import RichText from "./RichText";
import FlixForYouBlogData from "../../../apis/flix/FlixForYouBlogData";
import { useRouter } from "next/navigation";

import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
});

// icons
import chevronRight from '@/Images/flix/chevron-right-white.svg';
import chevronLeftBlack from '@/Images/flix/chevron-left-black.svg'

//components
import { getImgUrl } from "@/Components/FlixBlogContent";

function Blog({ id }) {
  let router = useRouter();
  let [response, setReponse] = useState("");

  function getBlogData() {
    FlixForYouBlogData(id)
      .then((data) => {
        setReponse(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getBlogData();
  }, []);


  function gerFormattedPublishedDate(dateString) {
    const date = new Date(dateString);
  
    // Extract day, month, and year
    const day = date.getDate(); // Day of the month (1-31)
    const month = date.toLocaleString('en-US', { month: 'short'}); // Short month name
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year
  
    // Combine into the desired format
    return `${day} ${month} ${year}`;
  }

  const handleBack = ()=>{
    router.push("/flix");
  }


  return (
    <>
      {response.length == 0 ? (
        <h1 className="heading-h1 text-center">Loading...</h1>
      ) : (
        <>
          <article className=" relative flix-blog-parent-container ">
            <main className="flix-blog-main-container ">

             {/* Back Button */}
             <button onClick={handleBack} className={`fixed top-0 mt-6 ml-6 bg-[#FDFBF8] gap-8 p-3 border-[0.5px] border-[#3D3E40] rounded-[90px] cursor-pointer`}>
                <Image  src={chevronLeftBlack} width={24} height={24} alt="img" quality={100} />
             </button>
             {/* blog Rich cover image */}
            <Image src={getImgUrl(response)} alt="img" height={500}  width={500} quality={100} className="w-full h-auto aspect-square object-cover" />
          
              <div className="flex flex-col gap-5 pb-[75px] px-6 pt-7">
                {/* blog title & publish details */}
                <section className=" gap-3">
                  <section className={" gap-2 py-[1px] flex flex-row items-center uppercase font-medium all-caps-10 custom-text-grey600 " + plus_jakarta_sans.className} >
                    <p>{response.BlogReadingminutes} min read</p>
                    <p className="border-l pl-2 custom-border-grey300 ">
                      Published on: {gerFormattedPublishedDate(response.publishedAt)}
                    </p>
                  </section>

                  <h1 className={"heading-h1 tracking-tight font-normal custom-text-grey900 mt-3 " + noto_serif.className}>
                    {response.Title}
                  </h1>
                </section>

                <RichText data={response.BlogDescription} />
               
                {/* categories at bottom */}
                <section className={"flex flex-wrap gap-4 items-center custom-text-grey900 "+plus_jakarta_sans.className}>
                  {response.Category.split(',').map((element,index)=>{
                  return  <div className="gap-2 py-2.5 px-4 background-custom-grey50 text-center border-[0.5px] custom-border-grey900 rounded-full ">
                    #{element}
                  </div>
                  })}
                </section>
              </div>
            </main>
            
            {/* footer gradient */}
            {/* <FooterGradient positionValue="fixed"/> */}

            {/* footer */}
            {/* <FlixFooter positionValue="fixed" backOption="/flix/flix-blogs" mode="light" /> */}
           
          </article>
        </>
      )}
    </>
  );
}

export default Blog;


 {/* Back Button */}
//  <button onClick={handleBackBtn} className={`absolute top-0 left-0  mt-6 ml-6 bg-[#FDFBF8] gap-8 p-3 border-[0.5px] border-[#3D3E40] rounded-[90px]`}>
//  <Image src={leftChevron} width={24} height={24} alt="img" quality={100} />
// </button>
