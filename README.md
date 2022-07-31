# VMC Social

Social media for watching film, chat, post blog

## Movie sources

From LokLok App.  
 [https://documenter.getpostman.com/view/18986031/UVXdNeFD](https://documenter.getpostman.com/view/18986031/UVXdNeFD)

## Installation

- Clone the Project
- Run `npm install`
- Create your own firebase project and add _The JSON stringified_ config to `VITE_FIREBASE_CONFIG` environment variable

- Example .env file:

```env
VITE_FIREBASE_CONFIG={"apiKey":"","authDomain":"","projectId":"","storageBucket":"","messagingSenderId":"","appId":""}
```
- Run local project: `npm run dev`

## Main technology used

- React, Typescript, Tailwind
- Zustand (State management)
- SWR (Data fetching)
- Firebase (authentication, comment)
- Swiper (slider)
- react-infinite-scroll-component (Infinite loading)
- Agora (voice call)

## Features

- Full HD movies with subtitles in many languages
- Suggested movies
- Top searches
- Search by name
- Filter by region, categories, periods
- Discovery feature (Short videos like tiktok)
- Watch history
- Comments (require authentication using google, github or mobile phone)
- Voice call
- Watch together
