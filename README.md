# Progressive Web Apps @cmda-minor-web · 2019-2020

## Tables of Contents
* [Assignment](#Assignment)
* [Concept](#Concept)
* [Progressive Web Application](#Progressive-Web-Application)
    * [What is a Progressive Web Application?](#What-is-a-Progressive-Web-Application?)
    * [What is a Manifest.json?](#What-is-a-Manifest.json?)
    * [What is a Service Worker?](#What-is-a-Service-Worker?)
* [Critical Rendering Path](#Critical-Rendering-Path)
    * [What is a 'Critical Rendering Path'?](#What-is-a-'Critical-Rendering-Path'?)
    * [Performance Enhancements](#Performance-Enhancements)
* [API](#API)
* [Conclusion](#Conclusion)
* [Install notes](#Install-notes)
* [Credits](#Credits)
<!-- * [Learnings during this course](#Learnings-during-this-course) -->
<!-- * [What I wanted to implement](#What-I-wanted-to-implement) -->

<hr>

## Assignment
In this course we will convert the client side web application previously made at the OBA into a server side rendered application. We also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Ultimately we are going to implement a series of optimisations to improve the performance of the application.

<hr>

## Concept
I made a webapp where you can explore movies and series. The user can navigate through different pages which are all rendered server side. Every detail page has more details about that movie or serie. Because the data of films and series differ from each other, these pages have different content.

<img src="https://user-images.githubusercontent.com/45365598/77164871-71400c80-6ab1-11ea-850d-fe8e299b27f3.png">

**Small features**  
- [x] By using a Service Worker every page visited can be visited when the user has no internet
- [x] Because images are loading slowly I prevented these images from reflowing the page by giving them a width, height and background-color 

<hr>

## Progressive Web Application

<!-- * [What is a Progressive Web Application?](#What-is-a-Progressive-Web-Application?)
* [What is a Manifest.json?](#What-is-a-Manifest.json?)
* [What is a Service Worker?](#What-is-a-Service-Worker?) -->

### What is a Progressive Web Application?
> "Progressive Web Apps (PWA) are built and enhanced with modern APIs to deliver native-like capabilities, reliability, and installability while reaching anyone, anywhere, on any device with a single codebase."  
Source: https://web.dev/what-are-pwas/

### What is a Manifest.json?
Recently Chrome added a support for 'installing web apps to homescreen'. This way you could add a website to your homescreen and go to that website like it's an app.

To let the browser know that's a installable app you've to write a manifest.json file. The file contains all kinds of properties like the name, the icons, start url and a theme color. This way you can 'customize' how the 'app' will look.

### What is a Service Worker?
A Service Worker is a type of `web worker`. It's a Javascript file which runs seperate from the browser. It's a proxy that let's you control how requests on the page are handled.

**My Service Worker**  
My webapp has a lot of detailpages which I don't want to cache, because there are to many, especially if I would scale the webapp. 
Therefore I cached a few of my files in the `Core Assets` which are as follows:

```js
const CORE_ASSETS = [
    '/',
    '/movies',
    '/series',
    '/offline',
    '/css/index.css'
]
```

It contains my main html/home file and the two other overview pages. I also added a css file to make sure there is always styling even when the user is offline. And last but not least there is a offline page which renders if the user is offline and does a request on a page which is not in the cache.

To render the requests that are in my `core assets` I wrote the following function: 

```js
self.addEventListener('fetch', (event) => {
    if (CORE_ASSETS.includes(getPathName(event.request.url))) {
        event.respondWith(
            caches.open(CORE_CACHE_VERSION)
                .then(cache => cache.match(event.request.url))
        )
```

If the request is not in the `core assets` I wrote a else statement to render that page if the user is 'online' or render the offline page if the user is offline.

```js
else if (event.request.headers.get('accept').indexOf('text/html') > -1)) {
        event.respondWith(
            caches.open(CORE_CACHE_VERSION)
                .then(cache => cache.match(event.request.url))
                .then(response => response ? response : fetchPage(event.request))
                .catch(() => caches.open(CORE_CACHE_VERSION)
                    .then(cache => cache.match('/offline'))
                )
        )
    }
```

<hr>

## Critical Rendering Path

### What is a 'Critical Rendering Path'?
**What**  
> "The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen. The critical rendering path includes the Document Object Model (DOM), CSS Object Model (CSSOM), render tree and layout."  
Source: https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path

**How**  
By optimizing the Critical Render Path the perfomance of you webapplication improves. You can achieve this by:  
Minimize the filesize of critical files and optimize the order by prioritizing the files when they need to be called/loaded.

### Performance Enhancements
`Perceived Load Speed`  
Because my webapp is really small it was hard to improve the speed. I did the regular compressing and compiling because I had no experience what so ever in this. Through this process I learned a lot about `Gulp` and `NPM` in general because I had 0 experience with both. Now I see the use of NPM packages more.

`Visual Stability`  
Because my application has a lot of images and not everybody has a good quality internet connection, I decided to focus on preventing my page from reflowing while the images are loading. I did this to all of the overview pages. 

<br>

**1. Zero State**  
First I ran a audit without any compiling or compressing enabled. This way I could see the progression of the speed from my webapplication.

<details><summary>Audit screenshot</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/78018382-14184680-734e-11ea-923f-059666c84287.png">

</details>

<br>

**2. Visual stability**  
I've throttled my network to `Slow 3G` and noticed that my page was reflowing all over the place so I added a fixed width, height and background color to the images to prevent them reflowing my pages.

<details><summary>Screenshot</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/78018601-7a9d6480-734e-11ea-99f2-233f7298e47c.png">


</details>

<br>

**3. Minifying CSS**  
This was the first time for me to compress and compile multiple CSS files into one. I've used `Gulp` for this and wrote a task to do the compiling and minifying for me. I found it really hard to understand in the beginning but after a few examples and reading some documentation I was quite easy. In my project `Browser Technologies` I've also added a Gulp file and I noticed that was way easier for me because I knew what I was doing.

<details><summary>Audit screenshot</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/78018377-12e71980-734e-11ea-8269-ff70b1682b1c.png"> 

</details>

<br>

**4. Minifying HTML**  
To minify my HTML I've used a `NPM package` called '`express-minify-html-2`'. You can use it in your `server.js` and give up a object with settings you want to use to minify the HTML. The settings I used where: 

```js
removeComments: true,
collapseWhitespace: true,
collapseBooleanAttributes: true,
removeAttributeQuotes: true,
removeEmptyAttributes: true,
minifyJS: true
```

<details><summary>Audit screenshot</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/78018379-137fb000-734e-11ea-8d53-14092ebad26f.png">

</details>

<br>

**5. GZIP Compression**
For this I've used the `NPM package`: `compression`. This tool makes sure that the json response and other static file responses are smaller. 

`How to implement`
```js
const compression = require('compression')

app.use(compression())
```

<details><summary>Audit screenshot</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/78018369-0fec2900-734e-11ea-8f5d-27220dd8b22a.png">

</details>

<br>

**6. Added Service Worker**
For more details about my Service Worker go to: [What is a Service Worker?](#What-is-a-Service-Worker?)
<details><summary>Audit screenshot</summary>
	
<img src="https://user-images.githubusercontent.com/45365598/78018369-0fec2900-734e-11ea-8f5d-27220dd8b22a.png">

</details>

<hr>

## API
For this project I used `the Movie Database API` which is a really big and good structured database. It has data about:
* Movies
* TV episodes
* Reviews  

<details><summary>Example data structure:</summary>

```json
{
  "adult": false,
  "backdrop_path": "/8HqSxB9VLJkbRXRdlocbLq9wxwY.jpg",
  "belongs_to_collection": {
    "id": 141290,
    "name": "The Lord of the Rings Animated Collection",
    "poster_path": "/pQuazFOlGRdn2Lb3oWFJYPeASOc.jpg",
    "backdrop_path": "/uUG532EWfyhtKDzsA0sLb1PsHhL.jpg"
  },
  "budget": 4000000,
  "genres": [
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 10751,
      "name": "Family"
    }
  ],
  "homepage": "",
  "id": 123,
  "imdb_id": "tt0077869",
  "original_language": "en",
  "original_title": "The Lord of the Rings",
  "overview": "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
  "popularity": 10.44,
  "poster_path": "/1l3WpoF7TX9pOprX4XepCXjQXUV.jpg",
  "production_companies": [
    {
      "id": 60,
      "logo_path": "/oJXpAs4I3W46e4dkaOEzCa4yBko.png",
      "name": "United Artists",
      "origin_country": "US"
    },
    {
      "id": 286,
      "logo_path": null,
      "name": "Fantasy Films",
      "origin_country": ""
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1978-11-15",
  "revenue": 30471420,
  "runtime": 132,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Fantasy...beyond your imagination",
  "title": "The Lord of the Rings",
  "video": false,
  "vote_average": 6.5,
  "vote_count": 415
}
```

</details>

This API has a developer website where you can try out different types of calls to the API where you get a result immediately. This way you can check if that request get's you the data that you want.

`!IMPORTANT | You need a account to get a API key`

<hr>

## Conclusion
**Leerdoelen**
> "Je snapt het verschil tussen client side en server side renderen en kan server side rendering toepassen voor het tonen van data uit een API"

By rendering my webapp server side I've managed to create a webapp which works perfectly fine without any Javascript. I also put some time in making the app responsive.

<br>

> "Je begrijpt hoe een Service Worker werkt en kan deze in jouw applicatie op een nuttige wijze implementeren."

My service worker caches all the core assets of my webapp and can ben served to the user. I've also implemented a way that the user can go to a page, which is not in the cache, and get's a message that he's offline.

<br>

> "Je begrijpt hoe de critical render path werkt, en hoe je deze kan optimaliseren"

To optimize the critical render path I've done a few methods of compressing and compiling. Which results in a fast first view. I also paid attention to retrieve important files in order to improve the web app. Because my webapp doesn't have any client side Javascript the Time to Interaction is the same as First View.

<hr>

## Install notes
1. Clone this repo from github
2. `https://github.com/Choerd/progressive-web-apps-1920.git`
3. Install or make sure you've installed `nodejs` and `npm`
4. Install all node-modules by the command `npm install`
5. Use the webapplication by the command `npm start`
6. Open a browser and go to: `http://localhost:3000/`

<hr>

<!-- ## Learnings during this course

<hr>

## What I wanted to implement

<hr> -->

## Credits
A overview from the people who inspired or helped me during this course
* Understanding and resulted in a working Service Worker (**Declan**)
    * For this course we had to implement a Service Worker so that the user could visit the core pages when the user is offline. A Service Worker also helps for rendering files in the cache faster. I've used Declan's code to discover how to approach the implementation of a Service Worker.
     > `https://github.com/Choerd/progressive-web-apps-1920/blob/master/static/service-worker.js`