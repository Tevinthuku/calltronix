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
![image](https://user-images.githubusercontent.com/12128153/65558660-606a7000-df40-11e9-966e-249a14a68730.png)


#### Question 2.
1. Run `npm run start_question2`.
2. Open up a GUI / view the inserted data via the terminal under the tables `report` and `client`. 
   Normalization has been done for the 2 tables `client` and `report`.
![image](https://user-images.githubusercontent.com/12128153/65558733-9f002a80-df40-11e9-800c-192884a7104f.png)
![image](https://user-images.githubusercontent.com/12128153/65558747-a45d7500-df40-11e9-9b89-610d05d5452a.png)

#### Question 3.
1. Make sure you have run question 2 first.
2. Run `npm run start_question3`.
3. Open your browser on localhost port 3000
![image](https://user-images.githubusercontent.com/12128153/65558801-c1924380-df40-11e9-970d-67be044fa987.png)
