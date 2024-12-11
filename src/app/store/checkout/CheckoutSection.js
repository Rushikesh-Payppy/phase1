'use client';

import Image from 'next/image';

//section images
import CloseIcon from '@/Images/Store/close-icon.svg';
import UserIcon from '@/Images/Checkout/user-circle.svg';
import Location from '@/Images/Checkout/location.svg';
// import EditIcon from '@/Images/Checkout/edit-icon.svg';
import Offer from '@/Images/Checkout/Offer.svg';
import Arrow from '@/Images/Checkout/chevron-icon.svg';
import Availability from '@/Images/Checkout/Availability.svg';

//order details
import Subtract from '@/Images/Checkout/Subtract.svg';


//bottom checkout images
import Store from '@/Images/Homepage/store-icon.svg';


function CheckoutSection() {



    return (
        <>
            <section className={"flex justify-center min-h-screen w-full background-custom-grey50    "  }>
                <div className="page-center-parent-container  small-border background-custom-grey100 overflow-y-scroll overflow-scrollbar-hidden ">


                    {/* navbar  */}
                    <div className="flex items-center justify-between py-3.5 px-4 background-custom-white">
                        <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                        <h4 className="heading-h4 custom-text-grey900">Review & Pay</h4>
                    </div>


                    {/* contatct details */}
                    <div className="background-custom-white py-7 px-6 flex gap-2 justify-start items-start small-border-top custom-border-grey800">
                        <Image src={UserIcon} width={20} height={20} alt="img" quality={100} className="" />
                        <div className="flex flex-col gap-2 ">
                            <div className="all-caps-12 custom-text-grey900">Contact Details</div>
                            <div className="flex flex-col gap-1">
                                <div className="body-sm-bold custom-text-grey900">Omkar Ghodke</div>
                                <div className="flex items-center gap-2">
                                    <div className="body-sm-bold custom-text-grey900">+91 84468 89928</div>
                                    <div className=" w-[0.5px] h-[18px] background-custom-grey900"></div>
                                    <div className="body-sm-bold custom-text-grey900">omkr888@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Shipping details */}
                     <button className="background-custom-white w-full py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        <div className="flex items-center gap-2 ">
                            <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="all-caps-12 custom-text-grey900">Add Address</div>
                        </div>
                        <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                    </button>
                     {/* <div className="background-custom-white py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        
                        <div className="flex gap-2  items-start">
                        <Image src={Location} width={20} height={20} alt="img" quality={100} className="" />
                        <div className="flex flex-col gap-2 ">
                            <div className="all-caps-12 custom-text-grey900">Shipping to</div>
                            <div className="flex flex-col gap-1">
                                <div className="body-sm-bold custom-text-grey900">Omkar Ghodke</div>
                                    <div className="body-sm-bold custom-text-grey900">Flat 2301/B, Sagar Society, Maharshi Road.
                                    <br />Pune, Maharashtra, 411028</div>
                                </div>
                            </div>
                        </div>

                        <Image src={EditIcon} width={20} height={20} alt="img" quality={100} className="" />
                    </div> */}

                     {/* Apply coupon code details */}
                     <button className="background-custom-white w-full py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        <div className="flex items-center gap-2 ">
                            <Image src={Offer} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="all-caps-12 custom-text-grey900">Apply coupon code</div>
                        </div>
                        <Image src={Arrow} width={20} height={20} alt="img" quality={100} className="" />
                    </button>

                    {/* Delivery details */}
                    <div className="background-custom-white py-7 px-6 flex gap-2 justify-between items-start small-border-top custom-border-grey800">
                        <div className="flex items-center gap-2 ">
                            <Image src={Availability} width={20} height={20} alt="img" quality={100} className="" />
                            <div className="body-sm-bold custom-text-grey900">Expected Delivery:  3-5 Days</div>
                        </div>
                    </div>


                    <div className="p-6 pt-8 background-custom-grey100 relative ">
                        <Image src={Subtract} width={524} height={29} alt="img" quality={100} className="w-full object-cover absolute left-0 -top-2 z-[1]" />

                        
                        <div className="flex flex-col gap-4  ">
                                <button className="py-[5px] px-2 flex items-center gap-1 ">
                                    <Image src={Store} width={20} height={20} alt="img" quality={100} className="" />
                                    <div className="all-caps-12 custom-text-grey900">Order Summary</div>
                                </button>
                            <div className="flex flex-col gap-2 py-4 px-6">
                                <div className="flex justify-between">
                                    <div className="all-caps-10 custom-text-grey900">Subtotal:</div>
                                        <div className="all-caps-12-bold custom-text-grey800">₹1299</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="all-caps-10 custom-text-grey900">Shipping:</div>
                                    <div className="all-caps-10-bold custom-text-grey900">FREE</div>                                   
                                </div>
                            </div>
                          

                            <div className="px-6">
                                <div className="custom-text-grey900 small-border custom-border-grey800 border-dashed  "></div>
                            </div>

                            <div className="flex justify-between  px-6">
                                <div className="all-caps-12 custom-text-grey900">Total</div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <div className="flex items-center ">
                                        <div className="all-caps-12-bold custom-text-grey800">₹1299</div>
                                    </div>   
                                    <div className="all-caps-10 custom-text-grey900">GST INCLUDED</div>
                                </div>                                   
                            </div>

                            <div className="flex flex-col">
                                <button className="text-center all-caps-12-bold background-custom-grey900 custom-text-white px-5 py-4">Proceed to Pay</button>
                            </div>
                      
                    </div>

                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default CheckoutSection;

