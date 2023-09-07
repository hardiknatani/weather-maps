import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { IControl, GeoJSONSource, Map } from 'maplibre-gl';
import { API_KEY, basemaps, borderAndAreasLayers, colormaps, weatherLayerColors } from './shared/map.common';
import { environment } from '../environments/environment';
import { TileUtils } from './shared/tileutils';
import { WindLayer, ScalarFill } from  '@sakitam-gis/mapbox-wind'
import { S3Service } from './shared/s3Service/s3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit,OnDestroy {
  map: Map ;

  @ViewChild('map', { static: true }) private mapContainer!: ElementRef<HTMLElement>;
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  selectedTab:any;
  // @BlockUI() blockUI: NgBlockUI;
  mapControls: any;
  showFiller = false;
  selectedConfigLayer:any = null;
  basemaps = basemaps;
  borderAndAreasLayers = borderAndAreasLayers;
  colormaps=colormaps;
  selectedColorramp = new FormControl('Default')
  API_KEY = environment.maptilerApiKey;
  bufferRadius=new FormControl()
  layersStyle: any
showControls=false
currentDate=new FormControl();

windLayer:WindLayer = new WindLayer('wind', {}, {
  wrapX:true,
  windOptions: {
    colorScale: [
      "rgb(255,255,255)"
    ],
    paths: 5000,
    frameRate: 16,
    maxAge: 60,
    globalAlpha: 0.9,
    velocityScale: 0.01,
    
  }
});

// fillLayer:any = new ScalarFill('wind-fill', {
//   "type": "image",
//   "url": 'https://sakitam.oss-cn-beijing.aliyuncs.com/codepen/wind-layer/image/var_ugrd-var_vgrd.png',
//   "extent": [
//     [-180, 85.051129],
//     [-180, -85.051129],
//     [180, 85.051129],
//     [180, -85.051129],
//   ],
//   "width": 1440,
//   "height": 720,
//   "uMin": -21.34380340576172,
//   "uMax": 30.7261962890625,
//   "vMin": -23.916271209716797,
//   "vMax": 24.693727493286133,
  
// }, {
//   styleSpec: {
//     'fill-color': [
//       'interpolate',
//       ['linear'],
//       ['get', 'value'],
//       ...arr
//     ],
//     'opacity': [
//       'interpolate',
//       ['exponential', 0.5],
//       ['zoom'],
//       5,
//       1,
//       8,
//       1
//     ],
//   },
//   renderForm: 'rg',
//   // widthSegments: 720,
//   // heightSegments: 360,
//   widthSegments: 1,
//   heightSegments: 1,
//   displayRange: [0, 150],
//   mappingRange: [0, 100000],
// },
// );

interval:any;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private bottomSheet: MatBottomSheet, private http: HttpClient,private s3Service:S3Service) { ; }


  getBoundsFromTitler(layer){
    let url = `${environment.titiler_base_url}/mosaicjson/bounds?url=${layer.url}`

return this.http.get(url)
  }


  ngOnInit(): void {
  this.initMap()


}
  ngOnDestroy() {

    [...this.borderAndAreasLayers,]
      .forEach(layer => {
        if (layer.active)
          layer.active = false;
      })
  }
  ngAfterViewInit(): void {


  }

  handleLayerVisibility(layerData, setActive) {
    let source = this.map.getSource(layerData.id);
    if (!source) {
      this.map.addSource(layerData.id, {
        type: layerData["type"],
        tiles: layerData.tiles,
        ...((layerData.bounds)&&{"bounds":layerData.bounds}),
        ...((layerData.volatile)&&{"volatile":layerData.volatile}),
        ...(layerData.type=='raster'&& {tileSize:512})
      });
        const layer = this.map.getLayer( layerData.sourceLayer.id);

        if (!layer) {
          this.map.addLayer({
            "id":  layerData.sourceLayer.id,
            "type":  layerData.sourceLayer.type,
            "source": layerData.id,
            "source-layer":  layerData.sourceLayer.sourceLayer,
            "filter": ['all'],
            "paint": layerData.paint,
            "layout":layerData.layout?layerData.layout:{},
            "metadata":{
              name:layerData.name
            }
          });
        }
      // });
    }


      const visibility = this.map.getLayoutProperty(
        layerData.sourceLayer.id,
        'visibility'
      );

      if (visibility === 'visible') {
        this.map.setLayoutProperty( layerData.sourceLayer.id, 'visibility', 'none');
      } else {
        this.map.setLayoutProperty(
          layerData.sourceLayer.id,
          'visibility',
          'visible'
        );
      }
    // });

    if (setActive)
      layerData.active = !layerData.active;

  }

  generateRandomColor() {
    let newColor = "#" + (Math.floor(Math.random() * 900000 + 100000)).toString()
    return newColor
  };



  showSettings(layer){
    this.selectedConfigLayer=layer;
    this.showControls=true;
  }

  initMap() {

    const initialState = { lng: 5.339355468750009, lat:60.02369688198334, zoom: 1 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${this.API_KEY}`,
      // style: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${this.API_KEY}`,
      center: [    5.596785544036919,
        60.019994761409535,],
      zoom: initialState.zoom,
      attributionControl:false,
    });

    let that = this


    this.map.on('mousemove', function (e) {
      (document.getElementById('position-info') as any).innerHTML =
      `<b>Lat: </b>${Number(e.lngLat.lat).toFixed(5)}, <b>Lng: </b>${Number(e.lngLat.lng).toFixed(5)}`
      });

      this.map.on('zoom',(e)=>{
        (document.getElementById('zoom-info') as any).innerHTML ='<b>Zoom</b>: '+Number(this.map.getZoom()).toFixed(2)
      });




      this.map.on('style.load',()=>{
            
                this.http.get('https://blog.sakitam.com/wind-layer/data/wind.json')
              .subscribe((data:any)=>{
                  this.windLayer.setData(data)
                  this.map.addLayer((this.windLayer as any));
                })
                    // .subscribe(data => {
            

            
                      // let windLayer:any = new WindLayer('wind', data, {
                      //   windOptions: {
                      
                      //     colorScale: [
                      //       "rgb(36,104, 180)",
                      //       "rgb(60,157, 194)",
                      //       "rgb(128,205,193 )",
                      //       "rgb(151,218,168 )",
                      //       "rgb(198,231,181)",
                      //       "rgb(238,247,217)",
                      //       "rgb(255,238,159)",
                      //       "rgb(252,217,125)",
                      //       "rgb(255,182,100)",
                      //       "rgb(252,150,75)",
                      //       "rgb(250,112,52)",
                      //       "rgb(245,64,32)",
                      //       "rgb(237,45,28)",
                      //       "rgb(220,24,32)",
                      //       "rgb(180,0,35)"
                      //     ],
                      //     paths: 5000,
                      //     frameRate: 16,
                      //     maxAge: 60,
                      //     globalAlpha: 0.9,
                      //     velocityScale: 0.01,
                      //   },
                      // });
                      
            
                    // });
            
            });

  }


startAnimation(){




  let arr:any[] = []
  weatherLayerColors.wind.forEach((ele,index) =>{
     arr.push(ele[0]);
     arr.push('rgba(' + (ele[1]  as any).join() + ')')
 });


 let fillLayer:ScalarFill|null = null

//  this.map.addLayer(fillLayer);


  let layerList = ['wind_may_20230501','wind_may_20230504',"wind_may_20230508" ,   "wind_may_20230511",  "wind_may_20230515", "wind_may_20230518", "wind_may_20230522", "wind_may_20230525", "wind_may_20230529"];
  let allData = layerList.map(ele=>{
    return  this.s3Service.getFileObject('weather-files/'+ele+'.json');
  });
  Promise.allSettled(allData).then(data=>{
    let that = this;
    let i=0;
 this.interval =  setInterval(() => {

      let value=JSON.parse(data[i]['value'].Body.toString());
      // this.windLayer.setData(value)
      this.map.triggerRepaint()

      if(fillLayer==null){
        
      fillLayer =  new ScalarFill('wind-fill', {
          //  "type": "image",
          //  "url": 'https://sakitam.oss-cn-beijing.aliyuncs.com/codepen/wind-layer/image/var_ugrd-var_vgrd.png',
            "type": "jsonArray",
            "data": JSON.parse(data[i]['value'].Body.toString()),
           "extent": [
             [-180, 85.051129],
             [-180, -85.051129],
             [180, 85.051129],
             [180, -85.051129],
           ],
           "width": 240,
           "height": 121,
          //  "uMin": -21.34380340576172,
          //  "uMax": 30.7261962890625,
          //  "vMin": -23.916271209716797,
          //  "vMax": 24.693727493286133,
         }, {
           styleSpec: {
             'fill-color': [
               'interpolate',
               ['linear'],
               ['get', 'value'],
               ...arr
             ],
            //  'opacity': [
            //    'interpolate',
            //    ['exponential', 0.5],
            //    ['zoom'],
            //    5,
            //    1,
            //    8,
            //    1
            //  ],
            opacity:0.5
           },
           renderForm: 'rg',
           widthSegments: 1,
           heightSegments: 1,
           displayRange: [0, 150],
           mappingRange: [0, 100000],
           wrapX:true,
         },
         );
          this.map.addLayer((fillLayer as any));
          this.map.triggerRepaint();
          let date = layerList[i].slice(9,17)
          // let date = this.currentDate.setValue(layerList[i].slice(9,17)[5])
          this.currentDate.setValue(new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6)) - 1, parseInt(date.substring(6, 8))));
  

      }else{
        
        fillLayer.setData({
          type:"jsonArray",
          data:value
        });

        this.map.triggerRepaint() ;
        let date = layerList[i].slice(9,17)
        // let date = this.currentDate.setValue(layerList[i].slice(9,17)[5])
        this.currentDate.setValue(new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6)) - 1, parseInt(date.substring(6, 8))));

      }
      i+=1;
      if(i==layerList.length){
        i=0
      }
      
  }, 1000);

  })


  
}

stopAnimation(){
  clearInterval(this.interval);
  this.map.removeLayer('wind-fill')
}

}
