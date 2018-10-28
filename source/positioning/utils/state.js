class State {
   clear() {
      this.extension = this.file = this.outputName = this.fileMap = this.type = this.files = this.isEpsg4283 = this.dmsType = null;
   }

   get isCsv() {
      return this.extension === 'csv';
   }

   get isSinglefile() {
      return this.type === 'single';
   }


   get isShapefile() {
      return this.extension === 'shp';
   }

   get full() {
      let files = this.fileMap;
      if (!files) {
         return false;
      }
      return files.dbf && files.shp && files.shx;
   }

   ////////////////////////////////
   // Showld have extra classes and polymorphism
   get validFileInfo() {
      // It's either CSV or SHP at the moment
      return this.isCsv ? this.validCsvFileInfo : this.validShpFileInfo;
   }

   get validShpFileInfo() {
      return true;
   }

   get validSingleFileInfo() {
      return true;
   }

   get validCsvFileInfo() {
      let result = this.latDegreesCol && this.lngDegreesCol && this.isEpsg4283;

      if (this.dmsType === "dms") {
         result = result && this.latMinutesCol &&
            this.latSecondsCol &&
            this.lngMinutesCol &&
            this.lngSecondsCol &&
            (this.transformation !== "GDA94_to_GDA2020_7P" || this.heightCol);
      }
      return result;
   }
   //////////////////////////////////

   get validEmail() {
      // We assume they only put in valid email addresses
      return !!this.email;
   }

   get acceptedEpsg4283() {
      // We assume they only put in valid email addresses
      return !!this.isEpsg4283;
   }

   get validFilename() {
      // We assume they only put in valid filename
      return !!this.outputName;
   }

   get validOutFormat() {
      // We assume they only put in valid email addresses
      return !!this.outFormat;
   }

   get validForm() {
      return this.percentage > 99.99; // Scared of errors.
   }

   get percentage() {
      if (!this.file) {
         return 0;
      }

      let count = 0;
      let parts = 3;

      count += this.validEmail ? 1 : 0
      count += this.acceptedEpsg4283 ? 1 : 0
      count += this.transformation ? 1 : 0

      if (this.isCsv) {
         parts += 2;
         //
         if(this.transformation && this.transformation === "GDA94_to_GDA2020_7P") {
            parts++;
            count += this.heightCol? 1 : 0;
         }

         count += this.latDegreesCol ? 1 : 0
         count += this.lngDegreesCol ? 1 : 0

         if (this.dmsType === "dms") {
            parts += 4;

            count += this.latMinutesCol ? 1 : 0
            count += this.lngMinutesCol ? 1 : 0
            count += this.latSecondsCol ? 1 : 0
            count += this.lngSecondsCol ? 1 : 0
         }

      } else if (this.isShapefile) {
         ["dbf", "shp", "shx"].forEach(key => count += this.fileMap[key] ? 1 : 0)
         parts += 3;
      } else if (this.isSinglefile) {
         // Nothing more, only here to show that there is nothing more.
      }

      return 100 * count / parts;
   }
}