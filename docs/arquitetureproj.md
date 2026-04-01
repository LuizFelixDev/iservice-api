# Documento de Arquitetura do Software

- **Visão Geral:**
    Figura/Diagrama representando as camadas do sistema (Frontend e Backend).
    ![Diagrama da arquitetura do projeto](Gemini_Generated_Image_684vxh684vxh684v.png)

# Tabela de Tecnologias

| Mecanismo de Análise | Tecnologia de Implementação | Justificativa / Responsabilidade |
| :--- | :--- | :--- |
| **Frontend (Mobile)** | React Native + Expo | Desenvolvimento cross-platform (Android/iOS) com alta performance. O Expo agiliza o acesso a recursos nativos e o fluxo de build. |
| **Backend (API)** | Next.js + TypeScript | Fornece uma infraestrutura de API estável e tipagem estática, garantindo maior segurança no desenvolvimento das regras de negócio e contratos de dados. |
| **Persistência** | PostgreSQL + PostGIS | Banco de dados relacional robusto. A extensão PostGIS é essencial para o cálculo de distâncias entre prestadores e clientes (geolocalização). |
| **Containerização** | Docker | Padronização de ambientes. Garante que o banco de dados e o backend rodem da mesma forma em todas as máquinas da equipe. |
| **Comunicação** | REST / JSON | Protocolo padrão para troca de dados entre o aplicativo mobile e o servidor Next.js. |