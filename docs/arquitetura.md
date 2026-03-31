Documento de Arquitetura do Software

- **Visão Geral:**
    Figura/Diagrama representando as camadas do sistema (Frontend e Backend).

- **Tabela de Tecnologias:**

| Mecanismo de Análise | Tecnologia de Implementação | Justificativa/Responsabilidade |
|:---|:---|:---|
| **Frontend** | ReactNative + expo | Desenvolvimento multiplataforma e integração com APIs. |
| **Backend** | NestJS (Node.js) + TypeScript | Arquitetura escalável, tipagem segura e organização modular para APIs robustas. |
| **Persistência** | PostgreSQL + extensão PostGIS | Armazenamento relacional + suporte a consultas geoespaciais avançadas. |
| **Containerização** | Docker | Padronização do ambiente de desenvolvimento. |

- **Implantação:** Execução simplificada via Docker Compose para padronização do ambiente e fácil deploy.
