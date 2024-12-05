'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";


//icons
import closeIcon from "@/Images/Store/close-icon.svg";
import { useRouter } from "next/navigation";

const PageCloseButton = () => {
  let router=useRouter();

  function handleCloseButtonClick()
  {
    router.back();
  }
  return (
    <div className=" w-full gap-[71px] pl-4 py-3 background-custom-grey50">
      <button onClick={handleCloseButtonClick}>
        <Image src={closeIcon} width={24} height={24} alt="img" quality={100} />
      </button>

    </div>
  );
};

export default PageCloseButton;
