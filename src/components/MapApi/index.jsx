import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';



const MapApi = (titleCountry) => {

	{
		return (<>

			<YMaps>

				<Map width="100%"
					defaultState={{
						center: [titleCountry.xСoordinate, titleCountry.yСoordinate],
						zoom: 3,
						controls: ["zoomControl", "fullscreenControl"],
					}}
					modules={["control.ZoomControl", "control.FullscreenControl"]}

				>
					<Placemark defaultGeometry={[titleCountry.xСoordinate, titleCountry.yСoordinate]} />
				</Map>

			</YMaps>
		</>);
	}


};

export default MapApi