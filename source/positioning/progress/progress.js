{
   angular.module("positioning.progress", ["positioning.submit"])

      .directive("progressBarCsv", ["flashService", "messageService", "submitService", function (flashService, messageService, submitService) {
         return {
            scope: {
               state: "="
            },
            templateUrl: "positioning/progress/progresscsv.html",
            link: function (scope) {
               scope.submit = function () {
                  let flasher = flashService.add("Uploading files", 30000, true);
                  submitService.post(scope.state).then(() => {
                     flasher.remove();
                     messageService.success("Files are queued for processing. You will receive an email on completion.");
                  }).catch(error => {
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
      }])

      .directive("progressBarSingle", ["flashService", "messageService", "submitService", function (flashService, messageService, submitService) {
         return {
            scope: {
               state: "="
            },
            templateUrl: "positioning/progress/progresssingle.html",
            link: function (scope) {
               scope.submit = function () {
                  let flasher = flashService.add("Uploading files", 30000, true);
                  submitService.post(scope.state).then(() => {
                     flasher.remove();
                     messageService.success("Files are queued for processing. You will receive an email on completion.");
                  }).catch(error => {
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
      }])

      .directive("progressBarShapefile", ["flashService", "messageService", "submitService", function (flashService, messageService, submitService) {
         return {
            scope: {
               state: "="
            },
            templateUrl: "positioning/progress/progresshapefile.html",
            link: function (scope) {
               scope.submit = function () {
                  let flasher = flashService.add("Uploading files", 30000, true);
                  submitService.post(scope.state).then(() => {
                     flasher.remove();
                     messageService.success("Files are queued for processing. You will receive an email on completion.");
                  }).catch(error => {
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