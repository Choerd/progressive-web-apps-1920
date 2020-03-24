# Progressive Web Apps @cmda-minor-web · 2019-2020

## Tables of Contents
* [Assignment](#Assignment)
* [My Progressive Webapp](#My-Progressive-Webapp)
* [Performance Enhancements](#Performance-Enhancements)
* [API](#API)
* [Install notes](#Install-notes)
* [Learnings during this course](#Learnings-during-this-course)
* [What I wanted to implement](#What-I-wanted-to-implement)
* [Credits](#Credits)

<hr>

## Assignment
In this course we will convert the client side web application previously made at the OBA into a server side rendered application. We also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Ultimately we are going to implement a series of optimisations to improve the performance of the application.

<hr>

## My Progressive Webapp
**Concept**  
I made a webapp where you can explore movies and series. The user can navigate through different pages which are all rendered server side. Every detail page has more details about that movie or serie. Because the data of films and series differ from each other, these pages have different content.

<img src="https://user-images.githubusercontent.com/45365598/77164871-71400c80-6ab1-11ea-850d-fe8e299b27f3.png">

**Features**  
- [x] By using a Service Worker every page visited can be visited when the user has no internet
- [x] Because images are loading slowly I prevented these images from reflowing the page by giving them a width, height and background-color 

<hr>

## Performance Enhancements

**1. Visual stability**

<details><summary>Audit screenshot</summary>
	


</details>

<br>

**2. Minifying CSS**

<details><summary>Audit screenshot</summary>
	
    

</details>

<br>

**3. Minifying HTML**

<details><summary>Audit screenshot</summary>
	
    

</details>

<br>

**4. Compressing response body**

<details><summary>Audit screenshot</summary>
	
    

</details>

<br>

**5. Added Service Worker**

<details><summary>Audit screenshot</summary>
	
    

</details>

<hr>

## API
For this project I used `the Movie Database API` which is a really big and good structured database. It has data about:
* Movies
* TV episodes
* Reviews  

You can retreive the data by all different parameters which you can test at their website.

`!IMPORTANT | You need a account to get a API key`

<hr>

## Install notes
1. Clone de repo van Github
2. `https://github.com/Choerd/progressive-web-apps-1920.git`
3. Installeer of zorg ervoor dat je `nodejs` en `npm` geinstalleerd hebt.
4. Installeer alle node modules met `npm install`
5. Gebruik de applicatie met `npm start`
6. Open een browser en ga naar `http://localhost:3000/`

<hr>

## Learnings during this course

<hr>

## What I wanted to implement

<hr>

## Credits
A overview from the people who inspired or helped me during this course
* Understanding and resulted in a working Service Worker (**Declan**)
    * For this course we had to implement a Service Worker so that the user could visit the already visited pages when the user is offline. A Service Worker also helps for rendering files that are in the cache faster. I've used Declan's code to discover how to approach this and used his code to let my Service Worker work well.
     > `https://github.com/Choerd/progressive-web-apps-1920/blob/master/static/service-worker.js`