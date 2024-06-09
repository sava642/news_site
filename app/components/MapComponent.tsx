'use client'
import { useRef, useEffect } from "react";

const MapComponent = () => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (mapRef.current && window.google) {
			new window.google.maps.Map(mapRef.current, {
				center: { lat: 52.2296756, lng: 21.0122287 },
				zoom: 12,
			});
		}
	}, []);

	return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;