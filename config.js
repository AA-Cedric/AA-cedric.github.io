window.config = {
  legendUrls: {
    enkelbestemming: "https://service.pdok.nl/kadaster/plu/wms/v1_0/legend/enkelbestemming/enkelbestemming.png",
    dubbelbestemming: "https://service.pdok.nl/kadaster/plu/wms/v1_0/legend/dubbelbestemming/dubbelbestemming.png",
  },
  Configurations: {
    Ruimtelijke_plannen: { 
      url: "https://service.pdok.nl/kadaster/adressen/wms/v1_0",
      service: "WMS",
      version: "1.3.0",
      request: "GetFeatureInfo",
      layers: "",
      styles: "",
      srs_or_crs: "crs",
      EPSG: "28992",
      format: "application/json",
      width: 1920,
      height: 1080,
      scale: 0.2
    },
    Ruimtelijke_plannen_bouwvlak: { 
      url: "https://service.pdok.nl/kadaster/plu/wms/v1_0",
      service: "WMS",
      version: "1.3.0",
      request: "GetMap",
      layers: "bouwvlak",
      styles: "",
      srs_or_crs: "CRS",
      EPSG: "28992",
      format: "image/jpeg",
      transparent: "false",
      width: 1920,
      height: 1080,
      scale: 0.2
    },
  },
};
