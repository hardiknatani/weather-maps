const MapboxDraw = require('@mapbox/mapbox-gl-draw');
const circle = require('@turf/circle').default;

const CircleMode = {...MapboxDraw.modes.draw_polygon};
const DEFAULT_RADIUS_IN_KM = 2;

CircleMode.onSetup = function(opts) {
  const polygon = this.newFeature({
    type: MapboxDraw.constants.geojsonTypes.FEATURE,
    properties: {
      isCircle: true,
      center: []
    },
    geometry: {
      type: MapboxDraw.constants.geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });

  this.addFeature(polygon);

  this.clearSelectedFeatures();
  MapboxDraw.lib.doubleClickZoom.disable(this);
  this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD });
  this.activateUIButton(MapboxDraw.constants.types.POLYGON);
  this.setActionableState({
    trash: true
  });

  return {
    initialRadiusInKm: opts.initialRadiusInKm || DEFAULT_RADIUS_IN_KM,
    polygon,
    currentVertexPosition: 0
  };
};

CircleMode.clickAnywhere = function(state, e) {
  if (state.currentVertexPosition === 0) {
    state.currentVertexPosition++;
    const center = [e.lngLat.lng, e.lngLat.lat];
    const circleFeature = circle(center, state.initialRadiusInKm);
    state.polygon.incomingCoords(circleFeature.geometry.coordinates);
    state.polygon.properties.center = center;
    state.polygon.properties.radiusInKm = state.initialRadiusInKm;
  }
  return this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
};

export default CircleMode 