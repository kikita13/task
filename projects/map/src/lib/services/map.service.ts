import { Injectable } from '@angular/core';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  drawPolygon(draw: MapboxDraw) {
    draw.changeMode('draw_polygon');
  }

  deletePolygon(draw: MapboxDraw) {
    draw.delete(draw.getSelectedIds());
  }

  choosePolygon(draw: MapboxDraw) {
    draw.changeMode('simple_select');
  }

  editPolygon(draw: MapboxDraw) {
    const selected = draw.getSelectedIds();

    draw.changeMode('direct_select', {
      featureId: selected[selected.length - 1],
    });
  }

  deleteAllPolygon(draw: MapboxDraw) {
    draw.deleteAll();
  }
}
