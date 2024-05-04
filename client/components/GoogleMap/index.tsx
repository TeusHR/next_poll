'use client'
import React, {FC, memo, useCallback, useEffect, useRef} from 'react'
import {Wrapper} from "@googlemaps/react-wrapper";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

const GoogleMap: FC<{ apiKey: string }> = memo(function GoogleMap({apiKey}) {

    return (
        <div className="w-full">
            <GoogleMapWrapper apiKey={apiKey}/>
        </div>
    )
})

export const GoogleMapWrapper: FC<{ apiKey: string }> = ({apiKey}) => {

    const render = useCallback(() => {
        return <Image
            src={'/image/googlemaps.png'}
            as={NextImage}
            classNames={{wrapper: "static"}}
            alt={'google map'}
            fill={true}
        />
        // return <Loading/>
    }, [])


    return (
        <Wrapper apiKey={apiKey} libraries={['maps', 'marker']} render={render}>
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
