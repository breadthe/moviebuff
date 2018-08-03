# movie-buff

*Migrated from GitLab @v0.2*

> Vue movie tracking app

Live demo: [http://moviebuff.surge.sh/](http://moviebuff.surge.sh/)

- Search for movies and save them to a wish-or-seen list.
- Mark wishlist movies as seen.
- Add additional metadata to movies in the seen list, such as movie theatre, date and time, ticket price, etc.
- View details for individual movies.
- Since the data is stored in your browser window, you can export it as JSON and later import it.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Config
Copy `config/environment.default.js` -> `config/environment.js` and add your API keys.
Copy `index.default.html` -> `index.html` and add your Google Places API key.

## Surge
Publish to Surge.sh. In `public` folder create file named `CNAME` and put in the desired domain, in this case `moviebuff.surge.sh`.

Run the build task
``` bash
yarn run build
```

Then deploy to Surge.
``` bash
surge ./dist --domain moviebuff.surge.sh
```
