{
   angular.module("positioning.progress", ["positioning.submit"])

      .directive("progressBarCsv", ["messageService", "submitService", function (messageService, submitService) {
         return {
            scope: {
               state: "="
            },
            templateUrl: "positioning/progress/progresscsv.html",
            link: function (scope) {
               scope.submit = function () {
                  submitService.post(scope.state).catch(error => {
                     messageService.error("Posted CSV file for processing but the request failed. Please try again later.");
                  });
                  messageService.success("Posted CSV file for processing. You will receive an email on completion.");
                  scope.state = new State();
               };

               scope.cancel = function () {
                  messageService.success("Cleared selected CSV file");
                  scope.state = new State();
               };
            }
         };
      }])

      .directive("progressBarShapefile", ["messageService", "submitService", function (messageService, submitService) {
         return {
            scope: {
               state: "="
            },
            templateUrl: "positioning/progress/progresshapefile.html",
            link: function (scope) {
               scope.submit = function () {
                  submitService.post(scope.state);
                  messageService.success("Posted shapefiles for processing. You will receive an email on completion.");
                  scope.state = new State();
               };

               scope.cancel = function () {
                  messageService.success("Cleared selected shapefiles");
                  scope.state = new State();
               };
            }
         };
      }])

      .filter("sumFiles", [function () {
         return function (files) {
            if (!files) {
               return 0;
            }

            return Object.keys(files).reduce((acc, key) => acc + files[key].size, 0)
         };
      }]);
}