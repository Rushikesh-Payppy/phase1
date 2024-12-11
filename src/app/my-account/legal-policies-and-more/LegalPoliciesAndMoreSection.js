"use client";
import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//component
import AccountButton from "@/Components/AccountButton";
import PageBackButton from "@/Components/PageBackButton";
import ReadFaqSection from "@/Components/ReadFaqSection";

//icons
import privacyPolicyIcon from "@/Images/legal-and-more/privacyPolicy.svg";
import termsOfUseIcon from "@/Images/legal-and-more/termsOfUse.svg";
import shippingAndReturnsIcon from "@/Images/legal-and-more/shippingAndReturns.svg";
import cookiePolicyIcon from "@/Images/legal-and-more/cookiePolicy.svg";
import aboutUsIcon from "@/Images/legal-and-more/aboutUs.svg";
// import becomePartnerIcon from "@/Images/legal-and-more/becomePartner.svg";
import upRightArrowIcon from "@/Images/legal-and-more/upRightArrow.svg";



const LegalPoliciesAndMoreSection = () => {

  return (
    <article className={"relative overflow-x-hidden overflow-y-visible scroll-smooth max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 "+plus_jakarta_sans.className}>

      <PageBackButton/>
      
      <main className="relative">

        {/* legal section */}
        <h4 className="heading-4 custom-text-grey900 font-semibold pt-6 pl-4 pb-5 border-b-[0.5px] custom-border-grey900">
          Legal
        </h4>
        <AccountButton href="/my-account/legal-policies-and-more/privacy-policy/" buttonIcon={privacyPolicyIcon} buttonName="Privacy Policy"/>
        <AccountButton href="/my-account/legal-policies-and-more/terms-of-use" buttonIcon={termsOfUseIcon} buttonName="Terms of Use"/>
        <AccountButton href="/my-account/legal-policies-and-more/shipping-return-refund" buttonIcon={shippingAndReturnsIcon} buttonName="Shipping & Returns"/>
        <AccountButton href="/my-account/legal-policies-and-more/cookies-policy" buttonIcon={cookiePolicyIcon} buttonName="Cookie Policy"/>

        {/* more section */}
        <h4 className="heading-4 custom-text-grey900 font-semibold pt-10 pl-4 pb-5 border-b-[0.5px] custom-border-grey900">
          More
        </h4>
        <AccountButton href="https://payppy.co/payppy-india" buttonIcon={aboutUsIcon} buttonName="About us" buttonIcon2={upRightArrowIcon} arrowIcon={false}/>
        {/* <AccountButton href="#" buttonIcon={becomePartnerIcon} buttonName="Become Partner" buttonIcon2={upRightArrowIcon} arrowIcon={false}/> */}

      </main>

      <footer className=" w-full">
        {/* FAQS section */}
        <ReadFaqSection/>
      </footer>
      
    </article>
  );
};

export default LegalPoliciesAndMoreSection;
