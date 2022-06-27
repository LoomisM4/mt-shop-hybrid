import React, { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, CircleMarker} from 'react-leaflet';

export default function MapUI() { // 1
    const [errorText, setErrorText] = useState("Laden...") // 2
    const [positionLoaded, setPositionLoaded] = useState(false) // 2
    const [lat, setLat] = useState() // 2
    const [long, setLong] = useState() // 2

    useEffect(() => { // 1
        if (navigator.geolocation) { // 2
            navigator.geolocation.getCurrentPosition(locationReceived, errorGettingLocation, { // 2
                enableHighAccuracy: true // 1
            })
        }
    }, [])

    if (!positionLoaded) { // 2
        return <div>{errorText}</div> // 2
    } else { // 1
        return ( // 1
            <div className={"map"}> <!-- 2 -->
                <MapContainer center={[lat, long]} zoom={17} style={{height: "100%", width: "100%"}}> <!-- 6 -->
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> <!-- 2 -->
                    <CircleMarker center={[lat, long]}/> <!-- 2 -->
                    <Marker position={[lat + 0.002, long - 0.003]}/> <!-- 4 -->
                </MapContainer>
            </div>
        )
    }

    function locationReceived(location) { // 1
        setLat(location.coords.latitude) // 3
        setLong(location.coords.longitude) // 3
        setPositionLoaded(true) // 1
    }

    function errorGettingLocation(error) { // 1
        switch (error.code) { // 2
            case error.PERMISSION_DENIED: // 2
            setErrorText("Keine Berechtigung für die Standortabfrage") // 1
            break; // 1
        case error.POSITION_UNAVAILABLE: // 2
            setErrorText("Standort nicht verfügbar") // 1
            break; // 1
        case error.TIMEOUT: // 2
            setErrorText("Standortermittlung dauert zu lange") // 1
            break; // 1
        default: // 1
            setErrorText("Unbekannter Fehler") // 1
            break; // 1
        }
    }
}

// 63
