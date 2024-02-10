import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { MapService } from '../public-api';

@Component({
  selector: 'lib-map',
  standalone: true,
  imports: [CommonModule, ToolbarComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  private readonly mapService = inject(MapService);

  private readonly draw = new MapboxDraw({
    displayControlsDefault: true,
    defaultMode: 'simple_select',
  });

  height = 0;
  map!: Map;

  ngOnInit(): void {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [37.5647499, 55.7688429],
      zoom: 17,
      pitch: 40,
      bearing: 20,
      antialias: true,
    });

    map.on('load', () => {
      map.addControl(this.draw);
    });

    map.on('draw.create', (data) => this.createLayer(map, data.features[0]));

    map.on('draw.delete', (data) => this.deleteLayer(map, data.features[0]));

    map.on('draw.update', (data) => this.updateLayer(map, data.features[0]));

    this.map = map;
  }

  drawPolygon() {
    this.mapService.drawPolygon(this.draw);
  }

  deleteAllPolygon() {
    const ids = this.draw.getAll().features.map((item) => item.id);

    this.mapService.deleteAllPolygon(this.draw);

    ids.forEach((item) => this.deleteLayer(this.map, item));
  }

  deletePolygon() {
    const ids = this.draw.getSelectedIds();

    this.mapService.deletePolygon(this.draw);

    ids.forEach((item) => this.deleteLayer(this.map, item));
  }

  choosePolygon() {
    this.mapService.choosePolygon(this.draw);
  }

  editPolygon() {
    this.mapService.editPolygon(this.draw);
  }

  updateLayer(map: Map, features: any) {
    if (!this.height) return;
    this.deleteLayer(map, features);
    this.createLayer(map, features);
  }

  deleteLayer(map: Map, features: any) {
    if (
      !map.getLayer(`layer${features.id || features}`) ||
      !map.getSource(`source${features.id || features}`)
    )
      return;

    map.removeLayer(`layer${features.id || features}`);
    map.removeSource(`source${features.id || features}`);
  }

  createLayer(map: Map, features: any) {
    if (!this.height) return;

    map.addSource(`source${features.id}`, {
      type: 'geojson',
      data: features,
    });

    map.addLayer({
      id: `layer${features.id}`,
      source: `source${features.id}`,
      type: 'fill-extrusion',
      paint: {
        'fill-extrusion-color': ['get', 'color'],
        'fill-extrusion-height': this.height,
        'fill-extrusion-base': ['get', 'base_height'],
        'fill-extrusion-opacity': 0.5,
      },
    });
  }

  setHeight(height: number) {
    this.height = +height;
  }
}
