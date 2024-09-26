# Student Portal - Flask Python
## Project Description

The Student Portal is a web application built using Flask, a lightweight WSGI web application framework in Python. This application allows for the management of student data, providing an interface for both administrators and students. 

### Features

1. **User Authentication:**
   - Admin Login: Admin users can log in to access the admin panel for managing student data.
   - Student Login: Students can log in to view their personal data but cannot make changes.

2. **Admin Panel:**
   - **Create:** Admins can add new student records.
   - **Read:** Admins can view all student records in a structured table.
   - **Update:** Admins can update existing student records.
   - **Delete:** Admins can delete student records.
   - Flash messages are used to provide feedback to the user after operations such as insertions, updates, and deletions.

3. **Data Management:**
   - Displays student information including registration number, name, age, email, phone number, father's name, mother's name, and salary.
   - Utilizes modal forms for adding and updating student data, providing a seamless user experience.

4. **Responsive Design:**
   - The user interface is built using Bootstrap to ensure the application is responsive and user-friendly.

### Technologies Used

- **Backend:** Flask, Flask-MySQLdb
- **Frontend:** HTML, CSS (Bootstrap), JavaScript
- **Database:** MySQL
- **Version Control:** Git

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kpradeep-UK/StudentPortal-Flask-Python.git
   
2. **Navigate to the project directory:**
   cd StudentPortal-Flask-Python
   
3.**Create a virtual environment:**
  python -m venv venv
  
4.**Activate the virtual environment:**
  On Windows:
  venv\Scripts\activate
  
  On macOS/Linux:
  source venv/bin/activate
  
5.**Install the dependencies:**
  pip install -r requirements.txt
  
6.**Set up the MySQL database:**
  Ensure MySQL is installed and running.
  Create a database named studentportal.
  Create a table named studflask with appropriate fields.
  
7.**Run the application:**
  python myflask.py
  
8. **Open your web browser and go to:**
  http://localhost:5000





  
