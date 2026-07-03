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

### US02 - Manter Perfil (Role e Contato)

| Identificação | Funcionalidade (Processo Elementar) | Tipo | ALR | DER | Complexidade | PF |
|--------------|--------------------------------------|------|-----|-----|--------------|----|
| US02 | Manter Perfil (Atualização de dados + Role) | EE | 2 | 6 | Média | 4 |



**Justificativa da Complexidade (Matriz IFPUG)**

A funcionalidade foi classificada como **Entrada Externa (EE)** pois processa dados enviados pelo usuário autenticado para atualizar informações do perfil e modificar seu tipo de conta (role), impactando diretamente regras de permissão do sistema.

A complexidade foi classificada como **Média (4 PF)** com base nos seguintes critérios:



**Arquivos Lógicos Referenciados (ALR) = 2**

O sistema interage com dois arquivos lógicos durante a transação:

- **User (Leitura e Atualização):**  
  Responsável pelo armazenamento dos dados do perfil do usuário, incluindo biografia, telefone e role.

- **Permissions/Auth (Leitura lógica):**  
  Utilizado para refletir a mudança de role e atualizar as permissões de acesso do usuário no sistema.



**Tipos de Dados (DER) = 6**

Os seguintes elementos de dados atravessam a fronteira da aplicação:

- `user_id` (identificador do usuário autenticado)
- `biography` (biografia do perfil)
- `phone` (telefone de contato)
- `role` (USER / PROFESSIONAL)
- `status da operação` (sucesso ou erro da atualização)
- `mensagem do sistema` (feedback retornado ao usuário)



**Classificação IFPUG**

De acordo com a tabela padrão do IFPUG para **Entradas Externas (EE)**:

- 2 ALR  
- 4 a 15 DER  

Resultado: **Complexidade Média**



**Contribuição para o Sistema**

| Entidades de Dados (ALIs e AIEs do Sistema) | PF | Status |
|---------------------------------------------|----|--------|
| Users / Profile / Auth                      | 37 PF | Em evolução |
| US01 - Manter Usuário                       | 10 PF | Contabilizado |
| US02 - Manter Perfil                        | 4 PF | Em análise |
| US03 - Manter Serviço                       | 8 PF | Contabilizado |



**Total Parcial Atualizado**

- **Pontos de Função (parcial): 42 PF**

### US03 - Manter Serviço na visão do cliente (Jobs e Matchmaking)

**Funções de Dados:**
* **Entidade Job (ALI):** Armazena ID, Descrição, Status, Localização (PostGIS), ID do Cliente, ID do Profissional e Timestamps. (1 TR, 7 TD) -> Complexidade Baixa.

**Funções Transacionais:**
* **Criar Job (EE):** Insere dados no ALI Job. Referencia 1 arquivo (ALI), 4 campos do payload/token. (1 AR, 4 TD) -> Complexidade Baixa.
* **Listar Jobs do Cliente (CE):** Consulta o ALI Job filtrando pelo cliente logado. (1 AR, 4 TD) -> Complexidade Baixa.
* **Visualizar Status da Solicitação (SE):** Consulta de alteração de estado em tempo de execução para o cliente. (1 AR) -> Complexidade Baixa.

**Tabela de Contagem - US03:**

| Componente Funcional | Tipo | Complexidade | TDs | AR/TR | Pontos de Função (PF) |
| --- | --- | --- | --- | --- | --- |
| Armazenamento: Tabela Jobs | ALI | Baixa | 7 | 1 | 7 PF |
| Transação: Criar Job | EE | Baixa | 4 | 1 | 3 PF |
| Transação: Listar Jobs do Cliente | CE | Baixa | 4 | 1 | 3 PF |
| Transação: Visualizar Status | SE | Baixa | - | 1 | 2 PF |
| **Total da US03** | | | | | **15 PF** |

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

---

## Contagem de Pontos de Função - US04 (Detalhamento)

| Identificação | Funcionalidade (Processo Elementar) | Tipo | ALR | DER | Complexidade | PF |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| US04 | Cancelar Serviço pelo Cliente | EE | 1 | 4 | Baixa | 3 |
| US04 | Cancelar Serviço pelo Profissional | EE | 1 | 5 | Baixa | 3 |

### Justificativa da Complexidade (Matriz IFPUG)

A funcionalidade foi classificada como **Entrada Externa (EE)** pois recebe uma ação do usuário autenticado que altera dados persistidos na entidade `Job`, modificando o estado do serviço dentro do sistema.

---

### 1. Arquivos Lógicos Referenciados (ALR)

A transação interage com:

* `Job` (Leitura e Atualização)
  * Validação do status atual (`SEARCHING`, `ACCEPTED`, `COMPLETED`, `CANCELED`)
  * Verificação de propriedade (`client_id` e `professional_id`)
  * Atualização do status e vínculo do profissional

Resultado:
* **1 ALR**

---

### 2. Tipos de Dados (DER)

#### Cancelamento realizado pelo Cliente
Os seguintes elementos atravessam a fronteira da aplicação:

* `job_id`
* `user_id` (extraído do JWT)
* `status`
* `mensagem de retorno`

Resultado:
* **4 DER**

---

#### Cancelamento realizado pelo Profissional

Os seguintes elementos atravessam a fronteira da aplicação:

* `job_id`
* `user_id`
* `status`
* `professional_id`
* `mensagem de retorno`

Resultado:
* **5 DER**

---

### Classificação IFPUG

Segundo a tabela padrão do IFPUG para **Entradas Externas (EE)**:

| ALR | DER | Complexidade |
| --- | --- | --- |
| 1 | 1 a 15 | Baixa |

Portanto:

* **Cancelar Serviço pelo Cliente** → Complexidade **Baixa** → **3 PF**
* **Cancelar Serviço pelo Profissional** → Complexidade **Baixa** → **3 PF**

---

## Total da US04

| Componente Funcional | Tipo | Complexidade | PF |
| --- | --- | --- | --- |
| Transação: Cancelar Serviço pelo Cliente | EE | Baixa | 3 PF |
| Transação: Cancelar Serviço pelo Profissional | EE | Baixa | 3 PF |
| **Total da US04** | | | **6 PF** |

---

## Contagem de Pontos de Função - US05 (Detalhamento)

| Identificação | Funcionalidade (Processo Elementar) | Tipo | ALR | DER | Complexidade | PF |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| US05 | Avaliar Serviço Concluído (Criar Rating) | EE | 2 | 5 | Média | 4 |

### Justificativa da Complexidade (Matriz IFPUG)

A funcionalidade foi classificada como **Entrada Externa (EE)** pois processa dados vindos do usuário (Cliente) para atualizar um arquivo lógico interno do sistema (Entidade Rating). 

A complexidade é **Média (4 PF)** baseada na seguinte contagem:

**1. Arquivos Lógicos Referenciados (ALR) = 2**
O sistema interage com duas entidades distintas durante a transação:
* `Job` (Leitura): Consulta para validar se o status é `COMPLETED` (Regra de Negócio RN01).
* `Rating` (Gravação/Leitura): Consulta para garantir que não há avaliação duplicada (RN02) e posterior gravação do novo registro.

**2. Tipos de Dados (DER) = 5**
Elementos únicos que atravessam a fronteira da aplicação:
* `job_id` (Identificador do serviço)
* `professional_id` (Identificador do profissional)
* `rating` (Nota de 1 a 5)
* `comment` (Texto opcional)
* `Mensagem de Retorno` (Aviso de sucesso ou os erros das RNs)

*De acordo com a tabela padrão do IFPUG para Entradas Externas, uma transação com 2 ALRs e entre 5 a 15 DERs resulta em uma complexidade Média.*
| Entidades de Dados (ALIs e AIEs do Sistema) | 19 PF (Users, Google, Jobs) | Em evolução |
| US01 - Manter Usuário | 10 PF (Apenas transações) | Contabilizado |
| US02 - Manter Perfil | (a definir) | Pendente |
| US03 - Manter Serviço | 8 PF (Apenas transações) | Contabilizado |
| **Total Não Ajustado (PFNA)** | **37 PF** | |


## Contagem de Pontos de Função - US06 

### 1. Funções de Dados (Arquivos)

| Identificador | Nome | Tipo | Complexidade | Pontos de Função |
| :--- | :--- | :--- | :--- | :--- |
| **ALI01** | **Arquivo de Jobs (Serviços)** | ALI | Média | **10 PF** |

*   **Justificativa:** O arquivo contém dados geográficos (PostGIS), status do ciclo de vida e chaves estrangeiras. A manutenção da integridade desses dados durante o processo de matchmaking eleva a complexidade para Média.

---

### 2. Funções de Transação

| Identificador | Operação | Tipo | Descrição Técnica | Complexidade | Pontos de Função |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CE01** | **Radar de Demandas** | CE | Consulta de Jobs 'SEARCHING' baseada no raio geográfico do profissional. | Média | **4 PF** |
| **CE02** | **Visualizar Detalhes** | CE | Recuperação de descrição, categoria e distância específica de um Job. | Baixa | **3 PF** |
| **EE01** | **Aceite de Serviço** | EE | Atualização do status para 'ACCEPTED' e vinculação do ID do profissional (Lógica de atomicidade). | Alta | **6 PF** |
| **CE03** | **Visualizar Agenda** | CE | Listagem de serviços aceitos e pendentes vinculados ao profissional. | Baixa | **3 PF** |

*   **Justificativa da EE01 (Alta):** O aceite não é uma simples alteração. Ele exige uma validação de concorrência no banco de dados para garantir que apenas um profissional assuma o Job, tratando falhas simultâneas.

---

### 3. Resumo da Contagem (US06)

*   **Total de Pontos de Função de Dados:** 10 PF
*   **Total de Pontos de Função de Transação:** 16 PF
*   **Contagem Total US06:** **26 PF**

---

### 4. Impacto no Sistema iService

A **US06** representa uma das partes mais densas do sistema, contribuindo com aproximadamente **18% a 20% do núcleo funcional do MVP** (estimado em 140 PF). O esforço de desenvolvimento aqui é maior devido à integração com o PostGIS e ao tratamento de race conditions no banco de dados PostgreSQL.
