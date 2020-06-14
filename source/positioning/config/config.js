{
   let _config = {
      version: '1.3.0',
      user: 'anon',
      clientSessionId: 'ba68cb1b-93f1-4f4d-b330-e47469db1836',
      maxFileSize: 524288000,
      fileUploadFormats: [
         {
            name: 'CSV',
            url: 'https://en.wikipedia.org/wiki/Comma-separated_values',
            description: 'Comma seperated variables.',
            extensions: [
               'csv'
            ]
         },
         {
            name: 'Shapefile',
            url: 'http://wiki.openstreetmap.org/wiki/Shapefiles',
            description: 'ESRI shapefile format is a popular geospatial vector data format for geographic information system (GIS) software.',
            extensions: ['shp' ]
         },
         {
            name: 'JPEG2000',
            url: 'https://en.wikipedia.org/wiki/JPEG_2000',
            description: 'JPEG 2000 (JP2) is an image compression standard and coding system.',
            extensions: [ "j2", "j2k", "jpx", "jpf", "jpm", "jpp", "jp2000", "jp2k"]
         },
         {
            name: 'GeoJSON',
            url: 'https://en.wikipedia.org/wiki/GeoJSON',
            description: 'GeoJSON is an open standard format designed for representing simple geographical features, based on JSON.',
            extensions: [ "json"]
         },
         {
            name: 'GeoTIFF',
            url: 'https://en.wikipedia.org/wiki/GeoTIFF',
            description: 'GeoTIFF is a public domain metadata standard which allows georeferencing information to be embedded within a TIFF file.',
            extensions: [ "tif"]
         },
         {
            name: 'ASCII Grid',
            url: 'https://en.wikipedia.org/wiki/Comma-separated_values',
            description: 'An Esri grid is a raster GIS file format developed by Esri, which has two formats and we accept the ASCII format here.',
            extensions: [ "asc"]
         },
         {
            name: 'ECW',
            url: 'https://en.wikipedia.org/wiki/ECW_(file_format)',
            description: 'ECW, an enhanced compressed wavelet file format designed for geospatial imagery.',
            extensions: [ "ecw"]
         }
      ],
      submit: {
         uploadTemplate: "/positioning/upload",
      },
      transformation: [
         {
            key: 'GDA94_to_GDA2020_7P',
            value: 'Conformal 7-Parameter Similarity',
            height: true
         },
         {
            key: 'GDA94_to_GDA2020_C',
            value: 'Conformal'
         },
         {
            key: 'GDA94_to_GDA2020_DC',
            value: 'Conformal and Distortion'
         }
      ]
   };

   angular.module("positioning.config", [])

      .service("configService", ['$q', function ($q) {
         let service = {
            getConfig(name) {
               let response = this.config;
               if (name) {
                  response = response[name];
               }
               return $q.when(response);
            },

            get config() {
               return _config;
            }
         };

         return service;
      }]);
}
