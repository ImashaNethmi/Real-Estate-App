"use client"
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'



function AddNewListing() {
    const [selectedAddress, setSelectedAddress] = useState();
    const [coordinates, setCoordinates] = useState();
    const { user } = useUser();
    const [loader, setLoader] = useState(false);

    const nextHandler = async () => {
        setLoader(true)


        const { data, error } = await supabase
            .from('listing')
            .insert([
                {
                    address: selectedAddress.label,
                    coordinates: coordinates,
                    createdBy: user?.primaryEmailAddress.emailAddress
                },
            ])
            .select()

        if (data) {
            setLoader(false)
            console.log("New Data added,", data);
            toast("New Address added for lisitng")
        }
        if (error) {
            setLoader(false)
            console.log('error');
            toast("Server side error");
        }

    }
    return (

        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className='p-10 flex flex-col gap-5 items-center justify-center'>
                <h2 className='font-bold text-2xl'>Add New Listing</h2>

                <div className='p-5 rounded-lg border w-full shadow-md flex flex-col gap-5 '>
                    <h2 className='text-gray-500'>Enter Address which oyu want to list </h2>
                    <GoogleAddressSearch
                        selectedAddress={(value) => selectedAddress(value)}
                        setCoordinates={(value) => setCoordinates(value)}

                    />
                    <Button disabled={!selectedAddress || !coordinates}
                        onClick={nextHandler}
                    >/
                        {loader ? <Loader className='animate-spin' /> : 'Next'}

                        Next</Button>


                </div>
            </div>
        </div>
    )
}

export default AddNewListing