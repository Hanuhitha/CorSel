from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'kpradeep'
app.config['MYSQL_DB'] = 'studentportal'
app.secret_key = 'super secret key'  # For flashing messages
app.config['SESSION_TYPE'] = 'filesystem'

mysql = MySQL(app)

@app.route('/')
def Index():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM studflask")
    data = cur.fetchall()
    cur.close()
    return render_template('index2.html', students=data)

@app.route('/insert', methods=['POST'])
def insert():
    if request.method == "POST":
        flash("Data Inserted Successfully")
        try:
            regno = request.form['regno']
            name = request.form['name']
            age = request.form['age']
            email = request.form['email']
            fname = request.form['fname']
            mname = request.form['mname']
            phone = request.form['phone']
            sal = request.form['sal']
            uname = request.form['uname']
            pswd = request.form['pswd']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO studflask (regno, name, age, email, fname, mname, phone, sal, uname, pswd) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (regno, name, age, email, fname, mname, phone, sal, uname, pswd))
            mysql.connection.commit()
            cur.close()
        except KeyError as e:
            flash(f"Missing form field: {e}")
        return redirect(url_for('Index'))

@app.route('/delete/<string:regno>', methods=['GET'])
def delete(regno):
    flash("Record Has Been Deleted Successfully")
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM studflask WHERE regno = %s", [regno])
    mysql.connection.commit()
    cur.close()
    return redirect(url_for('Index'))

@app.route('/update/<string:regno>', methods=['POST'])
def update(regno):
    if request.method == 'POST':
        try:
            name = request.form.get('name', '')
            age = request.form.get('age', '')
            email = request.form.get('email', '')
            fname = request.form.get('fname', '')
            mname = request.form.get('mname', '')
            phone = request.form.get('phone', '')
            sal = request.form.get('sal', '')
            uname = request.form.get('uname', '')
            pswd = request.form.get('pswd', '')
            cur = mysql.connection.cursor()
            cur.execute("""
                UPDATE studflask
                SET name = %s, age = %s, email = %s, fname = %s, mname = %s, phone = %s, sal = %s, uname = %s, pswd = %s
                WHERE regno = %s
            """, (name, age, email, fname, mname, phone, sal, uname, pswd, regno))
            flash("Data Updated Successfully")
            mysql.connection.commit()
            cur.close()
        except Exception as e:
            flash(f"An error occurred: {e}")
        return redirect(url_for('Index'))


if __name__ == "__main__":
    app.run(debug=True)
