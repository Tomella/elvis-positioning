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
            extensions: [
               'shp'
            ]
         }
      ],
      submit: {
         uploadTemplate: "https://gda2020test-ga.fmecloud.com/fmerest/v2/resources/connections/FME_SHAREDRESOURCE_DATA/filesys/GDA2020/UPLOADS?createDirectories=false&overwrite=true&token={token}",
         tokenUrl: 'token',
         transformUrl: "https://gda2020test-ga.fmecloud.com/fmejobsubmitter/gda2020/GDA94to2020Manager.fmw"
      },
      processing: {
         outFormat: [
            {
               code: 'ESRIASCIIGRID',
               value: 'Esri ASCII Grid',
               description: 'An Esri ASCII grid is a raster GIS file format developed by Esri. The grid defines geographic space as an array of equally sized square grid points arranged in rows and columns. Each grid point stores a numeric value that represents elevation or surface slope for that unit of space. Each grid cell is referenced by its x,y coordinate location.'
            },
            {
               code: 'GEOTIFF',
               value: 'Geo TIFF (Geo-referenced Tageed Image File Format)',
               description: 'GeoTIFF is a public domain metadata standard which allows georeferencing information to be embedded within a TIFF file.'
            },
            {
               code: 'NETCDF',
               value: 'NetCDF (Network Common Data Form',
               description: 'NetCDF is a set of software libraries and self-describing, machine-independent data formats that support the creation, access, and sharing of array-oriented scientific data.'
            },
            {
               code: 'NGRID',
               value: 'MapInfo Vertical Mapper Grid (NGrid)',
               description: 'NGrid is a binary raster format with header information. For each raster, there is only a single feature returned, since this feature will contain the entire raster. A single feature is stored in a single file, with header information in an associated MapInfo TAB file.'
            }
         ]
      },
      transformation: [
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