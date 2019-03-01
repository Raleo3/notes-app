# Set Up
In the project root:
* Change Node version to 8
* Run `npm install -g @angular/cli`
* Run `npm install --g lerna`
* Run `lerna bootstrap`
* Open a new terminal
* In Terminal 1, run `cd packages/backEnd && npm start` to kick off node server
* In Terminal 2, confirm Terminal 2 is using Node 8, then run `cd packages/frontEnd && ng serve` to spin up angular dev server
* Navigate to `http://localhost:4200/` in a web browser and test away
