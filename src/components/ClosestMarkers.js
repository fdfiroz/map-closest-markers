'use client';
import { useState, useEffect } from 'react';
import getClosestLocations from '@/utils/getClosestLocations';
import Image from 'next/image';
import restaurant from "../../public/restaurant.json"
import getRestaurantById from '@/utils/getRestaurantById';
import { MdOutlineStarRate } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";



const ClosestMarkers = ({ userLocation, locations }) => {
  const [closestMarkers, setClosestMarkers] = useState([]);

  useEffect(() => {
    const closest = getClosestLocations(userLocation, locations, 200);
    setClosestMarkers(closest);
  }, [userLocation, locations]);

  return (
    <div className='flex flex-col gap-2'>
      {
        closestMarkers.length > 0 ? closestMarkers.map((marker) => {
          const details = getRestaurantById(marker.id, restaurant);
          return (
            <div key={marker.id} className='flex gap-4 justify-around items-center border rounded-xl'>
              <div className="aspect-video object-cover overflow-hidden rounded-xl">
                <Image src={details.img} className="aspect-video object-cover overflow-hidden" alt={marker.name} width={200} height={200} />
              </div>
              <div className="">
                <h3 className='font-semibold'>{marker.name}</h3>
               <div className="inline-flex">
               <p className='flex items-center gap-2'><FaLocationDot className='text-blue-500'/> <span className="text-xs">{marker.distance.toFixed(2)}</span ><span className="text-xs"></span></p>
                {details && (
                  <>
                    <p className='flex items-center p-2'> <span className={`${details.takeaway ? "bg-green-500": "bg-red-600"}`}>{details.takeaway ? <MdDone/> : <RxCross2/> }</span> <span className="text-xs">Take-way</span> </p>
                    <p className='flex items-center p-2'> <span className={`${details.dinein ? "bg-green-500": "bg-red-600"}`}>{details.dinein ?  <MdDone/> : <RxCross2/>}</span><span className="text-xs">Dine-in</span> </p>
                  </>
                )}
               </div>
                <span className='flex items-center'><MdOutlineStarRate className="text-yellow-400" /> <span className="text-xs">{details.rating}</span></span>
              </div>
            </div>
          );
        }) : <div>No markers found</div>
      }
    </div>
  );
};

export default ClosestMarkers;
