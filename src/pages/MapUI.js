import React, { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, CircleMarker} from 'react-leaflet';

export default function MapUI() {
    const [errorText, setErrorText] = useState("Laden...")
    const [positionLoaded, setPositionLoaded] = useState(false)
    const [lat, setLat] = useState()
    const [long, setLong] = useState()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locationReceived, errorGettingLocation, {
                enableHighAccuracy: true
            })
        }
    }, [])

    if (!positionLoaded) {
        return <div>{errorText}</div>
    } else {
        return (
            <div className={"map"}>
                <MapContainer center={[lat, long]} zoom={17} style={{height: "100%", width: "100%"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <CircleMarker center={[lat, long]}/>
                    <Marker position={[lat + 0.002, long - 0.003]}/>
                </MapContainer>
            </div>
        )
    }

    function locationReceived(location) {
        setLat(location.coords.latitude)
        setLong(location.coords.longitude)
        setPositionLoaded(true)
    }

    function errorGettingLocation(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
            setErrorText("Keine Berechtigung für die Standortabfrage")
            break;
        case error.POSITION_UNAVAILABLE:
            setErrorText("Standort nicht verfügbar")
            break;
        case error.TIMEOUT:
            setErrorText("Standortermittlung dauert zu lange")
            break;
        default:
            setErrorText("Unbekannter Fehler")
            break;
        }
    }
}
