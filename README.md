# Artist SPA

## Single Page Application para consumir as informações referentes aos álbuns e artistas


### Pré-requisitos

```
# rodar os containers da API e Keycloak
# veja aqui como: https://github.com/robsondeveloper/artist-api

```

### Como rodar o Front End

```
# clone o repositório
git clone https://github.com/robsondeveloper/artist-spa.git

# acesse a pasta do projeto no terminal/cmd
cd artist-spa

# criar a imagem do projeto
docker build -t robsondeveloper/artist-spa:1 .

# rodar container do frontend
docker run -it -p 8082:80 --rm --name artist-spa robsondeveloper/artist-spa:1
```

## 🛠 Tecnologias

As seguintes tecnologias foram usadas na construção do projeto:

-   **[Docker](https://docs.docker.com/)**
-   **[Vue js](https://vuejs.org/)**
-   **[BootstrapVue](https://bootstrap-vue.org/)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Keycloak](https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc)**

## Autor

Feito por Robson Oliveira da Costa. Entre em contato!

[![Gmail Badge](https://img.shields.io/badge/-robsondeveloper@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:robsondeveloper@gmail.com)](mailto:robsondeveloper@gmail.com)

