# elvis-positioning
GDA94 to GDA2020 data transformation

Preparing to develop

* git clone https://github.com/Tomella/elvis-positioning.git 
* npm install
* bower install

That's assuming you already have a working node version and development environment. The latest incarnation is built against 12.x of node. If not then [get node](https://nodejs.org/en/download/) and installlbower with `npm install -g bower`

You will get warnings about bower being deprecated but remember this app was written years ago. Feel free to update the packaging to something newer.

Once you are sure you have everything to run OK there are some system variables needed to run the 
* PORT optional port to run the server on. The default is 3000
* ESRI_USERNAME Used to get a token for calling the FME service that does the transformation. If not set it will try and proxy it but it probably isn't going to be that reliable.
* ESRI_PASSWORD As above.

Now we are ready to run from the base directory of the project.
1. `gulp` Get the automated build happening.
2. `node server` Get the server running
3. [Open the page](http://localhost:3000)
4. Happy code changes. Refresh the browser on updates and all should be good.

I expect that if you are developing against this code base then I have probably left. You have probably cloned the project somewhere that you can make updates. If you have done that don't forget to update the deployment script to match under `code_deploy/static_deploy`

Last thing. The server does not run in production. The code is static. The services are provided through the fsdf-elevation project. Again, if you want to redo it, feel free. 