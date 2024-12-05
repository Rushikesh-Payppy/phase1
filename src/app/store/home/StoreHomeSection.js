'use client';
import StoreFooter from '@/Components/StoreFooter';
import Image from 'next/image';
import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useEffect, useState } from 'react';

//hero section images
import Homepage from '@/Images/Homepage/homepage-img.jpg';
import PayppyStoreLogo from '@/Images/Store/Payppy-Store-Logo.svg';




//filter section images
import SingleViewFilter from '@/Images/Store/single-view-filter.svg';
import SingleViewActiveFilter from '@/Images/Store/single-view-active-filter.svg';

import MultiViewFilter from '@/Images/Store/multi-view-filter.svg';
import MultiViewActiveFilter from '@/Images/Store/multi-view-active-filter.svg';

import StoreImgAndClothsCompo from '@/Components/StoreImgAndClothsCompo';
import ClothsHorizontalCarousel from '@/Components/ClothsHorizontalCarousel';
import StoreProductsListApi from '@/apis/store/StoreProductsListApi';
import LoadingAnimation from '@/app/auth/LoadingAnimation';
import ClothsImgInfoCompo from '@/Components/ClothsImgInfoCompo';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
function StoreHomeSection()
{

    let[gridColums,setGridColumns]=useState(2);
    let[products,setProducts]=useState([]);

    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    useEffect(()=>{
        FetchProducts();
    },[])

    //get access token intially
    useEffect(()=>{
        getAccessToken();
    },[])

    let query='?region_id=reg_01JDPJAQ0EV727HP0MPZH1NZA9';
    function FetchProducts()
    {
        StoreProductsListApi(query)
        .then((response)=>{
            console.log(response);
            setProducts(response?.products);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    
    function getAccessToken()
    {
        setGettingAccessToken(true);
        GetAccessTokenAPI()
        .then((response)=>{
            console.log('access token :',response);
            // Refresh token is missing
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally()
        {
            setGettingAccessToken(false);
        }
    }
    return(
        <>
       {gettingAccessToken?
                <IntialLoadingAnimation/>
       : <main className={"w-full h-screen flex justify-center background-custom-grey50 overflow-hidden "+plus_jakarta_sans.className}>
            <div className="page-center-parent-container  overflow-y-scroll relative overflow-scrollbar-hidden">
            
            {/* hero section  */}
            <section className="h-[50%] relative flex justify-center items-start py-8 ">
                <Image src={Homepage} width={400} height={675} alt='img' quality={100} className='w-full h-full absolute z-0 object-cover top-0 left-0' />
                <Image src={PayppyStoreLogo} width={290} height={36} alt='img' quality={100} className='z-[1] ' />

            </section>



            {/* filter section  */}

            <section className="py-4 px-5 small-border-x small-border-top  custom-border-grey800 flex justify-between items-cneter  background-custom-white">
                <div className="flex items-center gap-5">
                    <button className="all-caps-10 custom-text-grey800">Men</button>
                    <button className="all-caps-10 custom-text-grey800">Women</button>
                    <div className="background-custom-grey700 h-4 w-[0.5px]"></div>
                    <button className="all-caps-10 custom-text-grey800">FILTER</button>
                </div>
                <div className="flex items-center gap-4 ">
                    <Image src={gridColums==1?SingleViewActiveFilter:SingleViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={()=>{setGridColumns(1)}}/>
                    <Image src={gridColums===2?MultiViewActiveFilter:MultiViewFilter} width={16} height={14} quality={100} alt='img' className='cursor-pointer' onClick={()=>{setGridColumns(2)}}/>
                </div>
            </section>


            {/* grid view section  */}
            <section className={`grid grid-cols-${gridColums} small-border-bottom small-border-x  custom-border-grey800`}>

                {products.length>0&&
                    products.map((element,index)=>{
                        return  <ClothsImgInfoCompo key={index} borderClass={`  small-border-top ${index%2==0&&gridColums===2?' small-border-right ':' '} `} data={element}/>
                    })

                }

            </section>


                <StoreFooter/>
            </div>
        </main>}
        </>
    )
}

export default StoreHomeSection;
