'use client'
import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import {Wrapper} from "@googlemaps/react-wrapper";
import Loading from "@/components/Loading";
import {$api} from "@/api/interceptors";
import {API_URL} from "@/config/constants";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

type Polygons = {
    green: google.maps.LatLngLiteral[]
    blue: google.maps.LatLngLiteral[]
    red: google.maps.LatLngLiteral[]
    out: google.maps.LatLngLiteral[]
}

const GoogleMap = ({}) => {


    // return (
    //     <>
    //         <Image
    //             src={'/image/googlemaps.png'}
    //             as={NextImage}
    //             classNames={{wrapper:"static"}}
    //             alt={'google map'}
    //             fill={true}
    //         />
    //     </>
    // )

    return (
        <div className="w-full">
            <GoogleMapWrapper/>
        </div>
    )
}


export const GoogleMapWrapper: FC = () => {

    const render = useCallback(() => {
        return <Image
            src={'/image/googlemaps.png'}
            as={NextImage}
            classNames={{wrapper:"static"}}
            alt={'google map'}
            fill={true}
        />
        // return <Loading/>
    }, [])


    return (
        <Wrapper apiKey={'AIzaSyCV0fBkbJmgubUPUN-LkTegaI0ORMD9UNU'} libraries={['maps', 'marker']} render={render}>
            <Map center={{lat: 46.45926785266148, lng: 30.744147497020485}} zoom={16}/>
        </Wrapper>
    )
}

const Map = ({center, zoom}: { center: google.maps.LatLngLiteral, zoom: number }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initializeMarker = async (map: google.maps.Map) => {
            const {Marker} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            new Marker({
                map: map,
                position: center,
                title: 'Канатна, 112, каб А-109, Одеса, Україна'
            });
        };

        if (ref.current) {
            const map = new window.google.maps.Map(ref.current, {
                center,
                zoom,
                mapTypeControl: false,
                mapTypeId: 'terrain',
                disableDefaultUI: true
            });

            initializeMarker(map);
        }
    });


    return <div className="h-[600px] grayscale-[75%]" ref={ref} id="map"></div>
}

export default GoogleMap;