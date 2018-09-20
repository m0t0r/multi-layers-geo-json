import { Component, OnInit, ViewChild } from '@angular/core';
import 'leaflet';

declare var L: any;
declare var require: any;

const geojson0 = require('./geojson/layer_0.json');
const geojson1 = require('./geojson/layer_1.json');
const geojson2 = require('./geojson/layer_2.json');
const geojson3 = require('./geojson/layer_3.json');
const geojson4 = require('./geojson/layer_4.json');
const geojson5 = require('./geojson/layer_5.json');
const geojson6 = require('./geojson/layer_6.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  map: any;
  @ViewChild('map') mapRef;

  ngOnInit() {
    this.map = new L.Map(this.mapRef.nativeElement, {
      doubleClickZoom: false,
      zoomSnap: 0.25,
      zoomDelta: 0.25,
      minZoom: -2,
      maxZoom: 7,
      crs: L.CRS.Simple,
      renderer: L.canvas(),
      zoomControl: true,
      attributionControl: false
    });

    this.map.fitBounds([[0, 0], [100, 100]]);

    const data = [
      geojson0.features,
      geojson1.features,
      geojson2.features,
      geojson3.features,
      geojson4.features,
      geojson5.features,
      geojson6.features
    ];

    const colors = [
      '#ffc107',
      '#4caf50',
      '#ff9800',
      '#009688',
      '#00e5ff',
      '#2196f3',
      '#651fff',
      '#e91e63'
    ];

    const layers = data.map((d, i) => {
      return L.geoJSON(d, {
        style: {
          color: colors[i],
        }
      }).addTo(this.map);
    });

    L.control.layers(
      null,
      layers.reduce((acc, curr, i) => {
        const layerName = `Layer ${i}`;
        return {
          ...acc,
          [layerName]: curr
        };
      }, {})
    ).addTo(this.map);
  }
}
