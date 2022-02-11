# ticking


## Prerequisites

### Backend

1. Klone prosjektet 
2. Lag en venv, Komandoer for virtual env: pip3 install pipenv
3. pipenv shell
4. pipenv install django
5. Kjøre denne når dere er inni i repoet:pip install -r requirements.txt
6. Da kan dere se at dere har de riktige installasjonene med: pip freeze

### Backend førstegangsoppsett
Start I ticking mappa
1. Start venv: pipenv shell
2. (Sjekk at du e på ret plass med: pip freeze )
3. cd backend
4. python3.9 manage.py migrate
5. python3.9 manage.py makemigrations ticking
6. python3.9 manage.py migrate ticking
7. python3.9 manage.py runserver
8. Gå til denne nettaddresen: http://localhost:8000/admin/ 
9. Lag superuser: åpne ny terminal og naviger til backend mappa
10. python manage.py createsuperuser

Vanlig oppstart backend
python manage.py runserver



Nyttige lenker:
http://localhost:8000/api/
http://localhost:8000/api/users/



Errorfix: ModuleNotFoundError: No module named 'corsheaders'
1. pip3.9 install tzdata
2. Pipenv install Django
3. pipenv install djangorestframework django-cors-headers



### Frontend
1. Installer Node.js Version: 16.14.0 (includes npm 8.3.1)





