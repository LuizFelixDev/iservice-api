# Análise de Pontos de Função (APF)

A contagem de Pontos de Função Não Ajustados (PFNA) do sistema iService foi realizada baseando-se no manual de práticas do IFPUG, classificando as funções de dados e transações por sua complexidade (Baixa, Média, Alta) através da contagem de Tipos de Dados (TD) e Tipos de Registro (TR) ou Arquivos Referenciados (AR).

## 1. Detalhamento por User Story

### US01 - Manter Usuário e Autenticação (Login Local + SSO Google)

**Funções de Dados:**
* **Usuário Local (ALI):** Armazena ID, E-mail, Senha, Data de Criação. (1 TR, 4 TD) -> Complexidade Baixa.
* **Perfil Externo Google (AIE):** Leitura de dados providos pelo OAuth do Google contendo E-mail, Nome, Foto, Token. (1 TR, 4 TD) -> Complexidade Baixa.

**Funções Transacionais:**
* **Cadastrar Usuário Local (EE):** Insere dados no ALI Usuário. Referencia 1 arquivo (ALI), 2 campos (E-mail, Senha). (1 AR, 2 TD) -> Complexidade Baixa.
* **Autenticar via Google (EE):** Lê o AIE do Google e insere/atualiza os ALIs de Usuário e Perfil simultaneamente. (3 AR, 4 TD) -> Complexidade Média.
* **Fazer Login Local (CE):** Consulta o ALI Usuário para validar a senha, sem alterar dados. (1 AR, 2 TD) -> Complexidade Baixa.

**Tabela de Contagem - US01:**

| Componente Funcional | Tipo | Complexidade | TDs | AR/TR | Pontos de Função (PF) |
| --- | --- | --- | --- | --- | --- |
| Armazenamento: Tabela Users | ALI | Baixa | 4 | 1 | 7 PF |
| Armazenamento: Dados API Google | AIE | Baixa | 4 | 1 | 5 PF |
| Transação: Cadastrar via E-mail | EE | Baixa | 2 | 1 | 3 PF |
| Transação: Cadastrar/Login via Google | EE | Média | 4 | 3 | 4 PF |
| Transação: Login via E-mail | CE | Baixa | 2 | 1 | 3 PF |
| **Total da US01** | | | | | **22 PF** |

---

## 2. Como Contribuir para a Contagem Total do Sistema

Para realizar a contagem das próximas User Stories (como o Radar de Jobs e Avaliação), a equipe deve seguir este mesmo padrão:

1. **Identificar os ALIs/AIEs:** Se a US cria uma nova tabela no banco, adicione um ALI. Se ela apenas reutiliza a tabela `Users` (que já foi contada na US01), **NÃO** conte o ALI novamente para não inflar os pontos.
2. **Identificar as Transações:**
   * Solicitar Job = EE (Salva no banco).
   * Listar no Radar = SE (Lê do banco e usa a função espacial `ST_DWithin` do PostGIS para calcular distâncias antes de exibir).
   * Cancelar Job = EE (Atualiza o status).
3. **Somar o Total:** O tamanho funcional do sistema será a soma de todos os ALIs e AIEs (contados apenas uma vez por sistema) mais a soma de todas as transações (EE, CE, SE) de todas as Sprints.

**Quadro Resumo do Sistema (Exemplo Acumulado):**

| Funcionalidade / Entidade | Pontos de Função (PF) | Status |
| --- | --- | --- |
| Entidades de Dados (ALIs e AIEs do Sistema) | 12 PF (Users, Google) | Em evolução |
| US01 - Manter Usuário | 10 PF (Apenas transações) | Contabilizado |
| US02 - Manter Perfil | (a definir) | Pendente |
| US03 - Solicitar Serviço | (a definir) | Pendente |
| **Total Não Ajustado (PFNA)** | **22 PF** | |