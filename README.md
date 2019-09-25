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
2. Open up a GUI / view the inserted data via the terminal under the tables `client`, `report` , `question`, `questionsubtype`, `store`. 
   Normalization has been done to create 5 tables `client`, `report` , `question`, `questionsubtype`, `store`.
![image](https://user-images.githubusercontent.com/12128153/65578387-641ce780-df7e-11e9-8935-90a7c08987a4.png)
![image](https://user-images.githubusercontent.com/12128153/65578444-7860e480-df7e-11e9-9325-ecdb40902d80.png)
![image](https://user-images.githubusercontent.com/12128153/65578465-831b7980-df7e-11e9-9f39-e710e6a97145.png)
![image](https://user-images.githubusercontent.com/12128153/65578485-8adb1e00-df7e-11e9-9636-6cef151da9ff.png)
![image](https://user-images.githubusercontent.com/12128153/65578521-97f80d00-df7e-11e9-9303-21f8509f9e9a.png)
![image](https://user-images.githubusercontent.com/12128153/65578538-a0504800-df7e-11e9-8cf1-ec7e318cd165.png)

#### Question 3.
1. Make sure you have run question 2 first.
2. Run `npm run start_question3`.
3. Open your browser on localhost port 3000
![image](https://user-images.githubusercontent.com/12128153/65558801-c1924380-df40-11e9-970d-67be044fa987.png)

#### Schema
Schema is in `db/schema.js`
