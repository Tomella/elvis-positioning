/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
   var RootCtrl = function RootCtrl(configService) {
      var _this = this;

      _classCallCheck(this, RootCtrl);

      configService.getConfig().then(function (data) {
         _this.data = data;
         _this.state = new State();
      });
   };

   RootCtrl.$invoke = ['configService'];

   angular.module("PositioningApp", ['common.altthemes', 'common.navigation', 'common.storage', 'common.templates', 'common.toolbar', 'explorer.confirm', 'explorer.drag', 'explorer.enter', 'explorer.flasher', 'explorer.googleanalytics', 'explorer.httpdata', 'explorer.info', 'explorer.legend', 'explorer.message', 'explorer.modal', 'explorer.persist', 'explorer.projects', 'explorer.tabs', 'explorer.version', 'exp.ui.templates', 'positioning.config', 'positioning.download', 'positioning.file', 'positioning.filedrop', 'positioning.header', 'positioning.templates', 'ui.bootstrap', 'ui.bootstrap-slider', 'page.footer'])

   // Set up all the service providers here.
   .config(['projectsServiceProvider', 'versionServiceProvider', 'persistServiceProvider', function (projectsServiceProvider, versionServiceProvider, persistServiceProvider) {
      versionServiceProvider.url("positioning/assets/package.json");
      projectsServiceProvider.setProject("positioning");
      persistServiceProvider.handler("local");
   }]).factory("userService", [function () {
      return {
         login: noop,
         hasAcceptedTerms: noop,
         setAcceptedTerms: noop,
         getUsername: function getUsername() {
            return {
               then: function then(fn) {
                  return fn("anon");
               }
            };
         }
      };
      function noop() {
         return true;
      }
   }]).controller("RootCtrl", RootCtrl).filter('bytes', function () {
      return function (bytes, precision) {
         if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
         if (typeof precision === 'undefined') precision = 0;
         var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
             number = Math.floor(Math.log(bytes) / Math.log(1024));
         return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
      };
   });
}
'use strict';

{
   var _config = {
      version: '1.3.0',
      user: 'anon',
      clientSessionId: 'ba68cb1b-93f1-4f4d-b330-e47469db1836',
      maxFileSize: 524288000,
      fileUploadFormats: [{
         name: 'CSV',
         url: 'https://en.wikipedia.org/wiki/Comma-separated_values',
         description: 'Comma seperated variables.',
         extensions: ['csv']
      }, {
         name: 'Shapefile',
         url: 'http://wiki.openstreetmap.org/wiki/Shapefiles',
         description: 'ESRI shapefile format is a popular geospatial vector data format for geographic information system (GIS) software.',
         extensions: ['shp']
      }, {
         name: 'JPEG2000',
         url: 'https://en.wikipedia.org/wiki/JPEG_2000',
         description: 'JPEG 2000 (JP2) is an image compression standard and coding system.',
         extensions: ["j2", "j2k", "jpx", "jpf", "jpm", "jpp", "jp2000", "jp2k"]
      }, {
         name: 'GeoJSON',
         url: 'https://en.wikipedia.org/wiki/GeoJSON',
         description: 'GeoJSON is an open standard format designed for representing simple geographical features, based on JSON.',
         extensions: ["json"]
      }, {
         name: 'GeoTIFF',
         url: 'https://en.wikipedia.org/wiki/GeoTIFF',
         description: 'GeoTIFF is a public domain metadata standard which allows georeferencing information to be embedded within a TIFF file.',
         extensions: ["tif"]
      }, {
         name: 'ASCII Grid',
         url: 'https://en.wikipedia.org/wiki/Comma-separated_values',
         description: 'An Esri grid is a raster GIS file format developed by Esri, which has two formats and we accept the ASCII format here.',
         extensions: ["asc"]
      }, {
         name: 'ECW',
         url: 'https://en.wikipedia.org/wiki/ECW_(file_format)',
         description: 'ECW, an enhanced compressed wavelet file format designed for geospatial imagery.',
         extensions: ["ecw"]
      }],
      submit: {
         uploadTemplate: "https://gda2020test-ga.fmecloud.com/fmerest/v2/resources/connections/FME_SHAREDRESOURCE_DATA/filesys/GDA2020/UPLOADS?createDirectories=false&overwrite=true&token={token}",
         tokenUrl: 'token',
         transformUrl: "https://gda2020test-ga.fmecloud.com/fmejobsubmitter/gda2020/GDA94to2020Manager.fmw?opt_responseformat=json"
      },
      transformation: [{
         key: 'GDA94_to_GDA2020_DC',
         value: 'GDA94 to GDA2020 DC'
      }, {
         key: 'GDA94_to_GDA2020_NSW_C',
         value: 'GDA94 to GDA2020 NSW C'
      }, {
         key: 'GDA94_to_GDA2020_NT_C',
         value: 'GDA94 to GDA2020 NT C'
      }, {
         key: 'GDA94_to_GDA2020_QLD_C',
         value: 'GDA94 to GDA2020 QLD C'
      }, {
         key: 'GDA94_to_GDA2020_SA_C',
         value: 'GDA94 to GDA2020 SA C'
      }, {
         key: 'GDA94_to_GDA2020_TAS_C',
         value: 'GDA94 to GDA2020 TAS C'
      }, {
         key: 'GDA94_to_GDA2020_VIC_C',
         value: 'GDA94 to GDA2020 VIC C'
      }, {
         key: 'GDA94_to_GDA2020_WA_C',
         value: 'GDA94 to GDA2020 WA C'
      }, {
         key: 'GDA94_to_GDA2020_NSW_DC',
         value: 'GDA94 to GDA2020 NSW DC'
      }, {
         key: 'GDA94_to_GDA2020_NT_DC',
         value: 'GDA94 to GDA2020 NT DC'
      }, {
         key: 'GDA94_to_GDA2020_QLD_DC',
         value: 'GDA94 to GDA2020 QLD DC'
      }, {
         key: 'GDA94_to_GDA2020_SA_DC',
         value: 'GDA94 to GDA2020 SA DC'
      }, {
         key: 'GDA94_to_GDA2020_TAS_DC',
         value: 'GDA94 to GDA2020 TAS DC'
      }, {
         key: 'GDA94_to_GDA2020_VIC_DC',
         value: 'GDA94 to GDA2020 VIC DC'
      }, {
         key: 'GDA94_to_GDA2020_WA_DC',
         value: 'GDA94 to GDA2020 WA DC'
      }]
   };

   angular.module("positioning.config", []).service("configService", ['$q', function ($q) {
      var service = {
         getConfig: function getConfig(name) {
            var response = this.config;
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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
   var CsvService = function () {
      function CsvService($q, configService) {
         var _this = this;

         _classCallCheck(this, CsvService);

         this.$q = $q;
         configService.getConfig().then(function (config) {
            _this.blockSize = config.blockSize ? config.blockSize : 1024 * 8;
         });
      }

      _createClass(CsvService, [{
         key: "getColumns",
         value: function getColumns(file) {
            var blob = file.slice(0, this.blockSize);
            var reader = new FileReader();
            reader.readAsText(blob);
            return this.$q(function (resolve, reject) {
               reader.onloadend = function (evt) {
                  // console.log(evt.target["readyState"] + "\n\n" + evt.target["result"]);

                  if (evt.target["readyState"] === FileReader.prototype.DONE) {
                     // DONE == 2
                     var buffer = evt.target["result"];
                     if (buffer.length) {
                        // We don't read the whole file, just the start.
                        var lines = buffer.substr(0, buffer.lastIndexOf("\n"));
                        resolve(CSVToArray(lines));
                     } else {
                        reject(buffer);
                     }
                  }
               };
            });
         }
      }]);

      return CsvService;
   }();

   CsvService.$invoke = ["$q", "configService"];

   angular.module("positioning.csv", []).directive("csvFile", ["csvService", function (csvService) {
      return {
         templateUrl: "positioning/csv/csv.html",
         scope: {
            state: "=",
            settings: "="
         },
         link: function link(scope) {
            scope.state.dmsType = "deg";
            csvService.getColumns(scope.state.file).then(function (csv) {
               scope.columns = csv[0];
            });
         }
      };
   }]).service("csvService", CsvService);
}
'use strict';

{
   angular.module('positioning.download', [])
   /**
    *
    * Override the original mars user.
    *
    */
   .directive('posDownload', [function () {
      return {
         restrict: 'AE',
         templateUrl: 'positioning/download/download.html',
         link: function link(scope) {}
      };
   }]);
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
   var EmailService = function () {
      function EmailService(persistService) {
         _classCallCheck(this, EmailService);

         this.persistService = persistService;
         this.key = "download_email";
      }

      _createClass(EmailService, [{
         key: "setEmail",
         value: function setEmail(email) {
            this.persistService.setItem(this.key, email);
         }
      }, {
         key: "getEmail",
         value: function getEmail() {
            return this.persistService.getItem(this.key);
         }
      }]);

      return EmailService;
   }();

   EmailService.$invoke = ["persistService"];

   angular.module("positioning.email", []).directive("email", ["emailService", function (emailService) {
      return {
         template: '<div class="input-group">' + '<span class="input-group-addon" id="pos-email">Email</span>' + '<input required="required" type="email" ng-change="changeEmail(state.email)" ng-model="state.email" class="form-control" placeholder="Email address to send download link" aria-describedby="nedf-email">' + '</div>',
         restrict: "AE",
         scope: {
            state: "="
         },
         link: function link(scope, element) {
            emailService.getEmail().then(function (email) {
               scope.state.email = email;
            });

            scope.changeEmail = function (email) {
               emailService.setEmail(email);
            };
         }
      };
   }]).service("emailService", EmailService);
}
"use strict";

{
   angular.module("positioning.dialog", ["positioning.filename", "positioning.mandatory", "positioning.output", "positioning.progress", "positioning.email"]).directive("acceptEpsg4283", [function () {
      return {
         scope: {
            state: "="
         },
         templateUrl: "positioning/dialog/isepsg4283.html"
      };
   }]).directive("transformationTarget", ['configService', function (configService) {
      return {
         scope: {
            state: "="
         },
         templateUrl: "positioning/dialog/transformationtarget.html",
         link: function link(scope) {
            configService.getConfig("transformation").then(function (data) {
               scope.transformations = data;
            });
         }
      };
   }]).directive("uploadDialog", [function () {
      return {
         scope: {
            state: "=",
            settings: "="
         },
         templateUrl: "positioning/dialog/dialog.html",
         link: function link(scope) {
            scope.cancel = function () {
               scope.state = new State();
            };
         }
      };
   }]).directive("uploadSubmit", ['configService', 'edDownloadService', 'messageService', function (configService, edDownloadService, messageService) {
      return {
         templateUrl: "download/downloader/submit.html",
         scope: {
            item: "=",
            processing: "="
         },
         link: function link(scope, element, attrs) {
            scope.submit = function () {
               var processing = scope.processing;

               edDownloadService.setEmail(processing.email);

               // Assemble data
               edDownloadService.submit(scope.item.processing.template, {
                  id: scope.item.primaryId,
                  yMin: processing.clip.yMin,
                  yMax: processing.clip.yMax,
                  xMin: processing.clip.xMin,
                  xMax: processing.clip.xMax,
                  outFormat: processing.outFormat.code,
                  outCoordSys: processing.outCoordSys.code,
                  filename: processing.filename ? processing.filename : "",
                  email: processing.email
               });
               messageService.success("Submitted your job. An email will be delivered on completion.");
            };
         }
      };
   }]);
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
   var FileController = function FileController() {
      _classCallCheck(this, FileController);
   };

   angular.module("positioning.file", ["positioning.format", "positioning.csv", "positioning.shp", "positioning.dialog"]).directive("file", function () {
      return {
         templateUrl: "positioning/file/file.html"
      };
   }).controller("fileController", FileController);
}
"use strict";

{
   angular.module("positioning.filedrop", []).directive("fileDrop", ["messageService", function (messageService) {
      return {
         templateUrl: "positioning/filedrop/filedrop.html",
         scope: {
            state: "="
         },
         link: function link(scope, element) {
            var fileDrop = new FileDrop(element[0], function (file) {
               scope.$apply(function () {
                  var name = file.name;
                  var ext = name.substr(name.lastIndexOf(".") + 1);
                  ext = ext ? ext.toLowerCase() : "";
                  switch (ext) {
                     case "csv":
                        handleCsv(file);
                        break;
                     case "dbf":
                     case "prj":
                     case "shp":
                     case "shx":
                        handleShapefile(ext, file);
                        break;
                     case "json":
                     case "tif":
                     case "asc":
                     case "ecw":
                     case "j2":
                     case "j2k":
                     case "jpx":
                     case "jpf":
                     case "jpm":
                     case "jpp":
                     case "jp2000":
                     case "jp2k":
                        handleSingle(ext, file);
                        break;
                     default:
                        messageService.warn("Ignoring \"" + file.name + "\" as it is not a supported format.");
                  }
               });
            });

            function handleSingle(ext, file) {
               if (scope.state.file) {
                  messageService.error("If you are sure you want to replace the current worklow \"Cancel\" the previous workflow first.");
               } else {
                  scope.state.file = file;
                  scope.state.type = "single";
                  scope.state.extension = ext;
                  scope.state.outputName = file.name.substr(0, file.name.lastIndexOf("."));
               }
            }

            function handleCsv(file) {
               if (scope.state.file) {
                  messageService.error("If you are sure you want to replace the current worklow \"Cancel\" the previous workflow first.");
               } else {
                  scope.state.file = file;
                  scope.state.type = scope.state.extension = "csv";
                  scope.state.outputName = file.name.substr(0, file.name.lastIndexOf("."));
               }
            }

            function handleShapefile(ext, file) {
               var name = file.name.substr(0, file.name.lastIndexOf("."));

               if (!scope.state.file) {
                  scope.state.outputName = name;
                  scope.state.type = scope.state.extension = "shp";
                  scope.state.fileMap = {
                     dbf: false,
                     shp: false,
                     shx: false,
                     prj: false
                  };
               }

               if (scope.state.fileMap && (scope.state.ext === "csv" || scope.full || scope.state.outputName !== name)) {
                  messageService.error("If you are sure you want to replace the current worklow \"Cancel\" the previous workflow first.");
               } else {
                  var container = scope.state.fileMap;
                  container[ext] = file;
                  scope.state.file = Object.values(container).filter(function (file) {
                     return file;
                  });
               }
            }
         }
      };
   }]);
}
"use strict";

{
   angular.module("positioning.filename", []).directive("filename", [function () {
      return {
         scope: {
            state: "="
         },
         templateUrl: "positioning/filename/filename.html"
      };
   }]);
}
'use strict';

{
	angular.module('positioning.header', []).controller('headerController', ['$scope', '$q', '$timeout', function ($scope, $q, $timeout) {

		var modifyConfigSource = function modifyConfigSource(headerConfig) {
			return headerConfig;
		};

		$scope.$on('headerUpdated', function (event, args) {
			$scope.headerConfig = modifyConfigSource(args);
		});
	}]).directive('icsmHeader', [function () {
		var defaults = {
			heading: "ICSM",
			headingtitle: "ICSM",
			helpurl: "help.html",
			helptitle: "Get help about ICSM",
			helpalttext: "Get help about ICSM",
			skiptocontenttitle: "Skip to content",
			skiptocontent: "Skip to content",
			quicklinksurl: "/search/api/quickLinks/json?lang=en-US"
		};
		return {
			transclude: true,
			restrict: 'EA',
			templateUrl: "positioning/header/header.html",
			scope: {
				breadcrumbs: "=",
				current: "=",
				heading: "=",
				headingtitle: "=",
				helpurl: "=",
				helptitle: "=",
				helpalttext: "=",
				skiptocontenttitle: "=",
				skiptocontent: "=",
				quicklinksurl: "="
			},
			link: function link(scope, element, attrs) {
				var data = angular.copy(defaults);
				angular.forEach(defaults, function (value, key) {
					if (!(key in scope)) {
						scope[key] = value;
					}
				});
			}
		};
	}]);
}
"use strict";

{
   angular.module("positioning.format", []).directive("inputFormat", function () {
      return {
         scope: {
            list: "="
         },
         templateUrl: "positioning/formats/formats.html"
      };
   });
}
"use strict";

{
   angular.module("positioning.output", []).directive("outputFormat", function () {
      return {
         link: {
            state: "="
         },
         templateUrl: 'positioning/output/output.html'
      };
   });
}
"use strict";

{
   angular.module("positioning.progress", ["positioning.submit"]).directive("progressBarCsv", ["flashService", "messageService", "submitService", function (flashService, messageService, submitService) {
      return {
         scope: {
            state: "="
         },
         templateUrl: "positioning/progress/progresscsv.html",
         link: function link(scope) {
            scope.submit = function () {
               var flasher = flashService.add("Uploading files", 30000, true);
               submitService.post(scope.state).then(function () {
                  flasher.remove();
                  messageService.success("Files are queued for processing. You will receive an email on completion.");
               }).catch(function (error) {
                  flasher.remove();
                  messageService.error("Posted CSV file for processing but the request failed. Please try again later.");
               });
               scope.state = new State();
            };

            scope.cancel = function () {
               messageService.success("Cleared selected CSV file");
               scope.state = new State();
            };
         }
      };
   }]).directive("progressBarSingle", ["flashService", "messageService", "submitService", function (flashService, messageService, submitService) {
      return {
         scope: {
            state: "="
         },
         templateUrl: "positioning/progress/progresssingle.html",
         link: function link(scope) {
            scope.submit = function () {
               var flasher = flashService.add("Uploading files", 30000, true);
               submitService.post(scope.state).then(function () {
                  flasher.remove();
                  messageService.success("Files are queued for processing. You will receive an email on completion.");
               }).catch(function (error) {
                  flasher.remove();
                  messageService.error("Posted file for processing but the request failed. Please try again later.");
               });
               scope.state = new State();
            };

            scope.cancel = function () {
               messageService.success("Cleared selected file");
               scope.state = new State();
            };
         }
      };
   }]).directive("progressBarShapefile", ["flashService", "messageService", "submitService", function (flashService, messageService, submitService) {
      return {
         scope: {
            state: "="
         },
         templateUrl: "positioning/progress/progresshapefile.html",
         link: function link(scope) {
            scope.submit = function () {
               var flasher = flashService.add("Uploading files", 30000, true);
               submitService.post(scope.state).then(function () {
                  flasher.remove();
                  messageService.success("Files are queued for processing. You will receive an email on completion.");
               }).catch(function (error) {
                  flasher.remove();
                  messageService.error("Posted file for processing but the request failed. Please try again later.");
               });
               scope.state = new State();
            };

            scope.cancel = function () {
               messageService.success("Cleared selected shapefiles");
               scope.state = new State();
            };
         }
      };
   }]).filter("sumFiles", [function () {
      return function (files) {
         if (!files) {
            return 0;
         }

         return Object.keys(files).reduce(function (acc, key) {
            return acc + files[key].size;
         }, 0);
      };
   }]);
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
   var SubmitService = function () {
      function SubmitService($http, $q, configService) {
         _classCallCheck(this, SubmitService);

         this.$q = $q;
         this.$http = $http;
         this.config = configService.config.submit;
      }

      _createClass(SubmitService, [{
         key: "post",
         value: function post(data) {
            var _this = this;

            var type = data.extension;
            var fileName = encodeURIComponent(data.file.name);

            // First we get a token
            return this.$http({
               url: this.config.tokenUrl,
               cache: true
            }).then(function (response) {
               // Then we upload the file


               //FILL FormData WITH FILE DETAILS.
               var postData = new FormData();
               var files = Array.isArray(data.file) ? data.file : [data.file];
               var config = _this.config;
               var $http = _this.$http;

               var input_filename = null;

               files.forEach(function (file) {
                  if (!input_filename || file.name.toUpperCase().endsWith(".SHP")) {
                     input_filename = file.name;
                  }
                  postData.append("filename", file);
               });

               // ADD LISTENERS.
               var objXhr = new XMLHttpRequest();
               //objXhr.addEventListener("progress", updateProgress, false);
               objXhr.addEventListener("load", transferComplete, false);

               // SEND FILE DETAILS TO THE API.
               objXhr.open("POST", config.uploadTemplate.replace("{token}", response.data.serviceResponse.token));
               objXhr.send(postData);

               var promise = _this.$q.defer();
               return promise.promise;

               // CONFIRMATION.
               function transferComplete(e) {
                  // Now the files have successfully

                  var formData = {
                     input_filename: input_filename,
                     transformation: data.transformation,
                     email: data.email
                  };

                  if (type === "csv") {
                     if (data.dmsType === "dms") {
                        formData.lat_deg_fld = data.latDegreesCol;
                        formData.lng_deg_fld = data.lngDegreesCol;

                        formData.lat_min_fld = data.latMinutesCol;
                        formData.lng_min_fld = data.lngMinutesCol;

                        formData.lat_sec_fld = data.latSecondsCol;
                        formData.lng_sec_fld = data.lngSecondsCol;
                     } else {
                        formData.lat_dd_fld = data.latDegreesCol;
                        formData.lng_dd_fld = data.lngDegreesCol;
                     }
                  }

                  $http.post(config.transformUrl, formData, {
                     headers: {
                        "Content-Type": "application/json"
                     }
                  }).then(function (data) {
                     return promise.resolve(data);
                  }).catch(function (data) {
                     return promise.reject(data);
                  });
               }
            });
         }
      }]);

      return SubmitService;
   }();

   SubmitService.$inject = ["$http", "$q", "configService"];

   angular.module("positioning.submit", []).service("submitService", SubmitService);
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
   var ShpService = function ShpService($q) {
      _classCallCheck(this, ShpService);

      this.$q = $q;
   };

   ShpService.$invoke = ["$q"];

   angular.module("positioning.shp", []).directive("shpFile", ["shpService", function (shpService) {
      return {
         templateUrl: "positioning/shapefile/shapefile.html",
         restrict: 'AE',
         scope: {
            state: "=",
            settings: "="
         },
         link: function link(scope) {}
      };
   }]).service("shpService", ShpService);
}
"use strict";

function CSVToArray(strData, strDelimiter) {
   // Check to see if the delimiter is defined. If not,
   // then default to comma.
   strDelimiter = strDelimiter || ",";

   // Create a regular expression to parse the CSV values.
   var objPattern = new RegExp(
   // Delimiters.
   "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

   // Quoted fields.
   "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

   // Standard fields.
   "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi");

   // Create an array to hold our data. Give the array
   // a default empty first row.
   var arrData = [[]];

   // Create an array to hold our individual pattern
   // matching groups.
   var arrMatches = null;

   // Keep looping over the regular expression matches
   // until we can no longer find a match.
   while (arrMatches = objPattern.exec(strData)) {

      // Get the delimiter that was found.
      var strMatchedValue,
          strMatchedDelimiter = arrMatches[1];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {

         // Since we have reached a new row of data,
         // add an empty row to our data array.
         arrData.push([]);
      }

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
         // We found a quoted value. When we capture
         // this value, unescape any double quotes.
         strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
      } else {
         // We found a non-quoted value.
         strMatchedValue = arrMatches[3];
      }

      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
   }

   // Return the parsed data.
   return arrData;
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileDrop = function FileDrop(element, handler) {
   _classCallCheck(this, FileDrop);

   if (!handler || typeof handler !== "function") {
      throw Error("No file handler provided");
   }

   if (!element) {
      throw Error("No element provided");
   }

   element.addEventListener("dragenter", dragenter, false);
   element.addEventListener("dragover", dragover, false);
   element.addEventListener("drop", drop, false);

   function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("dragenter");
   }

   function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("dragover");
   }

   function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = dt.files;
      handleFiles(files);
   }

   function handleFiles(files) {
      if (files) {
         for (var i = 0; i < files.length; i++) {
            handler(files.item(i));
         }
      }
   }
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinePusher = function () {
   function LinePusher(file) {
      _classCallCheck(this, LinePusher);

      this.PAGE_SIZE = 16 * 1024;
      this.file = file;
      this.length = file.size;
      this.pageNo = -1;
      this.index = 0;
      this.reader = new FileReader();
      this.lineBuffer = [];
   }

   _createClass(LinePusher, [{
      key: "start",
      value: function start(targetFn) {
         // Prime the first read
         var result = this.read();

         while (result) {
            var lineResult = this.next();
            switch (lineResult.state) {
               case "more":
                  result = this.read();
                  break;
               case "line":
                  targetFn(lineResult.line);
                  break;
               case "complete":
                  targetFn(lineResult.line);
                  result = false;
                  break;
            }
         }
      }
   }, {
      key: "read",
      value: function read() {
         var _this = this;

         this.pageNo++;
         this.index = 0;
         var self = this;
         var start = this.pageNo * this.PAGE_SIZE;

         var blob = this.file.slice(start, start + this.PAGE_SIZE);

         this.reader.readAsText(blob);
         return new Promise(function (resolve) {
            if (start >= _this.length) {
               resolve(false);
               return;
            }

            self.reader.onloadend = function (evt) {
               if (evt.target["readyState"] === FileReader.prototype.DONE) {
                  // DONE == 2
                  console.log("Reading page " + self.pageNo);
                  self.buffer = evt.target["result"];
                  resolve(_this.hasMore());
               }
            };
         });
      }
   }, {
      key: "hasMore",
      value: function hasMore() {
         return this.index + this.PAGE_SIZE * this.pageNo < this.length - 1;
      }
   }, {
      key: "next",
      value: function next() {
         while (this.hasMore()) {
            if (!this.buffer || this.index >= this.PAGE_SIZE) {
               return { state: "more" };
            }
            var char = this.buffer[this.index++];
            if (char === "\r") {
               continue;
            }
            if (char === "\n") {
               break;
            }
            this.lineBuffer.push(char);
         }
         var line = this.lineBuffer.join("");
         this.lineBuffer = [];
         return {
            state: this.hasMore() ? "line" : "complete",
            line: line
         };
      }
   }]);

   return LinePusher;
}();
"use strict";

if (!String.prototype.endsWith) {
   String.prototype.endsWith = function (searchStr, Position) {
      // This works much better than >= because
      // it compensates for NaN:
      if (!(Position < this.length)) Position = this.length;else Position |= 0; // round position
      return this.substr(Position - searchStr.length, searchStr.length) === searchStr;
   };
}

if (!Object.values) {
   Object.values = function values(O) {
      return Object.keys(O).map(function (key) {
         return O[key];
      });
   };
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
   function State() {
      _classCallCheck(this, State);
   }

   _createClass(State, [{
      key: 'isCsv',
      get: function get() {
         return this.extension === 'csv';
      }
   }, {
      key: 'isSinglefile',
      get: function get() {
         return this.type === 'single';
      }
   }, {
      key: 'isShapefile',
      get: function get() {
         return this.extension === 'shp';
      }
   }, {
      key: 'full',
      get: function get() {
         var files = this.fileMap;
         if (!files) {
            return false;
         }
         return files.dbf && files.shp && files.shx;
      }

      ////////////////////////////////
      // Showld have extra classes and polymorphism

   }, {
      key: 'validFileInfo',
      get: function get() {
         // It's either CSV or SHP at the moment
         return this.isCsv ? this.validCsvFileInfo : this.validShpFileInfo;
      }
   }, {
      key: 'validShpFileInfo',
      get: function get() {
         return true;
      }
   }, {
      key: 'validSingleFileInfo',
      get: function get() {
         return true;
      }
   }, {
      key: 'validCsvFileInfo',
      get: function get() {
         var result = this.latDegreesCol && this.lngDegreesCol && this.isEpsg4283;

         if (this.dmsType === "dms") {
            result = result && this.latMinutesCol && this.latSecondsCol && this.lngMinutesCol && this.lngSecondsCol;
         }
         return result;
      }
      //////////////////////////////////

   }, {
      key: 'validEmail',
      get: function get() {
         // We assume they only put in valid email addresses
         return !!this.email;
      }
   }, {
      key: 'acceptedEpsg4283',
      get: function get() {
         // We assume they only put in valid email addresses
         return !!this.isEpsg4283;
      }
   }, {
      key: 'validFilename',
      get: function get() {
         // We assume they only put in valid filename
         return !!this.outputName;
      }
   }, {
      key: 'validOutFormat',
      get: function get() {
         // We assume they only put in valid email addresses
         return !!this.outFormat;
      }
   }, {
      key: 'validForm',
      get: function get() {
         return this.percentage > 99.99; // Scared of errors.
      }
   }, {
      key: 'percentage',
      get: function get() {
         var _this = this;

         if (!this.file) {
            return 0;
         }

         var count = 0;
         var parts = 3;

         count += this.validEmail ? 1 : 0;
         count += this.acceptedEpsg4283 ? 1 : 0;
         count += this.transformation ? 1 : 0;

         if (this.isCsv) {
            parts += 2;

            count += this.latDegreesCol ? 1 : 0;
            count += this.lngDegreesCol ? 1 : 0;

            if (this.dmsType === "dms") {
               parts += 4;

               count += this.latMinutesCol ? 1 : 0;
               count += this.lngMinutesCol ? 1 : 0;
               count += this.latSecondsCol ? 1 : 0;
               count += this.lngSecondsCol ? 1 : 0;
            }
         } else if (this.isShapefile) {
            Object.keys(this.file).forEach(function (key) {
               return count += _this.file[key] ? 1 : 0;
            });
            parts += 4;
         } else if (this.isSinglefile) {
            // Nothing more, only here to show that there is nothing more.
         }

         return 100 * count / parts;
      }
   }]);

   return State;
}();
"use strict";

{
   angular.module("positioning.mandatory", []).directive("mandatory", function () {
      return {
         template: '<span class="mandatory" title="You must provide a value">*</span>'
      };
   });
}
angular.module("positioning.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("positioning/csv/csv.html","<div>\r\n  <h4>A few questions about your CSV file named \"{{state.file.name}}\"</h4>\r\n  <div>\r\n      <div class=\"row\">\r\n			<div class=\"col-md-3 csv-label\">\r\n				Lat/lng fields are in<mandatory />\r\n			</div>\r\n			<div class=\"col-md-9\" style=\"text-align: right\">\r\n				<label for=\"csvDegrees\">\r\n               Decimal degrees (2 cols)\r\n				</label>\r\n            <input name=\"csvDegrees\" type=\"radio\" value=\"deg\" ng-model=\"state.dmsType\" />\r\n            or\r\n				<label for=\"csvDms\">\r\n               Degrees/minutes/seconds (6 cols)\r\n				</label>\r\n            <input name=\"csvDms\" type=\"radio\" value=\"dms\" ng-model=\"state.dmsType\" />\r\n			</div>\r\n      </div>\r\n\r\n      <div class=\"row\" ng-if=\"state.dmsType == \'deg\'\">\r\n			<div class=\"col-md-3 csv-label\">\r\n				Columns\r\n			</div>\r\n			<div class=\"col-md-9\">\r\n            <div style=\"text-align: right\">\r\n				   <label for=\"csvSelectLatDecDegrees\" style=\"width:9em\">\r\n                  Latitude<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLatDecDegrees\" ng-model=\"state.latDegreesCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n            </div>\r\n				<div style=\"text-align: right\">\r\n				   <label for=\"csvSelectLngDecDegrees\" style=\"width:9em\">\r\n                  Longitude<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLngDecDegrees\" ng-model=\"state.lngDegreesCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n				</div>\r\n			</div>\r\n      </div>\r\n\r\n      <div class=\"row\" ng-if=\"state.dmsType == \'dms\'\">\r\n			<div class=\"col-md-3 csv-label\">\r\n				Columns\r\n			</div>\r\n			<div class=\"col-md-9 csv-fix-label\">\r\n            <div style=\"text-align: right\">\r\n				   <label for=\"csvSelectLatDegrees\">\r\n                  Latitude Degrees<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLatDegrees\" ng-model=\"state.latDegreesCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n            </div>\r\n            <div style=\"text-align: right\">\r\n				   <label for=\"csvSelectLatMinutes\">\r\n                  Minutes<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLatMinutes\" ng-model=\"state.latMinutesCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n            </div>\r\n            <div style=\"text-align: right\">\r\n				   <label for=\"csvSelectLatSeconds\">\r\n                  Seconds<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLatSeconds\" ng-model=\"state.latSecondsCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n            </div>\r\n            <div style=\"text-align: right\">\r\n   			   <label for=\"csvSelectLngDegrees\">\r\n                  Longitude Degrees<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLngDegrees\" ng-model=\"state.lngDegreesCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n            </div>\r\n				<div style=\"text-align: right\">\r\n               <label for=\"csvSelectLngMinutes\">\r\n                  Minutes<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLngMinutes\" ng-model=\"state.lngMinutesCol\"\r\n                     ng-options=\"o as o for o in columns\"></select>\r\n            </div>\r\n            <div style=\"text-align: right\">\r\n				   <label for=\"csvSelectLngSeconds\">\r\n                  Seconds<mandatory />\r\n				   </label>\r\n               <select id=\"csvSelectLngSeconds\" ng-model=\"state.lngSecondsCol\"\r\n                     ng-options=\"o as o for o in columns\">\r\n               </select>\r\n            </div>\r\n			</div>\r\n      </div>\r\n  </div>\r\n</div>");
$templateCache.put("positioning/dialog/dialog.html","<div class=\"upload-dialog\">\r\n   <div class=\"ud-info\" ng-if=\"!state.file\">\r\n      <div style=\"font-weight: bold\">\r\n         <i class=\"fa fa-hand-o-left point-at-box fa-2x\" aria-hidden=\"true\" style=\"padding-right:12px;\"></i>\r\n         Select and drop file(s) for reprojection\r\n      </div>\r\n      <br/>\r\n      <div>\r\n         <span style=\"font-weight: bold\">CSV -</span>\r\n         Drop a single CSV file with a \".csv\" extension and we will scan for columns and ask follow up questions.\r\n      </div>\r\n      </br/>\r\n      <div>\r\n         <span style=\"font-weight: bold\">Shapefile -</span>\r\n         Drop  three or four files with the same file prefix to transform a shapefile\r\n         <ul>\r\n            <li>\".shp\" — shape format; the feature geometry itself.</li>\r\n            <li>\".shx\" — shape index format; a positional index of the feature geometry to allow seeking forwards and backwards quickly.</li>\r\n            <li>\".dbf\" — attribute format; columnar attributes for each shape, in dBase IV format.</li>\r\n            <li>\".prj\" — OPTIONAL — projection; describes the coordinate system and projection information used.</li>\r\n         </ul>\r\n      </div>\r\n      <div>\r\n         <span style=\"font-weight: bold\">JPEG2000 -</span>\r\n         Drop a single CSV file with a \".j2\", \".j2k\", \".jpx\", \".jpf\", \".jpm\", \".jpp\", \".jp2000\" or \".jp2k\" extension and we will process this as a JPEG2000 file.\r\n      </div>\r\n      </br/>\r\n      <div>\r\n         <span style=\"font-weight: bold\">GeoJSON -</span>\r\n         Drop a single GeoJSON file with a \".json\" extension and we will process this as a GeoJSON file.\r\n      </div>\r\n      </br/>\r\n      <div>\r\n         <span style=\"font-weight: bold\">GeoTIFF -</span>\r\n         Drop a single GeoTIFF file with a \".tif\" extension and we will process this as a GeoTIFF file.\r\n      </div>\r\n      </br/>\r\n      <div>\r\n         <span style=\"font-weight: bold\">ASCII Grid -</span>\r\n         Drop a single ASCII Grid file with an \".asc\" extension and we will process this as a ASCII Grid file.\r\n      </div>\r\n      </br/>\r\n      <div>\r\n         <span style=\"font-weight: bold\">ECW -</span>\r\n         Drop a single ECW file with an \".ecw\" extension and we will process this as a ECW file.\r\n      </div>\r\n   </div>\r\n\r\n   <div ng-if=\"state.file && state.extension == \'csv\'\">\r\n      <h3>Selected {{state.file.name}} ({{state.file.size | bytes}})</h3>\r\n   </div>\r\n   <div style=\"text-align:right\" ng-if=\"state.file.size > settings.maxFileSize\">\r\n      The size of the file to be uploaded must not exceed {{settings.maxFileSize | bytes}}. Please select a smaller file.\r\n      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"cancel()\">OK</button>\r\n   </div>\r\n   <hr />\r\n   <div ng-show=\"state.file\">\r\n      <div ng-if=\"state.extension == \'csv\' && state.file.size < settings.maxFileSize\">\r\n         <csv-file state=\"state\" settings=\"settings\" />\r\n      </div>\r\n      <div ng-if=\"state.extension == \'shp\'\">\r\n         <shp-file state=\"state\" settings=\"settings\" />\r\n      </div>\r\n      <div ng-if=\"state.type == \'single\'\">\r\n         <h4>A few questions about your file named \"{{state.file.name}}\"</h4>\r\n      </div>\r\n      <transformation-target state=\"state\"></transformation-target>\r\n      <accept-epsg4283 state=\"state\"></accept-epsg4283>\r\n   </div>\r\n   <div ng-show=\"state.file\">\r\n      <div>\r\n         <h4>Nominate your notification email address<mandatory /></h4>\r\n         <email state=\"state\" ng-if=\"state\" />\r\n      </div>\r\n\r\n      <div style=\"padding-top: 10px\">\r\n         <progress-bar-single state=\"state\" ng-show=\"state.type == \'single\'\"/>\r\n         <progress-bar-csv state=\"state\" ng-show=\"state.extension == \'csv\'\"/>\r\n         <progress-bar-shapefile state=\"state\" ng-show=\"state.extension == \'shp\'\" />\r\n      </div>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/dialog/isepsg4283.html","<div>\r\n   <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n         <label for=\"isEpsg4283\">\r\n					The data provided is in the <a target=\"_blank\" href=\"http://spatialreference.org/ref/epsg/4283/\">EPSG:4283</a> projection <mandatory />\r\n			</label>\r\n      </div>\r\n      <div class=\"col-md-6\" style=\"text-align:right\">\r\n         <button id=\"isEpsg4283\" type=\"button\" title=\"The data must be in the EPSG:4283 projection to be transformed correctly.\"\r\n               class=\"btn btn-default btn-xs\" ng-click=\"state.isEpsg4283 = !state.isEpsg4283\">\r\n            <i class=\"fa\" style=\"width:12px;height:12px;color:green\" ng-class=\"{\'fa-check\':state.isEpsg4283}\" aria-hidden=\"true\"></i>\r\n         </button>\r\n      </div>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/dialog/submit.html","<div style=\"padding-bottom:2px\">\r\n   <div class=\"row\">\r\n      <div class=\"col-md-6\" style=\"padding-top:7px\">\r\n         <div class=\"progress\">\r\n            <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"{{state.percentComplete}}\" aria-valuemin=\"0\" aria-valuemax=\"100\"\r\n                  style=\"width: {{state.percentComplete}}%;\">\r\n                <span class=\"sr-only\">60% Complete</span>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <div class=\"col-md-4\" style=\"padding-top:7px\">\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Select a valid coordinate system.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-crosshairs fa-2x\" ng-class=\"{\'ed-valid\': state.validProjection, \'ed-invalid\': !state.validProjection }\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Select a latitude and longitude columns.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-arrows fa-2x\" ng-class=\"{\'ed-valid\': state.validFields, \'ed-invalid\': !state.validFields}\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Select a valid download format.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-files-o fa-2x\" ng-class=\"{\'ed-valid\': state.validFormat, \'ed-invalid\': !state.validFormat}\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Provide an email address.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-envelope fa-2x\" ng-class=\"{\'ed-valid\': state.validEmail, \'ed-invalid\': !state.validEmail}\"></i>\r\n         </span>\r\n      </div>\r\n      <div class=\"col-md-2\">\r\n         <button type=\"button\" class=\"btn btn-primary\" ng-click=\"cancel()\">Cancel</button>\r\n         <button type=\"button\" ng-disabled=\"!state.ready\" class=\"btn btn-primary\">Submit</button>\r\n      </div>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/dialog/transformationtarget.html","<div>\r\n   <div class=\"row\">\r\n      <div class=\"col-md-6\">\r\n         <label for=\"csvElevation\">\r\n				   Choose a transformation <mandatory />\r\n   			</label>\r\n      </div>\r\n      <div class=\"col-md-6\" style=\"text-align: right\">\r\n         <select id=\"transformation\" ng-model=\"state.transformation\">\r\n               <option ng-selected=\"true\" value=\"\"></option>\r\n               <option ng-repeat=\"option in transformations\" value=\"{{option.key}}\">{{option.value}}</option>\r\n            </select>\r\n      </div>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/file/file.html","<div class=\"container-fluid file-container\" ng-controller=\"RootCtrl as root\">\r\n   <div class=\"row\">\r\n      <div class=\"col-md-6\" style=\"border-right: 2px solid lightgray\">\r\n         <h3>Purpose</h3>\r\n         This Geoscience Australia FME Web Service is provided to give spatial data software users and developers a\r\n         system to check their datum transformations with a standard. It can be used to transform data that references\r\n         the Geocentric Datum of Australia 1994 (GDA94) to data referenced on the\r\n         Geocentric Datum of Australia 2020 (GDA2020).\r\n         <br/><br/>\r\n         <file-drop state=\"root.state\" />\r\n\r\n         <h3>Targets</h3>\r\n         The 7-parameter similarity transformation is currently available for GDA94 to GDA2020.\r\n         The NTv2 transformation grid or 7-parameter similarity transformation is available for AGD66/AGD84 to GDA94.\r\n         <br/>\r\n         <br/>\r\n         <input-format list=\"root.data.fileUploadFormats\" />\r\n      </div>\r\n      <div class=\"col-md-6\" >\r\n         <upload-dialog state=\"root.state\" settings=\"root.data\"/>\r\n      </div>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/filedrop/filedrop.html","<div id=\"fileDrop\" title=\"Drop the files you would like to reproject to GDA2020\">\r\n   <br/> Drop <br/> File(s) <br/> Here\r\n</div>");
$templateCache.put("positioning/filename/filename.html","<div class=\"input-group\">\r\n   <span class=\"input-group-addon\" id=\"nedf-filename\">Filename</span>\r\n   <input type=\"text\" ng-maxlength=\"30\" ng-trim=\"true\" ng-keypress=\"restrict($event)\"\r\n         ng-model=\"state.outputName\" class=\"form-control\"\r\n         placeholder=\"Filename\" aria-describedby=\"pos-filename\" />\r\n   <span class=\"input-group-addon\" id=\"basic-addon2\">.zip</span>\r\n</div>");
$templateCache.put("positioning/header/header.html","<div class=\"container-full common-header\" style=\"padding-right:10px; padding-left:10px\">\r\n    <div class=\"navbar-header\">\r\n\r\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".ga-header-collapse\">\r\n            <span class=\"sr-only\">Toggle navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <a href=\"/\" class=\"appTitle visible-xs\">\r\n            <h1 style=\"font-size:120%\">{{heading}}</h1>\r\n        </a>\r\n    </div>\r\n    <div class=\"navbar-collapse collapse ga-header-collapse\">\r\n        <ul class=\"nav navbar-nav\">\r\n            <li class=\"hidden-xs\"><a href=\"/\"><h1 class=\"applicationTitle\">{{heading}}</h1></a></li>\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right nav-icons\">\r\n        	<li common-navigation current=\"current\" role=\"menuitem\" style=\"padding-right:10px\"></li>\r\n			<li mars-version-display role=\"menuitem\"></li>\r\n			<li style=\"width:10px\"></li>\r\n        </ul>\r\n    </div><!--/.nav-collapse -->\r\n</div>\r\n\r\n<!-- Strap -->\r\n<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"strap-blue\">\r\n        </div>\r\n        <div class=\"strap-white\">\r\n        </div>\r\n        <div class=\"strap-red\">\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("positioning/formats/formats.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\"><h3 class=\"panel-title\">Allowed input file types</h3></div>\r\n  <div class=\"panel-body\">\r\n    <span class=\"label label-info input-format-pill\" ng-repeat=\"item in list\" title=\"{{item.description}} Extensions: {{item.extensions.join(\', \')}}\">\r\n       <a ng-href=\"{{item.url}}\" target=\"_blank\">{{item.name}}</a>\r\n    </span>\r\n  </div>\r\n</div>");
$templateCache.put("positioning/output/output.html","<div class=\"row\">\r\n   <div class=\"col-md-3\">\r\n      <label for=\"geoprocessOutputFormat\">\r\n					Output Format<mandatory />\r\n				</label>\r\n   </div>\r\n   <div class=\"col-md-9\">\r\n      <select id=\"geoprocessOutputFormat\" style=\"width:95%\" ng-model=\"state.outFormat\" ng-options=\"opt.value for opt in settings.processing.outFormat\"></select>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/progress/progresscsv.html","<div class=\"row\">\r\n      <div class=\"col-md-4\" style=\"padding-top:7px\">\r\n         <div class=\"progress\">\r\n            <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"{{state.percentage}}\"\r\n                     aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{state.percentage}}%;\">\r\n                <span class=\"sr-only\"></span>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <div class=\"col-md-5\" style=\"padding-top:7px\">\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Add information about your file.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-file-text-o fa-lg\" ng-class=\"{\'ed-valid\': state.validFileInfo, \'ed-invalid\': !state.validFileInfo}\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Select a transformation.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-cogs fa-lg\" ng-class=\"{\'ed-valid\': state.transformation, \'ed-invalid\': !state.transformation}\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Provide an email address.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-envelope fa-lg\" ng-class=\"{\'ed-valid\': state.validEmail, \'ed-invalid\': !state.validEmail}\"></i>\r\n         </span>\r\n      </div>\r\n      <div class=\"col-md-3\">\r\n         <button type=\"button\" class=\"btn btn-primary\" ng-click=\"cancel()\">Cancel</button>\r\n         <button class=\"btn btn-primary pull-right\" ng-disabled=\"!state.validForm\" ng-click=\"submit()\" disabled=\"disabled\">Submit</button>\r\n      </div>\r\n\r\n   </div>");
$templateCache.put("positioning/progress/progresshapefile.html","<div class=\"row\">\r\n      <div class=\"col-md-4\" style=\"padding-top:7px\">\r\n         <div class=\"progress\">\r\n            <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"{{state.percentage}}\"\r\n                     aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{state.percentage}}%;\">\r\n                <span class=\"sr-only\"></span>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <div class=\"col-md-5\" style=\"padding-top:7px\">\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Provide four files for reprojection\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-file-o fa-lg\" ng-class=\"{\'ed-valid\': state.full, \'ed-invalid\': !state.full}\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Select a transformation.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-cogs fa-lg\" ng-class=\"{\'ed-valid\': state.transformation, \'ed-invalid\': !state.transformation}\"></i>\r\n         </span>\r\n         <span style=\"padding-right:10px\" uib-tooltip=\"Provide an email address.\" tooltip-placement=\"left\">\r\n            <i class=\"fa fa-envelope fa-lg\" ng-class=\"{\'ed-valid\': state.validEmail, \'ed-invalid\': !state.validEmail}\"></i>\r\n         </span>\r\n      </div>\r\n      <div class=\"col-md-3\">\r\n         <button type=\"button\" class=\"btn btn-primary\" ng-click=\"cancel()\">Cancel</button>\r\n         <button class=\"btn btn-primary pull-right\" ng-disabled=\"!state.validForm\" ng-click=\"submit()\" disabled=\"disabled\">Submit</button>\r\n      </div>\r\n   </div>");
$templateCache.put("positioning/progress/progresssingle.html","<div class=\"row\">\r\n   <div class=\"col-md-4\" style=\"padding-top:7px\">\r\n      <div class=\"progress\">\r\n         <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"{{state.percentage}}\"\r\n                  aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{state.percentage}}%;\">\r\n             <span class=\"sr-only\"></span>\r\n         </div>\r\n      </div>\r\n   </div>\r\n   <div class=\"col-md-5\" style=\"padding-top:7px\">\r\n      <span style=\"padding-right:10px\" uib-tooltip=\"Select a transformation.\" tooltip-placement=\"left\">\r\n         <i class=\"fa fa-cogs fa-lg\" ng-class=\"{\'ed-valid\': state.transformation, \'ed-invalid\': !state.transformation}\"></i>\r\n      </span>\r\n      <span style=\"padding-right:10px\" uib-tooltip=\"Confirm your data is in EPSG:4283 projection.\" tooltip-placement=\"left\">\r\n         <i class=\"fa fa-check-circle-o fa-lg\" ng-class=\"{\'ed-valid\': state.isEpsg4283, \'ed-invalid\': !state.isEpsg4283}\"></i>\r\n      </span>\r\n      <span style=\"padding-right:10px\" uib-tooltip=\"Provide an email address.\" tooltip-placement=\"left\">\r\n         <i class=\"fa fa-envelope fa-lg\" ng-class=\"{\'ed-valid\': state.validEmail, \'ed-invalid\': !state.validEmail}\"></i>\r\n      </span>\r\n   </div>\r\n   <div class=\"col-md-3\">\r\n      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"cancel()\">Cancel</button>\r\n      <button class=\"btn btn-primary pull-right\" ng-disabled=\"!state.validForm\" ng-click=\"submit()\" disabled=\"disabled\">Submit</button>\r\n   </div>\r\n</div>");
$templateCache.put("positioning/shapefile/shapefile.html","<div>\r\n  <h4>Selected Shapefiles</h4>\r\n  <div ng-repeat=\"(key, file) in state.file\">\r\n		<div class=\"row\" ng-if=\"!file\">\r\n			<div class=\"col-md-12\">\r\n            <i class=\"fa fa-warning\" style=\"color:#f4c842\"></i>\r\n            Please drag and drop a file named {{state.outputName}}.{{key}} extension to complete your set for upload.\r\n			</div>\r\n		</div>\r\n      <div class=\"row\" ng-if=\"file\">\r\n			<div class=\"col-md-12\" ng-if=\"file\">\r\n            <i class=\"fa fa-check-square\" style=\"color:#328737\"></i>\r\n            {{file.name}} ({{file.size | bytes}})\r\n			</div>\r\n		</div>\r\n  </div>\r\n</div>");}]);