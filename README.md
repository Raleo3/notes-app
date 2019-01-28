<!-- Have to be on Node 8 -->
<!-- Lerna bootstrap at the root -->
<!-- Then run lerna run init or something, make it the same for both apps...should OPEN angular app -->
<!-- Should be good to go -->
# Set Up
In the project root:
* Change Node version to 8
* Run `npm install --g lerna`
* Run `lerna bootstrap`
* Run `cd packages/backEnd && npm start` to kick of node server
* Open a new terminal and run `cd packages/frontEnd && ng serve` to spin up angular dev server
* Navigate to `http://http://localhost:4200/` in a web browser and test away
