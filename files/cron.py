import mysql.connector

config = {
  'user': 'jason',
  'password': 'P455w3rd',
  'host': '127.0.0.1',
  'database': 'dc',
  'raise_on_warnings': True
}

cnx = mysql.connector.connect(**config)
mycursor = cnx.cursor()

mycursor.execute("SELECT * FROM Player")
myresult = mycursor.fetchall()

for x in myresult:
  print(x)

cnx.close()