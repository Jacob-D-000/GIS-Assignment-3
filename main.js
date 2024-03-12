// Project: GIS Assignment 3
// Author: Jacob Dimoff
// Date: 12/3/24
// Filename: templar.cpp
// Purpose: Allows the user to manipulate the open layer map as well as the ability to add and remove layers.

// Import developer defined styles
import './style.css';

// Imports to allow map to render
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';

// Add mouse control mods
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate';

// Allow to add geoJson files as geometry map layers including layer styles
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorSource} from 'ol/source';

// This section allows for styling of geometry layers.
import {Style, Icon, Stroke, Fill} from'ol/Style';

// Function to check that changes the layers on the map if a check box has been changed
function checkLayers(checkBoxes, radioButtons, storeLyer, placeLyer, map, basemap1, basemap2) {
	// Remove all layers off the map
	map.getLayers().forEach(layer=>{
		map.removeLayer(layer)
	})

	// Check the radio buttons to determine what map is used as the base
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

	// This section determines which layers should be added based on which buttons are checked
	checkBoxes.forEach(checkBox =>{	
		if (checkBox.checked) {
			if (checkBox.id == "pointsLayer") {
				map.addLayer(storeLyer);
			} else if (checkBox.id == "polyLayer") {
				map.addLayer(placeLyer);
			}
		}
	})
}

// Function run on loading of the page
function main() {

	// Initialize base maps to be used on the page.
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

	// This section contains data to create a point vector layer including a data set and styling
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

	// This section contains data to create a polygon vector layer including a data set and styling
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

	// Initialize a map object starting with the layer zoomed in to the middle of halifax
	const map = new Map({
		target: 'map',
		view: new View({
			center: olProj.fromLonLat([-63.5873587475, 44.6485214089]),
			zoom: 13
		})
	});

	// Create a variable that stores all radio buttons
	let radioButtons = document.querySelectorAll(".radiobtn")

	// Create a variable that stores all check boxes
	let checkBoxes = document.querySelectorAll(".checkbtn");
	
	// Call this function on the website loading to populate the pages map with the default values (should be basemap1 only)
 	checkLayers(checkBoxes, radioButtons, storeLyer, placeLyer, map, basemap1, basemap2)

	// Give each radio button the checkLayers function as an event when they are clicked on
	radioButtons.forEach(radioButton=>{
		radioButton.addEventListener('click', function(){			
	 		checkLayers(checkBoxes, radioButtons, storeLyer, placeLyer, map, basemap1, basemap2)
		})
	})

	// Give each check box the checkLayers function as an event when one of the check boxes is changed
	checkBoxes.forEach(checkBox => {
		checkBox.addEventListener('change', function() {
		 	checkLayers(checkBoxes, radioButtons, storeLyer, placeLyer, map, basemap1, basemap2)
		})
	})

	// Create a mouse position to show where the mouse is on the map using coordinates
	const mousePositionControl = new MousePosition({
		coordinateFormat: createStringXY(2),
		projection: 'EPSG:4326',
		target: document.getElementById('mousePosition'),
	});

	// Add the mouse button to the page
	map.addControl(mousePositionControl)

	// Section styles the generated mouse position element
	const mousePositionElement = document.querySelector('.ol-mouse-position');
	if (mousePositionElement) {
		mousePositionElement.style.position = 'relative'
	}
}

// Call main in the file, causing it to be run when the html page is loaded
main()