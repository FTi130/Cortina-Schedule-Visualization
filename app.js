/* global window */
import React, {useState, useEffect} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import {PolygonLayer} from '@deck.gl/layers';
import {TripsLayer} from '@deck.gl/geo-layers';

import ClockExample from './clock'

import Progress from "./bar";

// Source data CSV
const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS: 'Calalzo-Cortina-Old.json' // eslint-disable-line
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0  // 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const material = {
  ambient: 0.8,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  longitude: 12.415,
  latitude: 46.515,
  zoom: 11.1,
  pitch: 45,
  bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const landCover = [[[-74.0, 40.7], [-74.02, 40.7], [-74.02, 40.72], [-74.0, 40.72]]];

export default function App({
  buildings = DATA_URL.BUILDINGS,
  trips = DATA_URL.TRIPS,
  initialViewState = INITIAL_VIEW_STATE,
  trailLength = 15,
  mapStyle = MAP_STYLE,
  theme = DEFAULT_THEME,
  loopLength = 1940, // unit corresponds to the timestamp in source data  1183.8461538461538 if start from 0
    // 1206.923076923077 starting from 20
    // 3078 is one hour if 20 is a minute and the route is 1027 points
    // 20 is one minute
  animationSpeed = 1
}) {
  const [time, setTime] = useState(0);
  const [animation] = useState({});

  const animate = () => {
    setTime(t => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    },
    [animation]
  );

  const layers = [
    // This is only needed when using shadow effects
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      getPolygon: f => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0]
    }),
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: d => d.path,
      getTimestamps: d => d.timestamps,
      getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 2.1,
      widthMinPixels: 2,  // 2
      rounded: true,
      currentTime: time,
      trailLength: 3,
      shadowEnabled: false
    }),
    new PolygonLayer({
      id: 'buildings',
      data: buildings,
      extruded: true,
      wireframe: false,
      opacity: 0.5,
      getPolygon: f => f.polygon,
      getElevation: f => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material
    })
  ];

  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >

      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>

  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
