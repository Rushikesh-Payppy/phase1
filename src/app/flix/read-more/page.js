'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "@/Styles/flix/flix.css";
// import Footer from "@/Components/Footer";
import feature1 from "@/Images/flix/feature1.jpg";
import feature2 from "@/Images/flix/feature2.jpg";

// Fonts
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Page = () => {
  const [isFooterVisible, setFooterVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        setFooterVisible(false);
      } else {
        // Scrolling up
        setFooterVisible(true);
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <>
      <article className="relative h-screen min-w-[200px] min-h-[200px] max-w-[52.7vh] flex flex-col items-center justify-between mx-auto ">
        <main className={"pt-6 px-6 pb-14 w-full flex flex-col border-l-[0.5px] border-r-[0.5px] custom-border-grey800 scroll-smooth " + plus_jakarta_sans.className} >
          
          <section className="gap-2 body-sm font-normal custom-text-grey600 flex flex-row ">
            <p>4 min read</p>
            <p className=" custom-text-grey500 w-[3px] h-[3px] px-2 ">•</p>
            <p className="pl-1">Selected for you</p>
          </section>

          <section className="gap-8 pt-2">
            <div className="gap-3 flex flex-col justify-start ">
              <h1 className="pt-3 heading-h1 custom-text-grey900  ">
                5 effortless looks that most stylish people are wearing right now
              </h1>
            </div>
            <Image src={feature1} width={342} height={342} alt="" quality={100} className=" py-8 w-full object-cover "/>
            <p className={ "custom-text-grey700 serif-body  " + noto_serif.className }>
              Effortless looks are a piece of cake for fashionistas, but in this
              blog, we’re breaking down 5 such styles that will help you put
              together a stylish outfit within minutes! These looks are
              timeless, pretty available and can make you look like a million
              dollars. Ready to pull off effortless looks? Let’s dive in.
            </p>
          </section>

          <section className="gap-8  pt-12">
            <div className="gap-3 serif-body font-semibold custom-text-grey900 ">
              1. Capris but make them fashun
            </div>
            <p
              className={"custom-text-grey700 serif-body pt-3 " + noto_serif.className}>
              We all have cut-up jeans and made capris out of them. Sure they
              look laid back, but not when stylish people put it together with
              more eye candy top wear and accessories.
            </p>
            <Image src={feature2} width={342} height={342} alt="" quality={100} className="   py-8 w-full object-cover "/>
          </section>
        </main>

        {/* Footer visibility toggled */}
        {/* {isFooterVisible && (<div className="sticky bottom-0 w-full "><Footer background="background-custom-grey950"  borderWidth="border-t" borderColor="custom-border-grey800"/> </div>)} */}
      </article>
    </>
  );
};

export default Page;
