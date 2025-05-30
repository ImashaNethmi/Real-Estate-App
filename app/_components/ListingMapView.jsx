"use client"
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner';

function ListingMapView({type}) {

    const[listing,setListing]=useState([]);

    useEffect(()=>{
        getLatestListing();
    },[])

    const getLatestListing =async()=>{
        const {data,error}=await supabase
        .from('listing')
        .select(`*,listingimages(
            url,
            listing_id
            )`)
            .eq('active',true)
            .eq('type',type)
            .order('id',{ascending:false})

            if(data)
            {
                setListing(data);
            }
            if(error)
            {
                toast('Server Side Error');
            }
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
            <Listing listing={listing}/>
        </div>
        <div>
            Map
        </div>

    </div>
  )
}

export default ListingMapView