var config = {
   fmeToken: {
      generate: {
         // Only left username/password here as an example. This is now redundant.
         // username: process.env.ESRI_USERNAME,
         // password: process.env.ESRI_PASSWORD,
         url: "https://elvis2018-ga.fmecloud.com/fmetoken/service/generate.json", // Used to generate a token
         tokenUrl: "http://elevation.fsdf.org.au/token" // Only used where there is no token username and password
      }
   },

   validHosts: [
      "localhost",
      "qldspatial.information.qld.gov.au",
      ".ga.gov.au",
      "elvis20161a-ga.fmecloud.com",
      "elvis2018-ga.fmecloud.com",
      "s3-ap-southeast-2.amazonaws.com"
   ]
};

module.exports = config;
