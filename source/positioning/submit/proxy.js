{
    class ProxyService {
        constructor($q, configService) {
            this.$q = $q;
            this.config = configService.config.submit;
        }

        post(data) {
            let type = data.extension;

            //FILL FormData WITH FILE DETAILS.
            let postData = new FormData();
            let files = Array.isArray(data.file) ? data.file : [data.file];

            let input_filename = null;

            files.forEach(file => {
                if (!input_filename || file.name.toUpperCase().endsWith(".SHP")) {
                    input_filename = file.name;
                }
                postData.append("filename", file);
            });
            let parameters = createParameters();
            
            let template = this.config.uploadTemplate;
            template += template.lastIndexOf("?") > 0 ? "" : "?"; // 


            let keyValueStrs = Object.keys(parameters).map((key) => key + "=" + encodeURIComponent(parameters[key]));
            template += keyValueStrs.join("&");



            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            //objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);

            // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", template);
            objXhr.send(postData);

            let promise = this.$q.defer();
            return promise.promise;

            // CONFIRMATION.

            function transferComplete() {
                console.log("Data transferred")
                promise.resolve(true);
            }

            function createParameters() {
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

                    if (data.heightCol) {
                        formData.z_fld = data.heightCol;
                    }
                }
                return formData;
            }
        }
    }
    ProxyService.$inject = ["$q", "configService"];

    angular.module("positioning.proxy", [])
        .service("submitService", ProxyService)
}
