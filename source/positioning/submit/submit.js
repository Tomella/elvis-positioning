{
   class SubmitService {
      constructor($http, $q, configService) {
         this.$q = $q;
         this.$http = $http;
         this.config = configService.config.submit;
      }

      post(data) {
         let type = data.extension;
         let fileName = encodeURIComponent(data.file.name);

         // First we get a token
         return this.$http({
            url: this.config.tokenUrl,
            cache: true
         }).then(response => {
            // Then we upload the file


            //FILL FormData WITH FILE DETAILS.
            var postData = new FormData();
            let files = Array.isArray(data.file) ? data.file: [data.file];
            let config = this.config;
            let $http = this.$http;

            let input_filename = null;

            files.forEach(file => {
               if(!input_filename || file.name.toUpperCase().endsWith(".SHP")) {
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

            let promise = this.$q.defer();
            return promise.promise;

            // CONFIRMATION.
            function transferComplete(e) {
               // Now the files have successfully

               let formData = {
                  input_filename,
                  transformation: data.transformation,
                  email: data.email,
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

                  if(data.heightCol) {
                     formData.z_fld = data.heightCol;
                  }
               }
               $http.post( config.transformUrl, formData, {
                  headers: {
                     "Content-Type": "application/json"
                  }
               }).then(data =>
                  promise.resolve(data)
               ).catch(data =>
                  promise.reject(data)
               );
            }
         });
      }
   }
   SubmitService.$inject = ["$http", "$q", "configService"];

   angular.module("positioning.submit", [])
      .service("submitService", SubmitService)
}
