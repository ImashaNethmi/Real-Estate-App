import { Bath, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import GoogleAddressSearch from './GoogleAddressSearch'
import { Button } from '@/components/ui/button'

function Listing({listing,handleSearchClick,searchedAddress}) {
    const [address,setAddress] =useState();
  return (
    <div>
        <div className='p-3 flex gap-6'>
        <GoogleAddressSearch
        selectedAddress={(v)=>{searchedAddress(v);
            setAddress(v)
        }}
        setCoordinates={(v)=>console.log(v)}
        />
        <Button className="flex gap-2"
        onClick={handleSearchClick}
        >
            <Search className='h-4 w-4'/>
            Search</Button>
        </div>

        {address&&<div className='px-3 my-2'>
           <h2 className='text-xl'>
            Found <span className='font-bold'>{listing?.length}</span>  Result in <span className='text-primary font-bold'>{address?.label}</span>
            </h2>

        </div>}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {listing?.length>0? listing.map((item,index)=>(
                <div key={item.id || index} className='p-3 hover:border hover:border-primary cursor-pointer
                rounded-lg'>
                    <Image src={item.listingimages[0].url}
                    //layout="intrinsic"
                    width={800}
                    height={150}
                    className='rounded-lg object-cover h-[170px]'
                    alt="Listing Image"
                    />
                    <div className='flex mt-2 flex-col gap-2'>
                        <h2 className='font-bold text-xl'>${item?.sellingPrice}</h2>
                        <h2 className='flex gap-2 text-sm text-gray-400'>
                            <MapPin className='h-4 w-4'/>
                            {item.address}</h2>
                            <div className='flex gap-2 mt-2 justify-between'>
                                <h2 className='flex gap-2 text-sm bg-slate-200 
                                rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                                    <BedDouble className='h-4 w-4'/>
                                    {item?.bedroom}
                                </h2>
                                <h2 className='flex gap-2 text-sm bg-slate-200 
                                rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                                    <Bath className='h-4 w-4'/>
                                    {item?.bathroom}
                                </h2>
                                <h2 className='flex gap-2 text-sm bg-slate-200 
                                rounded-md p-2 w-full text-gray-500 justify-center items-center'>
                                    <Ruler className='h-4 w-4'/>
                                    {item?.area}
                                </h2>
                            </div>
                    </div>
                </div>
            ))
            : [1,2,3,4,5,6,7,8].map((item,index)=>(
                <div key={index} className='h-[230px] w-full
                bg-slate-200 animate-pulse rounded-lg'></div>
            ))
            }
        </div>
    </div>
  )
}

export default Listing