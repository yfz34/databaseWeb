import React, { Component } from 'react'
// import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import { Vector as VectorLayer} from 'ol/layer';
import OlSourceOSM from "ol/source/OSM";
import TileJSON from 'ol/source/TileJSON';
import OlFormatGeoJSON from 'ol/format/GeoJSON';
import federalStates from './geo/json/federal-states-ger.json';
import {Vector as VectorSource} from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import TileSource from 'ol/source/Tile';
import {Circle as CircleStyle, Fill, Stroke} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
var iconFeature = new Feature({
  geometry: new Point([120.685524, 24.171621]),
  name: 'Taolin1',
  population: 4000,
  rainfall: 500
});

var iconFeature1 = new Feature({
  geometry: new Point([120.985524, 24.971621]),
  name: 'Taolin',
  population: 4000,
  rainfall: 500
});
var iconStyle = new Style({
  image: new Icon({
      anchor: [0, 0],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/200px-Map_marker_font_awesome.svg.png',
      // src: '~/data1/icon.png'
      // imgSize: new olSize(50)
      opacity: 0.75,
      // the real size of your icon
      // size: [100, 100],
      // the scale factor
      scale: 0.3,
      // offset: [0,0]
  })
});

iconFeature.setStyle(iconStyle);
iconFeature1.setStyle(iconStyle);

const format = new OlFormatGeoJSON();
const features = format.readFeatures(federalStates);

var vectorSource = new VectorSource({
  features: [ ...features, iconFeature, iconFeature1]
});

class PublicMap extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        projection: 'EPSG:4326',
        center: [120.3552, 23.65],
        zoom: 8,
        mapSelect: '',
        // source: new OlSourceOSM(),
        olTitle: new TileLayer(new OlSourceOSM()),
        draw: null, 
        snap: null,
        source: vectorSource,
      };

      this.olmap = new OlMap({
        target: null,
        layers: [
          this.state.olTitle,
          new VectorLayer({
            source: this.state.source,
            style: new Style({
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              stroke: new Stroke({
                color: '#ffcc33',
                width: 2
              }),
              image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                  color: '#ffcc33'
                })
              })
            })
          }),
        ],
        view: new OlView({
          projection: this.state.projection,
          center: this.state.center,
          zoom: this.state.zoom
        })
      });

      this.handleChange = this.handleChange.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);
    }

    handleChange = (event) => {
      console.log(event.target.value)
      switch (event.target.value){
        case "OSM":
          this.state.olTitle.setSource(new OlSourceOSM());
        case "TileJSON":
          this.state.olTitle.setSource(new TileJSON({
            url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json',
            crossOrigin: ''
          }))
          break;
        case "XYZ":
          this.state.olTitle.setSource(new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }))
          break;
        default:
          console.log(event.target.value)
      }
    }

    handleChange1 = (event) => {
      console.log(this.state.draw)
      console.log(this.state.snap)
      this.olmap.removeInteraction(this.state.draw);
      this.olmap.removeInteraction(this.state.snap);
      this.addInteractions(event.target.value);
    }

    updateMap() {
      this.olmap.getView().setCenter(this.state.center);
      this.olmap.getView().setZoom(this.state.zoom);
    }
  
    componentDidMount() {
      this.olmap.setTarget("map");
  
      // Listen to map changes
      this.olmap.on("moveend", () => {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        this.setState({ center, zoom });
      });

      var modify = new Modify({source: this.state.source});
      console.log(modify)
      this.olmap.addInteraction(modify);
      this.addInteractions("Point");
    }
  
    shouldComponentUpdate(nextProps, nextState) {

      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      // console.log(center, zoom)
      if (center === nextState.center && zoom === nextState.zoom) return false;
      return true;
    }
  
    userAction() {
      this.setState({  projection: 'EPSG:4326',  center: [120.3552, 23.65], zoom: 8 });
    }

    selectMap(){
      this.state.olTitle.setSource(new OlSourceOSM());
    }

    addInteractions(typeSelect) {
      console.log(typeSelect)
      this.setState({ draw: new Draw({
        source: this.state.source,
        type: typeSelect})
      });
      this.olmap.addInteraction(new Draw({
        source: this.state.source,
        type: typeSelect})
      );
      this.setState({ snap: new Snap({source: this.state.source})});
      this.olmap.addInteraction(new Snap({source: this.state.source}));
    }
    render() {
      this.updateMap();
      return (
        <>
          <div id="map" style={{ width: "100%", height: "700px" }}></div>
          <button onClick={e => this.userAction()}>回到原點</button>
          <button onClick={e => this.selectMap()}>更改底圖</button>
          <form className="form-inline">
            <label>Geometry type &nbsp;</label>
            <select id="type" onChange={this.handleChange1}>
              <option value="Point">Point</option>
              <option value="LineString">LineString</option>
              <option value="Polygon">Polygon</option>
              <option value="Circle">Circle</option>
            </select>
          </form>
          <div>
            <select onChange={this.handleChange}>
              <option value="OSM">OSM</option>
              <option value="TileJSON">TileJSON</option>
              <option value="XYZ">XYZ</option>
            </select>
          </div>
        </>
      );
    }
  }
  
  export default PublicMap;