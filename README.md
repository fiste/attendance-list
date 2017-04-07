Attendance list
=======================

## Setup & running development server

Run `yarn`.
Run `npm start`.  
This will start a local development server that will
recompile the code, create bundle and start web server.  
You can view the app at <a href="http://localhost:4000/" target="_blank">http://localhost:4000/</a>.

## Building for production

Run `npm build`.  
This should build all artifacts into the `./dist` directory.
Make sure the server is setup so that any request serves the index.html file so that client routing can work.
