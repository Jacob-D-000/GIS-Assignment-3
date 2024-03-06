import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import StadiaMaps from 'ol/source/StadiaMaps.js';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const mousePositionControl = new MousePosition({
	coordinateFormat: createStringXY(2),
	projection: 'EPSG:4326',
	// comment the following two lines to have the mouse position
	// be placed within the map.
	// className: 'custom-mouse-position',
	target: document.getElementById('mouse-position'),
  });

map.addControl(mousePositionControl)