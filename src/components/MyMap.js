import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMap = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: 49.987673, lng: 36.230755 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: 49.987673, lng: 36.230755 }} />}
        </GoogleMap>
    )
);

export default MyMap;