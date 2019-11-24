# JL-Conservadora

## Instalação

- cd frontend 
- npm install

- cd backend 
- compoer install
- cp .env.example .env
- php artisan key:generate
- php artisan passport:install 

### Modifique os dados do banco no arquivo .env para as configurações de seu banco de dados

- php artisan migrate
- php artisan db:seed

## Rodando o projeto
- cd frontend && npm start
- cd backend && php artisan serve
