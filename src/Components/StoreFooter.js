
import Image from 'next/image';
import Link from 'next/link';

//images
import Arrow from '@/Images/Store/footer-arrow.svg';
import Search from '@/Images/Store/footer-search.svg';
import Shop from '@/Images/Store/footer-shop.svg';


function StoreFooter()
{
    return(
        <>
        <footer className="flex items-center justify-between py-2.5 px-4 sticky bottom-0 left-0 background-custom-grey100 w-full small-border custom-border-grey800">
            <div className="flex justify-center relative w-full">
                <Image src={Arrow} width={20} height={20} alt='img' quality={100} className='absolute left-0' />
                <div className="flex items-center gap-12">
                    <Image src={Search} width={20} height={20} alt='img' quality={100} className='' />
                    <div className="custom-text-grey800 text-[10px] leading-3">MENU</div>
                    <Image src={Shop} width={20} height={20} alt='img' quality={100} className='' />
                </div>
            </div>
        </footer>
        </>
    )
}

export default StoreFooter;