# [](<[https://github.com/Gabriel-Monteiro7/TaskManagement](https://github.com/Gabriel-Monteiro7/TaskManagement)>>) :large_blue_diamond: Gerenciador de tarefas

## [](<[https://github.com/Gabriel-Monteiro7/TaskManagement](https://github.com/Gabriel-Monteiro7/TaskManagement)#Descrição>)Descrição

Desenvolver uma aplicação que simule um gerenciador de tarefas, sendo o backend construído em Node JS e o frontend em Angular.

## [](<[https://github.com/Gabriel-Monteiro7/TaskManagement](https://github.com/Gabriel-Monteiro7/TaskManagement)#CondiçãodoProjeto>)Condição do Projeto

Implementar um sistema de lista de tarefas (ToDo), onde o usuário possa criar, excluir ou concluir uma tarefa. As requisições deverão ser feitas por meio de uma api para cada ação. O usuário deverá fazer login na aplicação com um email e uma senha.

## [](<[https://github.com/Gabriel-Monteiro7/TaskManagement](https://github.com/Gabriel-Monteiro7/TaskManagement)#Visualização>)Visualização

### Prévia

![preview](https://github.com/Gabriel-Monteiro7/TaskManagement/blob/master/.github/preview.gif)

---

### Login

![Login](https://github.com/Gabriel-Monteiro7/TaskManagement/blob/master/.github/login.png)

---

### Home

![Home](https://github.com/Gabriel-Monteiro7/TaskManagement/blob/master/.github/home.png)

---

### Registro

![Register](https://github.com/Gabriel-Monteiro7/TaskManagement/blob/master/.github/register.png)

---

## [](<[https://github.com/Gabriel-Monteiro7/TaskManagement](https://github.com/Gabriel-Monteiro7/TaskManagement)#tecnologias>)Tecnologias utilizadas

Para o desenvolvimento do projeto foi utilizada as seguintes tecnologias:

- :atom: **Node Js** — É uma plataforma desenvolvida sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis;
- :a: **Angular 9** — É uma plataforma de Aplicações web de código-fonte aberto e front-end baseado em TypeScript.
- :oil_drum: **Knex** — Builder de SQL Query para Javascript
- :framed_picture: **Lottie** — É uma biblioteca que analisa animações do Adobe After Effects exportadas como json e as cria nativamente no celular e na web!
- :framed_picture: **sweetalert2** — Um substituto bonito, responsivo, personalizável e acessível para as caixas pop-up do javascript
- :whale2: **Docker** — É um software que garante maior facilidade na criação e administração de ambientes isolados, garantindo a rápida disponibilização de programas para o usuário final.

## Instalação

```
# Clone o repositório
git clone git@github.com:Gabriel-Monteiro7/TaskManagement.git

# Vá para o diretório principal
cd TaskManagement
```

```
# Vá para o diretório do servidor
cd server

# Inicie o Docker compose para usar o Banco Postgres
docker-compose up -d

# running on port 8080

# Credenciais configuradas no Docker

	database:  "management",
	user:  "management",
	password:  "root",
	port:  "8080"

# Instale as dependencias
npm install

#Credenciais configuradas no KnexFile

{
	client:  "pg",
	connection: {
		post:  "localhost",
		database:  "management",
		user:  "management",
		password:  "root",
		port:  "8080"
	}
}

# Execute as migrations
npm run knex:migrate

# Rode a API
npm run dev

# running on port 3333
```

```
# Vá para o diretório FrontEnd
cd web

# Instale as dependências
npm install

# Inicie o servidor do frontEnd
ng serve

# running on port 4200
```

## [](<[https://github.com/Gabriel-Monteiro7/TaskManagement](https://github.com/Gabriel-Monteiro7/TaskManagement)#autor>):man_technologist: Autor

- **Gabriel Monteiro** - [GitHub](https://github.com/Gabriel-Monteiro7) - Email: [gabrielmont713@gmail.com](mailto:gabrielmont713@gmail.com)
