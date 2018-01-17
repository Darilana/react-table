import React from 'react'
import MyMap from './MyMap'

const AboutUs = () => (
    <div>
        <MyMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7mvCqVEORmN9sP9xLPKsmag1yqbltU3E&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
        <div className='container about-us'>
            <h2>Join Us!</h2>
            <p>
                If you want to become a member of our fast-growing company, you are welcome to visit us. Also you can contact us via email admin@example.com
            </p>
        </div>
    </div>
);

export default AboutUs;