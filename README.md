## CALLTRONIX

## Prerequisites (What you must have installed)
1. Nodejs
2. Postgres
3. Any Postgres GUI

## Running the code.
1. Create a .env file and copy the structure of the `.env.sample` file into it.
2. Create a postgres Database via your terminal or by using a GUI.
4. Setup the connection string of the DB in the .env on the `POSTGRES_DATABASE_URL` key.
3. Run `npm install` or `yarn install`.

####  Question 1.
1. Run `npm run start_question1`.
2. Open up a GUI / view the inserted data via the terminal under the table `singlereporttable`.

#### Question 2.
1. Run `npm run start_question2`.
2. Open up a GUI / view the inserted data via the terminal under the tables `report` and `client`.


#### Question 3.
1. Make sure you have run question 2 first.
2. Run `npm run start_question3`.
3. Open your browser on localhost port 3000
