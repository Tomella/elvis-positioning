{
   class CsvService {
      constructor($q, configService) {
         this.$q = $q;
         configService.getConfig().then(config => {
            this.blockSize = config.blockSize ? config.blockSize : 1024 * 8;
         });
      }

      getColumns(file) {
         let blob = file.slice(0, this.blockSize);
         let reader = new FileReader();
         reader.readAsText(blob);
         return this.$q((resolve, reject) => {
            reader.onloadend = (evt) => {
               // console.log(evt.target["readyState"] + "\n\n" + evt.target["result"]);

               if (evt.target["readyState"] === FileReader.prototype.DONE) { // DONE == 2
                  let buffer = evt.target["result"];
                  if (buffer.length) {
                     // We don't read the whole file, just the start.
                     let lines = buffer.substr(0, buffer.lastIndexOf("\n"));
                     if(!lines) {
                        reject(buffer);
                     } else {
                        resolve(CSVToArray(lines));
                     }
                  } else {
                     reject(buffer);
                  }
               }
            };
         });
      }
   }
   CsvService.$invoke = ["$q", "configService"];

   angular.module("positioning.csv", [])

      .directive("csvFile", ["csvService", "messageService", function (csvService, messageService) {
         return {
            templateUrl: "positioning/csv/csv.html",
            scope: {
               state: "=",
               settings: "="
            },
            link: function(scope) {
               scope.state.dmsType = "deg";
               csvService.getColumns(scope.state.file).then(csv => {
                  scope.columns = csv[0];
               }).catch(() => {
                  messageService.error("Only CSV files with the first line containing column names are acceptable for transformation");
                  scope.state.clear();
               });

               scope.allowsHeight = function() {
                  let key = scope.state.transformation;
                  return scope.settings.transformation.some(item =>
                     item.key === key && item.height);
               };
            }
         };
      }])

      .service("csvService", CsvService);
}