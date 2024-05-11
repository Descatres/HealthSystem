setup

-   create python venv inside rest folder (from root: python -m virtualenv rest)
-   pip install -r requirements.txt
-   .\Scripts\activate to activate venv in the console
-   here you can use django-admin commands, but none is needed for now
-   python manage.py runserver (127.0.0.1:8000)
-   deactivate

deploy

-   we can use EB CLI but nah
-   https://www.awsacademy.com/vforcesite/LMS_Login
-   open lab and go to services
-   open elastic beanstalk
-   there we can deploy
