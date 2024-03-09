import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import StadiaMaps from 'ol/source/StadiaMaps.js';

// add mouse control mods
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorSource} from 'ol/source';

import {Style, Icon, Stroke, Fill} from'ol/Style';


const mousePositionControl = new MousePosition({
	coordinateFormat: createStringXY(10),
	projection: 'EPSG:4326',
	// comment the following two lines to have the mouse position
	// be placed within the map.
	// className: 'custom-mouse-position',
	target: document.getElementById('mouse-position'),
  });

function addgeoLayers(map, storeLyer, placeLyer) {
	map.addLayer(storeLyer)
	map.addLayer(placeLyer)
}

function changeMap(map, basemap1, basemap2) {
	this.parentNod
}

function main() {
	let basemap1 = new TileLayer({
		source: new OSM({
			"url":"https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
		})
	})
	
	let basemap2 = new TileLayer({
		source: new OSM({
			"url": "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
		})
	})

	const map = new Map({
		target: 'map',
		layers: [
		  basemap1
		],
		view: new View({
		  center: olProj.fromLonLat([-63.5873587475, 44.6485214089]),
		  zoom: 13
		})
	});

	let storeStyle = new Style({
		image: new Icon({
			src: 'img/book.png',
			scale: 0.03
		})
	})

	let storesFile = "geoJson/stores.geojson"

	let storeLyer = new VectorLayer({
		source: new VectorSource({
			url: storesFile,
			format: new GeoJSON()
		}),
		style: storeStyle
	});

	let placeStyle = new Style({
		stroke: new Stroke({
			color: 'black',
			width: 1
		}),
		fill: new Fill({
			color: 'green'
		})
	})

	let placeFile = "geoJson/places.geojson"

	let placeLyer = new VectorLayer({
		source: new VectorSource({
			url: placeFile,
			format: new GeoJSON()
		}),
		style: placeStyle
	});

	let radioButtons = document.querySelectorAll(".radiobtn")
	radioButtons.forEach(radioButton=>{
		radioButton.addEventListener('click', function(){
			radioButtons.forEach(rb=> {
				let selectedId
				if (rb.checked) {
					selectedId = rb.id
				}
				if (selectedId == "map1") {
					map.setLayers([basemap1])
				} else if (selectedId == "map2") {
					map.setLayers([basemap2])
				}
			})
		})
	})


	let checkBoxes = document.querySelectorAll(".checkbtn");

	checkBoxes.forEach(checkBox => {
		checkBox.addEventListener('change', function() {
			if (checkBox.checked) {
				if (checkBox.id === "pointsLayer") {
					map.addLayer(storeLyer);
				} else if (checkBox.id === "polyLayer") {
					map.addLayer(placeLyer);
				}
			} else {
				if (checkBox.id === "pointsLayer") {
					map.removeLayer(storeLyer);
				} else if (checkBox.id === "polyLayer") {
					map.removeLayer(placeLyer);
				}
			}
		});
	});
	



	map.addControl(mousePositionControl)
	
	// addgeoLayers(map, storeLyer, placeLyer)
}




main()