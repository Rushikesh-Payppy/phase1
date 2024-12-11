'use client';
import React from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//components
import AccountButton from "@/Components/AccountButton";
import AccountCopyrightSection from "@/Components/AccountCopyrightSection";
import StoreFooter from '@/Components/StoreFooter';

//icons
import orderIcon from "@/Images/account/order.svg";
import settingIcon from "@/Images/account/setting.svg";
import helpIcon from "@/Images/account/help.svg";
import policyIcon from "@/Images/account/policy.svg";


const MyAccountSection = () => {

  return (
    <>
      <article className={"max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 overflow-x-hidden overflow-y-visible scroll-smooth " + plus_jakarta_sans.className }>
       {/* hero section */}
        <header className="border-b-[0.5px] custom-border-grey800">
          <Link href="#">
            <div className="gap-6 mt-4 mx-4 rounded-tl-xl rounded-tr-xl border-t-[0.5px] border-r-[0.5px]  border-l-[0.5px] custom-border-grey800 background-custom-grey100 h-[235px] flex justify-center items-center">
              
              {/* User Section */}
              <section className="gap-2 flex flex-col items-center ">
                  <h2 className="heading-h2 custom-text-grey900 ">
                    Omkar Ghodke
                  </h2>

                  <section className="flex items-center justify-center pt-1">
                    <div className=" h-[1px] w-2 background-custom-grey600 mr-1 "></div>
                    <p className="all-caps-10-bold custom-text-grey600">
                      WELCOME TIER
                    </p>
                    <div className=" h-[1px] w-2 background-custom-grey600 ml-1 "></div>
                  </section>
              </section>
            </div>
          </Link>
        </header>

        {/* main section */}
        <main className=" flex flex-col items-center w-full">
          <AccountButton href="#" buttonIcon={orderIcon} buttonName="my orders" />
          <AccountButton href="/my-account/settings-and-activity" buttonIcon={settingIcon} buttonName="Settings & Activity" />
          <AccountButton href="/my-account/help-and-faq" buttonIcon={helpIcon} buttonName="Help & Support"  />
          <AccountButton href="/my-account/legal-policies-and-more" buttonIcon={policyIcon} buttonName="Legal Policies & More" />
        </main>

        {/* footer section */}
        <footer className=" gap-10 pt-12 px-6 pb-10 flex flex-col items-center w-full ">
    
          <AccountCopyrightSection />
         
          <button type="button" className=" py-3 px-6 border-[0.5px] custom-border-grey800 all-caps-10-bold custom-text-grey900 w-full" >
            Logout
          </button>

          <StoreFooter/>

        </footer>

      </article>
    </>
  );
};

export default MyAccountSection;
