# Introduction
It's a demo for visualize page structure in PostgreSQL. We create it as a react app and deploy it on Node.js server. For now, we are using HTML5 canvas for visulization. 
## Getting started
```sh
git clone git@github.com:geekbosszhang/ex.git
cd ex
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
## Run the app in development mode
As a demo project, you can edit the `src/App.js` file, change the data to check the result.</br>
Or you can edit the `src/components/bufferContentViewr.js` to customize it.<br/>
```sh
npm run devstart
```
Then the page will reload automatically if you make edits.
## Deploy the app on Node.js server
To create a production build, use 
```sh
npm run build
```
The build folder is deployed. Then run 
```sh
npm start
```
to start a server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
