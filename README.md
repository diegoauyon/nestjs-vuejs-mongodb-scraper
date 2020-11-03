#

# Build a simple boat site  using Nest.js, Vue.js and MongoDB. Scraped data with Scrapy

Application repo for a simple boat information application built with Nest.js, Vue.js and MongoDB.

Information scraped from https://sailboatdata.com

## Getting Started
This prototype is divided into two separate sections. Namely, the Backend ( Built with Nest.js) and the frontend
( Built with Vue.js ), and the scraped code written with Scrapy in python

## Scrape Data

### Install Dependencies 

This part of the project is written in `python3` and `scrap` (it is better if you used a virtual environment for this)

```bash
pip install -r /path/to/requirements.txt

```
 There are 2 spiders over the `scraper` folder.

The first spider is to get a list of possible proxies. We do it to avoid blocking our IP when starting to scrape data 
from the site. This will generate a `proxies.txt` file that the project will use.

To run this spider:

```bash
(venv) python proxies.py
``` 
The second spider, is written as part of a scrapy project, will use the proxies.txt file to scrap data from the site, later
there is a pipeline configure to insert every record scraped directly to mongodb. Also, it will generate a json file with 
all the records. 

To run this spider:
```bash
(venv) scrapy crawl boats -o boats.json
```

## Run Code

### Clone the repository
To easily set up the application, clone this repository which contains directory for both sections of the project ( i.e `blog-backend` and `blog-frontend`)

```bash
git clone git@github.com:diegoauyon/nestjs-vuejs-mongodb-scraper.git
```

## Change directory into the newly cloned project
```bash
cd nestjs-vuejs-mongodb-scraper
```

## Backend
### Change directory into the backend
```bash
cd be
```

### Install backend dependencies

```bash
npm install
```

After installation, a `postinstall` script will run and try to insert seed data into MongDB

### MongoDB
Ensure that you have mongoDB installed on your machine before running the application.

Start mongoDB:

```bash
sudo mongod
```

### Run the application
Open another terminal and still within the `be` project directory run the application with:

```bash
npm run start:dev
```

This will start the backend application on port `3000`.

## Frontend
Open another terminal from our project navigate to the `ui` folder to set up the frontend

### Frontend dependencies
```bash
cd blog-frontend
npm install
```

### Run the frontend app

```bash
npm run serve
```

### Test the application
Finally, open your browser and view the application on http://localhost:8080

## Prerequisites
 [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/), [MongoDB](https://docs.mongodb.com/v3.2/installation/)

## Built With
[Nest.js](https://nestjs.com/)
[Vue.js](https://vuejs.org/)
[MongoDB]() 

#Docker

There is a docker file for each the backend and the frontend

Also a docker-compose.yml to run everything
