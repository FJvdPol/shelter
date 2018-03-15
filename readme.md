<!-- lint disable no-html -->

# Storage

> An Animal Shelter express server working with MySQL database

## Install

Fork this repository, `cd` into it, and:

```bash
npm install
npm run build # build and minify static files
npm start # runs server on `localhost:1902`
```
And, of course, you'll need a database.
## Usage
## 1. Setup database

There are two methods to make a fitting database:
#### Method one: by hand
Create the following tables and columns in the database:
![Database example](/screenshot_databasegraph.png)
Now add a few animals via `localhost:1902/add`!

#### Method two: importing the SQL file
In the projects' db map you'll find a file called `db_animalshelter_backup.sql`   
Make a new MySQL Database and import the sql file via the command line using the following command in the project's root directory:
```
mysql -u [your_username] -p [your_new_database_name] < db/db_animalshelter_backup.sql
```
You will be prompted to enter your account's password and voila, the database is now imported in your new empty database.

## 2. Setup server to work with Database
Point the project to the database by editing the following info in server/index.js:   
(It's recommended that you make use of the package that ships with this project: [dotenv](https://www.npmjs.com/package/dotenv).)
```js
var connection = mysql.createConnection({
  host: /* your database host */, // usually localhost
  user: /* [your_username] */,
  password: /* [your_password] */,
  database: /* [your_new_database_name] */
})
```
## 3. Page usage

after running the server, to see all animals in your database go to:
```
localhost:1902
```
you can see a specific animal via:
```
localhost:1902/IdOfAnimalToSee
```
you can add animals via:
```
localhost:1902/add   
```
you can delete animals from the database by running the following code in the command line:
```
curl --verbose --request DELETE localhost:1902/idOfAnimalToRemove
```

## What did I work on

* For previous work done on this project, check the master branch
* Rewrote the server/index.js to work with a mySQL database instead of a fake database


### What succeeded / failed

Most things in the rewrite went really smooth, the only thing that took some time was writing the right query to get the data from an animal that I wanted.

## Brief description of code

```txt
build.js - crawls new data (probably not needed)
server/ - web server
server/helpers.js - utility functions used in the views to render animals
server/index.js - express server
src/index.css - unprocessed styles
src/index.js - unprocessed scripts
static/ - output of `src` after processing (these are sent to the browser)
view/detail.ejs - ejs template for one animal
view/list.ejs - ejs template for all animals
view/error.ejs - ejs template for errors
```

## Brief description of npm scripts

*   `npm start` — Start the server (on port 1902)
*   `npm test` — Tests the database
*   `npm run lint` — Check browser code and node code for problems
*   `npm run build` — Build browser code

## License

[MIT][] © [Titus Wormer][author]

[MIT][] © [Folkert-Jan van der Pol][student]

[mit]: license

[author]: http://wooorm.com
[student]: https://github.com/FJvdPol

[assignment]: https://github.com/cmda-be/course-17-18/blob/master/week-5.md#storage

[nycacc]: http://nycacc.org
