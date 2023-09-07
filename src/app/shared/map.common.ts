import { environment } from "../../environments/environment";

const API_KEY = environment.maptilerApiKey; //L4MpFmeSIqANpsCOylbi (apni) // eIgS48TpQ70m77qKYrsx (open)
const basemaps = [
  {
    id: "street",
    name: "Street",
    img_url: "assets/maps/streets-v2.png",
    url: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
    active: true,
  },
  {
    id: "satellite",
    name: "Satellite",
    img_url: "assets/maps/hybrid.png",
    url: `https://api.maptiler.com/maps/hybrid/style.json?key=${API_KEY}`,
    active: false,
  },
  {
    id: "basic",
    name: "Basic",
    img_url: "assets/maps/basic-v2.png",
    url: `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY}`,
    active: false,
  },
  {
    id: "street-dark",
    name: "Street Dark",
    img_url: "assets/maps/streets-v2-dark.png",
    url: `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${API_KEY}`,
    active: false,
  },
  {
    id: "street-light",
    name: "Street Light",
    img_url: "assets/maps/streets-v2-light.png",
    url: `https://api.maptiler.com/maps/streets-v2-light/style.json?key=${API_KEY}`,
    active: false,
  },
  {
    id: "outdoor",
    name: "Outdoor",
    img_url: "assets/maps/outdoor.png",
    url: `https://api.maptiler.com/maps/outdoor/style.json?key=${API_KEY}`,
    active: false,
  },
  {
    id: "winter",
    name: "Winter",
    img_url: "assets/maps/winter.png",
    url: `https://api.maptiler.com/maps/winter/style.json?key=${API_KEY}`,
    active: false,
  }
]

const colormaps = [
  
      {id:'Default',
        },
      {
        id: "blues",
        source: "../../../assets/img/colormaps/blues.png",
    
    },{
        id: "cividis",
        source: "../../../assets/img/colormaps/cividis.png",
    
    },{
        id: "greens",
        source: "../../../assets/img/colormaps/greens.png",
    
    },{
        id: "greys",
        source: "../../../assets/img/colormaps/greys.png",
    
    },{
        id: "inferno",
        source: "../../../assets/img/colormaps/inferno.png",
    
    },{
        id: "magma",
        source: "../../../assets/img/colormaps/magma.png",
    
    },{
        id: "oranges",
        source: "../../../assets/img/colormaps/oranges.png",
    
    },{
        id: "plasma",
        source: "../../../assets/img/colormaps/plasma.png",
    
    },{
        id: "purples",
        source: "../../../assets/img/colormaps/purples.png",
    
    },{
        id: "reds",
        source: "../../../assets/img/colormaps/reds.png",
    
    },{
        id: "viridis",
        source: "../../../assets/img/colormaps/viridis.png",
    
    },{
        id: "ylorbr",
        source: "../../../assets/img/colormaps/ylorbr.png",
    
    },{
        id: "ylorrd",
        source: "../../../assets/img/colormaps/ylorrd.png",
    
    }
    ,
    {
      id: "blues",

      source: "../../../assets/img/colormaps/blues.png",
  
  },{
      id: "greens",

      source: "../../../assets/img/colormaps/greens.png",
  
  },{
      id: "greys",

      source: "../../../assets/img/colormaps/greys.png",
  
  },{
      id: "oranges",

      source: "../../../assets/img/colormaps/oranges.png",
  
  },{
      id: "purples",

      source: "../../../assets/img/colormaps/purples.png",
  
  },{
      id: "reds",

      source: "../../../assets/img/colormaps/reds.png",
  }
]


  

const borderAndAreasLayers = [
  {
    id: "WorldCountries",
    name: "World Countries",
    type: "vector",
    active: false,
    tiles: [
      "https://api.maptiler.com/tiles/countries/{z}/{x}/{y}.pbf?key=PaoSqcrbDh4tHgmChsjw",
    ],
    sourceLayer: 
      {
        'id': 'Territorial Border',
        'type': 'fill',
        "sourceLayer": "administrative",
      }
    ,
    paint: {
      'fill-opacity':0.5,
      'fill-color':"#6C00FF",
      'fill-outline-color':'black'
    }
  }, 
//   {
//     id: "hillshade-maplibre",
//     name: "Hillshade maplibre",
//     active: false,
//     type: 'raster-dem',
//     // url:"http://127.0.0.1:5500/dem_stream_project.tif",
//     url:"https://7a-cogs.s3.eu-west-1.amazonaws.com/cog_test/33-104-122_cog.tif",
//     tiles: [
//       // "http://54.171.211.206:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https://7ageotiff.s3.eu-west-1.amazonaws.com/Project/40798979/projectDem/dem_stream_project.tif&algorithm=terrainrgb&resampling=bilinear"

//       "http://54.171.211.206:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https://7a-cogs.s3.eu-west-1.amazonaws.com/cog_test/33-104-122_cog.tif&algorithm=terrainrgb&resampling=bilinear"
//       // "http://localhost:8000/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=http://127.0.0.1:5500/dem_stream_project.tif&algorithm=terrainrgb"
//     ],
// sourceLayer: 
//       {
//         'id': 'hillshade-maplibre',
//         'type': 'hillshade',
//         "sourceLayer": "contour",
//       }
//     ,
//     paint: {

//     }
//   }, 
//   {
//     id: "hillshade-processed",
//     name: "Hillshade Processed",
//     active: false,
//     type: 'raster',
//     url:"https://7ageotiff.s3.eu-west-1.amazonaws.com/Project/40798979/projectDem/dem_stream_project.tif",
//     // url:"http://127.0.0.1:5500/dem_stream_project.tif",
//     tiles: [
//       "http://localhost:8000/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https://7ageotiff.s3.eu-west-1.amazonaws.com/Project/40798979/projectDem/dem_stream_project.tif&algorithm=hillshade&algorithm_params=%7B%22azimuth%22%3A+300%2C+%22angle_altitude%22%3A+40%7D&resampling=bilinear"
//       // "http://54.171.211.206:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https://7a-cogs.s3.eu-west-1.amazonaws.com/cog_test/33-104-122_cog.tif&algorithm=hillshade&algorithm_params=%7B%22azimuth%22%3A+300%2C+%22angle_altitude%22%3A+40%7D&resampling=bilinear"
//     ],
// sourceLayer: 
//       {
//         'id': 'hillshade-processed',
//         'type': 'raster',
//         "sourceLayer": "contour",
//       }
//     ,
//     paint: {

//     }
//   }, 
//   {
//     id: "hillshade-titiler",
//     name: "Hillshade Titiler",
//     active: false,
//     type: 'raster',
//     url:"https://7a-cogs.s3.eu-west-1.amazonaws.com/cog_dem/33-103-122.tif",
//     tiles: [
//       "http://54.171.211.206:8000/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https://7a-cogs.s3.eu-west-1.amazonaws.com/cog_dem/33-103-122.tif&resampling=bilinear&algorithm=hillshade&return_mask=true"
//       // 'http://54.171.211.206:8000/mosaicjson/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?url=https://7a-cogs.s3.eu-west-1.amazonaws.com/houston/test/NORWAY_COG_DEM.json&algorithm=terrainrgb'
//     ],
// sourceLayer: 
//       {
//         'id': 'hillshade-titiler',
//         'type': 'raster',
//         "sourceLayer": "contour",
//       }
//     ,
//     paint: {

//     }
//   }, 

]


const weatherLayerColors  = {
  temp: [[203,[115,70,105,255]],
    [218,[202,172,195,255]],
    [233,[162,70,145,255]],
    [248,[143,89,169,255]],
    [258,[157,219,217,255]],
    [265,[106,191,181,255]],
    [269,[100,166,189,255]],
    [273.15,[93,133,198,255]],
    [274,[68,125,99,255]],
    [283,[128,147,24,255]],
    [294,[243,183,4,255]],
    [303,[232,83,25,255]],
    [320,[71,14,0,255]]],
  wind: [
    [0,[98,113,183,255]],
    [1,[57,97,159,255]],
    [3,[74,148,169,255]],
    [5,[77,141,123,255]],
    [7,[83,165,83,255]],
    [9,[53,159,53,255]],
    [11,[167,157,81,255]],
    [13,[159,127,58,255]],
    [15,[161,108,92,255]],
    [17,[129,58,78,255]],
    [19,[175,80,136,255]],
    [21,[117,74,147,255]],
    [24,[109,97,163,255]],
    [27,[68,105,141,255]],
    [29,[92,144,152,255]],
    [36,[125,68,165,255]],
    [46,[231,215,215,255]],
    [51,[219,212,135,255]],
    [77,[205,202,112,255]],
    [104,[128,128,128,255]]
  ],
};


export {
    API_KEY,
    basemaps,
    borderAndAreasLayers,
    colormaps,weatherLayerColors
    
}