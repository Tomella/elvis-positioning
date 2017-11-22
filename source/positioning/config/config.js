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
         uploadTemplate: "https://gda2020test-ga.fmecloud.com/fmerest/v2/resources/connections/FME_SHAREDRESOURCE_DATA/filesys/GDA2020/UPLOADS?createDirectories=false&overwrite=true&token={token}",
         tokenUrl: 'token',
         transformUrl: "https://gda2020test-ga.fmecloud.com/fmejobsubmitter/gda2020/GDA94to2020Manager.fmw?opt_responseformat=json"
      },
      transformation: [
         {
            key: 'GDA94_to_GDA2020_DC',
            value: 'GDA94 to GDA2020 DC'
         },
         {
            key: 'GDA94_to_GDA2020_NSW_C',
            value: 'GDA94 to GDA2020 NSW C'
         },
         {
            key: 'GDA94_to_GDA2020_NT_C',
            value: 'GDA94 to GDA2020 NT C'
         },
         {
            key: 'GDA94_to_GDA2020_QLD_C',
            value: 'GDA94 to GDA2020 QLD C'
         },
         {
            key: 'GDA94_to_GDA2020_SA_C',
            value: 'GDA94 to GDA2020 SA C'
         },
         {
            key: 'GDA94_to_GDA2020_TAS_C',
            value: 'GDA94 to GDA2020 TAS C'
         },
         {
            key: 'GDA94_to_GDA2020_VIC_C',
            value: 'GDA94 to GDA2020 VIC C'
         },
         {
            key: 'GDA94_to_GDA2020_WA_C',
            value: 'GDA94 to GDA2020 WA C'
         },
         {
            key: 'GDA94_to_GDA2020_NSW_DC',
            value: 'GDA94 to GDA2020 NSW DC'
         },
         {
            key: 'GDA94_to_GDA2020_NT_DC',
            value: 'GDA94 to GDA2020 NT DC'
         },
         {
            key: 'GDA94_to_GDA2020_QLD_DC',
            value: 'GDA94 to GDA2020 QLD DC'
         },
         {
            key: 'GDA94_to_GDA2020_SA_DC',
            value: 'GDA94 to GDA2020 SA DC'
         },
         {
            key: 'GDA94_to_GDA2020_TAS_DC',
            value: 'GDA94 to GDA2020 TAS DC'
         },
         {
            key: 'GDA94_to_GDA2020_VIC_DC',
            value: 'GDA94 to GDA2020 VIC DC'
         },
         {
            key: 'GDA94_to_GDA2020_WA_DC',
            value: 'GDA94 to GDA2020 WA DC'
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