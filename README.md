# ticking
En nettside for kjøp og salg av billetter til sosiale arrangement.




## Førstegangsoppsett

### Backend førstegangsoppsett
1. Installer **python3.9**
2. Klone prosjektet 
3. Installer venv: **pip3.9 install pipenv**
4. Gå inn i venv: **pipenv shell**
5. **pipenv install django**
6. Kjøre denne når dere er inni i repoet: **pip install -r requirements.txt**
7. Da kan dere se at dere har de riktige installasjonene med: **pip freeze**
8. **cd backend**
9. **pipenv install djangorestframework django-cors-headers**
10. **python3.9 manage.py migrate**
11. **python3.9 manage.py makemigrations ticking**
12. **python3.9 manage.py migrate ticking**
13. **python3.9 manage.py runserver**
14. sjekk at loginvinduet dukker opp når du går til denne nettsiden: http://localhost:8000/admin/ 
15. Lag superuser: åpne ny terminal og naviger til **backend** mappa
17. **pipenv shell**
18. **python manage.py createsuperuser**
19. Lag superuser og logg inn på admin-siden



### **Errorfix:** ModuleNotFoundError: No module named 'corsheaders'
Dersom du får denne feilmeldingen under backend-førstegangsoppsettet, gjør følgende:
1. ~~pip3.9 install tzdata~~
2. ~~Pipenv install Django~~
3. pipenv install djangorestframework django-cors-headers


## Frontend førstegangsoppsett
1. Installer Node.js Version: 16.14.0 (includes npm 8.3.1)
2. **cd frontend**
3. **npm install**
4. **npm i redux react-redux redux-thunk redux-devtools-extension**
5. **npm i react-router-dom**
6. **npm start**
7. Gå til: http://localhost:3000




## Vanlig oppstart

### Vanlig oppstart backend
1. Start I ticking mappa
2. Start venv: **pipenv shell**
3. Sjekk at du e på rett plass/får opp req. lista med: **pip freeze**
4. **cd backend**
5. **python3.9 manage.py runserver**



### Nyttige backend lenker:
http://localhost:8000/admin/

http://localhost:8000/api/

http://localhost:8000/api/users/




### Vanlig oppstart frontend
1. **cd frontend**
2. **npm start**
3. Gå til: http://localhost:3000

### Nyttige frontend verktøy
Chrome-addon for å se Redux-state, actions og feilmeldinger
- **Redux DevTools** https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

VS Code Extension for å autoformatere jsx, html, css, og mer kode
- **Prettier - Code formatter** https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode 


### For å teste backend
1. Start i ticking mappa
2. Start venv: **pipenv shell**
3. **cd backend**
4. **py manage.py test**







