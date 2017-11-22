var config = {
   fmeToken: {
      generate: {
         url: "https://gda2020test-ga.fmecloud.com/fmetoken/service/generate.json",
         username: process.env.ESRI_USERNAME,
         password: process.env.ESRI_PASSWORD
      }
   },

   validHosts: [
      "localhost",
      "qldspatial.information.qld.gov.au",
      ".ga.gov.au",
      "elvis20161a-ga.fmecloud.com",
      "gda2020test-ga.fmecloud.com",
      "s3-ap-southeast-2.amazonaws.com"
   ]
};

module.exports = config;
