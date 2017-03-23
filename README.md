# Using create-react-app with Express.js
## Getting started
```
npm install
```
```
npm run build
```
```
npm start
```
You can open at localhost:3000
## Running with Docker
Create an image named exdocker
```
docker build -t exdocker
```
Start a container named exdocker at port 3000
```
docker run --name=exdocker -p 3000:3000 exdocker
```
