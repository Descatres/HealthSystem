setup

-   create python venv inside rest folder (from root: "py -3.11 -m venv rest" - MAKE SURE PYTHON 3.11 IS INSTALLED)
-   cd .\rest
-   .\Scripts\activate to activate venv in the console
-   pip install -r requirements.txt
-   here you can use django-admin commands, but none is needed for now
-   python manage.py runserver (127.0.0.1:8000)
-   from here we can develop the django backend. any packages needed must be added with the venv activated and then "pip freeze > requirements.txt" (MANDATORY)
-   deactivate

deploy

-   we can use EB CLI but nah
-   https://www.awsacademy.com/vforcesite/LMS_Login
-   open lab and go to services
-   open elastic beanstalk
-   there we can deploy

-   upload .zip file with rest folder with only:

    -   rest django folder
    -   .ebtextensions
    -   requirements.txt, manage.py and db.sqlite3

-   wait for helth ok :D
