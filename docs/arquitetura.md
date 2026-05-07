# Documento de Arquitetura do Software

**Projeto:** iService
**Disciplina:** Engenharia de Software II

---

## 1. Visão Geral da Arquitetura

O sistema iService segue uma arquitetura baseada em camadas cliente-servidor, onde o aplicativo móvel (Frontend) atua como cliente consumindo os recursos expostos por uma API RESTful (Backend), que por sua vez gerencia a regra de negócio e a persistência dos dados espaciais e relacionais.

Abaixo, apresentamos o diagrama estrutural detalhado das camadas do sistema, fluxo de dados e serviços externos:

~~~mermaid
flowchart TD
    classDef frontend fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px,color:#000
    classDef backend fill:#ffebee,stroke:#e53935,stroke-width:2px,color:#000
    classDef database fill:#e8f5e9,stroke:#43a047,stroke-width:2px,color:#000
    classDef external fill:#fff3e0,stroke:#fb8c00,stroke-width:2px,color:#000

    subgraph Cliente ["Camada de Apresentação (Frontend Mobile)"]
        UI["Interface e Componentes\n(React Native / NativeBase)"]
        GPS["Módulo Nativo de Localização\n(Expo Location)"]
        ClientAPI["Integração de Rede\n(Axios / Fetch)"]

        UI --> GPS
        UI --> ClientAPI
    end

    subgraph Servidor ["Camada de Aplicação (NestJS Backend)"]
        Controllers["Controllers REST\n(Endpoints e Roteamento)"]
        Guards["Segurança e Auth\n(Guards JWT / Estratégias)"]
        Services["Serviços de Negócio\n(Matchmaking, Radar, Users)"]
        ORM["Camada de Persistência\n(TypeORM)"]

        Controllers --> Guards
        Controllers --> Services
        Services --> ORM
    end

    subgraph Persistencia ["Camada de Dados (Container Docker)"]
        Postgres[("PostgreSQL\n(Banco de Dados Relacional)")]
        PostGIS{{"PostGIS\n(Motor de Inteligência Espacial)"}}

        Postgres --- PostGIS
    end

    subgraph Externo ["Serviços e APIs Externas"]
        Google["Google OAuth 2.0\n(Provedor de Identidade)"]
    end

    ClientAPI == "HTTP/JSON\n(Requisições API)" ==> Controllers
    Guards -. "Valida Autenticação Social" .-> Google
    ORM == "TCP/IP\n(Queries SQL/Espaciais)" ==> Postgres

    class UI,GPS,ClientAPI frontend;
    class Controllers,Guards,Services,ORM backend;
    class Postgres,PostGIS database;
    class Google external;
~~~

---

## 2. Tabela de Tecnologias

A stack tecnológica foi selecionada visando alta performance em consultas geográficas, tipagem rigorosa para evitar falhas em tempo de execução e facilidade de desenvolvimento mobile cross-platform.

| Mecanismo de Análise | Tecnologia de Implementação | Justificativa/Responsabilidade |
|:---|:---|:---|
| **Frontend** | React Native + Expo | Desenvolvimento multiplataforma (iOS e Android) com base de código única e fácil integração com APIs de sensores nativos (GPS). |
| **Backend** | NestJS (Node.js) + TypeScript | Arquitetura escalável, tipagem estática e segura, e organização modular (Injeção de Dependências) para APIs robustas e de fácil manutenção. |
| **Persistência** | PostgreSQL + extensão PostGIS | Armazenamento relacional sólido combinado com suporte nativo a cálculos e consultas geoespaciais avançadas (ex: busca em raio e cruzamento de coordenadas). |
| **Containerização** | Docker | Padronização do ambiente de desenvolvimento, isolando dependências e evitando problemas de compatibilidade entre os desenvolvedores da equipe. |

---

## 3. Implantação e Infraestrutura Física

O projeto adota uma estratégia de execução conteinerizada para garantir a paridade entre os ambientes de desenvolvimento de todos os membros da equipe.

**Estratégia de Execução Simplificada:**
A implantação e execução local do sistema é orquestrada via **Docker Compose**. O arquivo `docker-compose.yml` declara e conecta os serviços essenciais de forma isolada:

1. **Container de Banco de Dados:** Levanta uma imagem oficial do PostgreSQL já com a extensão PostGIS instalada, mapeando as portas padrão e configurando volumes para que os dados não sejam perdidos ao desligar a máquina.
2. **Container da Aplicação (Opcional p/ Dev):** A API NestJS pode ser executada via Docker ou diretamente no host (`npm run start:dev`) conectando-se ao container do banco de dados exposto.

---

## 4. Descrição Detalhada dos Componentes

A arquitetura do iService foi decomposta metodologicamente para garantir a Separação de Conceitos (Separation of Concerns - SoC), facilitando testes, manutenibilidade e escalabilidade.

### 4.1. Componente Frontend (Apresentação / Mobile)
* **Responsabilidade:** Atuar como a interface primária de interação humana, capturando intenções do usuário (solicitar serviço, aceitar, cancelar) e renderizando as respostas de forma intuitiva.
* **Módulo de Geolocalização:** Utiliza a biblioteca `expo-location` para solicitar permissões nativas ao Sistema Operacional (Android/iOS) e extrair a Latitude e Longitude exatas do dispositivo no momento de criar uma demanda ou abrir o radar.
* **Comunicação:** O gerenciamento de requisições HTTP é feito de forma assíncrona. Os tokens JWT de autenticação são mantidos em armazenamento seguro no aparelho e anexados no cabeçalho (Header `Authorization: Bearer`) de todas as chamadas para o Backend.

### 4.2. Componente Backend (Lógica de Negócios e API REST)
* **Responsabilidade:** Receber, validar, processar e responder às requisições do Frontend, garantindo que as regras de negócio sejam estritamente aplicadas.
* **Estrutura Interna (Padrão NestJS):**
  * **Controllers:** Portas de entrada da API. Recebem o payload JSON e delegam a ação. Exemplo: `JobsController` recebe as coordenadas em formato texto.
  * **Guards & Decorators:** Interceptadores de segurança. O `JwtAuthGuard` barra tentativas de acesso sem token válido, enquanto o `RolesGuard` assegura que apenas usuários com a role `PROFESSIONAL` possam acessar a rota de radar.
  * **Services:** O núcleo das regras de negócio. O `JobsService`, por exemplo, converte as strings de coordenadas em tipos espaciais precisos e gerencia o matchmaking.

### 4.3. Componente Banco de Dados (Persistência e Motor Espacial)
* **Responsabilidade:** Armazenar os dados de forma persistente, relacional e realizar cálculos matemáticos de distância geográfica em tempo real.
* **PostgreSQL + TypeORM:** O banco armazena entidades como `Users`, `Profiles`, `Jobs` e `Ratings`. O TypeORM faz o mapeamento objeto-relacional, eliminando a necessidade de queries SQL manuais para operações de CRUD.
* **O Motor PostGIS:** É a peça-chave do projeto. Em vez do Backend calcular a distância via código matemático, o banco utiliza o tipo espacial `GEOMETRY(Point)`. Isso permite o uso da função `ST_DWithin`, processando o raio do radar diretamente na memória do banco de dados com índices em árvore (GIST).

### 4.4. Integrações e Serviços Externos
* **Google OAuth 2.0:** Componente acoplado ao módulo de autenticação. É utilizado para acelerar a entrada de novos usuários (Single Sign-On). O Backend valida tokens do Google via biblioteca `google-auth-library` antes de emitir o JWT interno da plataforma iService.