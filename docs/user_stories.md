# Documento Lista de User Stories

Documento construído a partir do **Modelo BSI - Doc 004 - Lista de User Stories**. Este documento descreve os User Stories criados a partir da Lista de Requisitos no [Documento 001 - Documento de Visão](documento_visao.md).

## Histórico de revisões

| Data       | Versão  | Descrição                          | Autor                          |
| :--------- | :-----: | :--------------------------------: | :----------------------------- |
| 26/03/2026 | 0.0.1   | Criação do template e planejamento inicial | Kaique |
| 26/03/2026 | 1.0.0   | Detalhamento dos User Stories US01, US02 e US03 e atribuição da equipe | Caio Lucas Lopes |

---
### User Story US01 - Manter Usuário (Autenticação)

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US01</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Gerenciar o cadastro e autenticação de usuários na plataforma iService.</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US01 - Manter Usuário</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story</strong></td>
    <td style="padding:6px;">
      Como <em>visitante</em>, quero <em>me cadastrar e fazer login com segurança</em>, para <em>poder acessar as funcionalidades restritas do aplicativo</em>.
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Requisitos Relacionados</strong></td>
    <td style="padding:6px;">RF01.01, RF01.02, RF01.03, RF01.04</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Critérios de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>O sistema não deve permitir o cadastro de dois usuários com o mesmo e-mail.</li>
        <li>A senha deve ser armazenada criptografada no banco de dados.</li>
        <li>O login bem-sucedido deve retornar um token JWT válido.</li>
        <li>O sistema deve permitir o login via provedor externo (Google).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>TA01.01 - Cadastro bem-sucedido com e-mail não existente.</li>
        <li>TA01.02 - Tentativa de cadastro com e-mail duplicado retorna erro 409.</li>
        <li>TA01.03 - Login com credenciais válidas retorna token de acesso.</li>
        <li>TA01.04 - Login com token válido do Google cria conta e retorna JWT interno.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">12h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tempo Real Gasto</strong></td>
    <td style="padding:6px;">--</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tamanho Funcional</strong></td>
    <td style="padding:6px;">8 PF</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Prioridade</strong></td>
    <td style="padding:6px;">Essencial</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Caio Lucas Lopes</li>
        <li><strong>Desenvolvedor:</strong> Kaique Vieira Soares (Back-end)</li>
        <li><strong>Revisor:</strong> Ismael Gomes Da Silva</li>
        <li><strong>Testador:</strong> Eduardo Nascimento Santos</li>
      </ul>
    </td>
  </tr>
</table>

<br>

### Especificação de Caso de Uso: UC01 - Manter Usuário e Autenticação

#### 1. Identificação
* **Caso de Uso:** UC01 - Manter Usuário e Autenticação (Referente à US01)
* **Atores Principais:** Visitante (Usuário não logado)
* **Atores Secundários:** Provedor de Identidade Google (Google OAuth 2.0 API)
* **Resumo:** Este caso de uso descreve os passos para um visitante criar uma nova conta ou autenticar-se na plataforma iService, seja através de credenciais tradicionais (e-mail e senha) ou utilizando o Single Sign-On (SSO) de plataformas terceiras, como o Google.

#### 2. Pré-condições
* O aplicativo mobile deve estar conectado à internet.
* Para login via Google, o dispositivo do usuário deve ter os serviços do Google Play configurados ou permitir acesso ao navegador para o consentimento OAuth.

#### 3. Pós-condições
* **Sucesso:** O usuário é autenticado, a sessão é iniciada (Token JWT é armazenado localmente no dispositivo) e o sistema redireciona para a tela inicial (Radar ou Home). Caso seja o primeiro acesso via Google, a conta base e o perfil inicial são criados automaticamente.
* **Falha:** O sistema exibe uma mensagem de erro clara, nenhuma sessão é criada e o usuário permanece na tela de login/cadastro.

#### 4. Fluxos de Eventos

##### 4.1. Fluxo Principal 1: Cadastro e Login Tradicional (E-mail e Senha)
1. O Visitante acessa a tela inicial do aplicativo e seleciona "Cadastrar com E-mail".
2. O sistema exibe o formulário solicitando: E-mail e Senha.
3. O Visitante preenche os dados e submete o formulário.
4. O sistema valida o formato do e-mail e a força da senha (RN01).
5. O sistema verifica no banco de dados se o e-mail já existe.
6. O sistema criptografa a senha utilizando *Bcrypt* (RN02).
7. O sistema persiste o novo registro na entidade `User` e cria um `Profile` inicial em branco.
8. O sistema gera um Token JWT com o UUID do usuário no *payload*.
9. O sistema retorna o Token JWT para o Frontend.
10. O caso de uso é encerrado com sucesso.

##### 4.2. Fluxo Principal 2: Login / Cadastro via Plataforma Terceira (Google SSO)
1. O Visitante acessa a tela inicial e seleciona "Continuar com o Google".
2. O aplicativo abre a interface nativa de consentimento do Google OAuth 2.0.
3. O Visitante seleciona sua conta Google e autoriza o compartilhamento de dados básicos (Perfil e E-mail).
4. O Provedor (Google) retorna um `id_token` assinado para o Frontend do iService.
5. O Frontend repassa esse `id_token` para o Backend.
6. O Backend valida criptograficamente o `id_token` contra os servidores da Google (garantindo que não foi forjado ou expirado).
7. O Backend extrai as informações do payload do Google: `email`, `name`, `picture` (foto de perfil) e `email_verified`.
8. O sistema verifica se já existe um usuário cadastrado com esse `email` no banco de dados:
   * **Se NÃO existe (Novo Usuário):** O sistema cria automaticamente a conta `User` (sem senha) e preenche o `Profile` inicial com o Nome e a Foto extraídos do Google.
   * **Se JÁ existe (Usuário Recorrente):** O sistema apenas recupera o UUID associado a este e-mail.
9. O sistema gera o Token JWT interno do iService com o UUID do usuário.
10. O sistema retorna o Token JWT e os dados do perfil para o Frontend.
11. O caso de uso é encerrado com sucesso.

##### 4.3. Fluxos Alternativos
* **FA01 - E-mail já cadastrado (No Fluxo Principal 1):** No passo 5 do fluxo 1, se o e-mail já estiver em uso, o sistema aborta o cadastro e exibe a mensagem: "Este e-mail já está em uso. Deseja fazer login?".
* **FA02 - Credenciais Inválidas na Autenticação Tradicional:** Se o visitante tentar fazer login com uma senha que não bate com o hash salvo, o sistema exibe "E-mail ou senha incorretos" (sem especificar qual dos dois está errado por questões de segurança).
* **FA03 - Mesclagem de Contas (E-mail tradicional tentando usar Google):** Se no passo 8 do Fluxo 2 o sistema identificar que o e-mail do Google já existe na base (mas foi criado originalmente via e-mail/senha), o sistema permite o login, vinculando a conta Google ao cadastro existente de forma transparente.

##### 4.4. Fluxos de Exceção
* **FE01 - Falha de Comunicação com o Provedor OAuth:** Se os servidores da Google estiverem indisponíveis ou a validação do token falhar (timeout), o sistema interrompe o processo e informa: "Não foi possível conectar ao Google no momento. Tente novamente ou use seu e-mail".
* **FE02 - Permissão Negada pelo Usuário:** Se no passo 3 do Fluxo 2 o usuário fechar a tela do Google ou negar o consentimento, o fluxo é cancelado silenciosamente e o usuário retorna à tela inicial de login.

##### 5. Regras de Negócio (RN)

| ID | Regra | Descrição |
| :--- | :--- | :--- |
| **RN01** | Validação de Entrada | O e-mail deve ter um formato válido (regex padrão). A senha tradicional deve possuir no mínimo 8 caracteres. |
| **RN02** | Criptografia Irreversível | É estritamente proibido salvar senhas em texto claro no banco PostgreSQL. Deve-se aplicar um algoritmo de hash seguro com *salt* (ex: Bcrypt). |
| **RN03** | Ciclo de Vida do JWT | O Token JWT interno deve ter uma validade configurada (ex: 7 dias) e ser assinado com a chave secreta (`JWT_SECRET`) armazenada nas variáveis de ambiente. |
| **RN04** | Senha Nula para Contas Sociais | Usuários que nascem a partir do fluxo do Google (SSO) terão a coluna `password` nula no banco de dados, sendo impossibilitados de logar pelo fluxo tradicional até que configurem uma senha explicitamente na sua página de perfil. |
| **RN05** | Confiança de Provedor | A API do iService só aceitará `id_tokens` do Google se o campo `aud` (Audience) coincidir exatamente com o *Client ID* registrado no Google Cloud Console do projeto. |

##### 6. Mapeamento de Dados de Terceiros (Google OAuth)
Os dados providos pela API de autenticação do Google serão mapeados para o banco de dados interno da seguinte forma durante o primeiro acesso:

* **E-mail:** `payload.email` é salvo na tabela `users`, coluna `email`.
* **Nome:** `payload.name` é salvo na tabela `profiles`, coluna `name` ou `bio` (dependendo da estrutura atual).
* **Foto de Perfil:** `payload.picture` é capturado e armazenado na entidade `Profile` (ou localmente) para exibição do avatar do usuário no aplicativo.

### User Story US02 - Manter Perfil (Role e Contato)

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US02</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Gerenciar o perfil público e a permissão de atuação (Cliente/Profissional).</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US02 - Manter Perfil</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story</strong></td>
    <td style="padding:6px;">
      Como <em>usuário autenticado</em>, quero <em>completar meu perfil e alternar meu tipo de conta</em>, para <em>poder atuar tanto como contratante quanto como prestador de serviços</em>.
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Requisitos Relacionados</strong></td>
    <td style="padding:6px;">RF02.01, RF02.02, RF02.03</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Critérios de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>O usuário deve poder transitar entre as roles USER e PROFESSIONAL.</li>
        <li>O perfil deve aceitar atualização de biografia e telefone de contato.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>TA02.01 - Atualização do telefone e biografia com sucesso.</li>
        <li>TA02.02 - Troca de perfil (Role) reflete imediatamente nas permissões do app.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">10h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tempo Real Gasto</strong></td>
    <td style="padding:6px;">--</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tamanho Funcional</strong></td>
    <td style="padding:6px;">6 PF</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Prioridade</strong></td>
    <td style="padding:6px;">Importante</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Caio Lucas Lopes</li>
        <li><strong>Desenvolvedor:</strong> Luiz Henrique (Front-end)</li>
        <li><strong>Revisor:</strong> Ismael Gomes da Silva</li>
        <li><strong>Testador:</strong> Isaque Guimaraes</li>
      </ul>
    </td>
  </tr>
</table>

<br>

### User Story US03 - Manter Serviço na visão do cliente (Jobs e Matchmaking)

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">
      📌 User Story - US03
    </th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">
      Criação e acompanhamento de solicitação de serviço com localização via GPS.
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US04 - Manter Serviço (Visão Profissional)</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story</strong></td>
    <td style="padding:6px;">
      Como <em>cliente</em>, quero 
      <em>solicitar um serviço informando minha localização via GPS</em>, 
      para que eu possa 
      <em>receber atendimento de um profissional próximo e acompanhar o status da minha solicitação</em>.
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Requisitos Relacionados</strong></td>
    <td style="padding:6px;">RF03.01, RF03.02, RF03.04</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Critérios de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>O cliente deve conseguir criar uma solicitação informando descrição e localização (latitude e longitude).</li>
        <li>A localização deve ser armazenada como um ponto geográfico válido (PostGIS).</li>
        <li>O cliente deve visualizar a lista de suas solicitações ordenadas por data de criação.</li>
        <li>O cliente deve conseguir visualizar o status atual da solicitação (SEARCHING, NEGOTIATING, ACCEPTED, COMPLETED, CANCELED).</li>
        <li>O cliente deve visualizar quando um profissional aceitar sua solicitação.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>TA03.01 - Ao criar um Job, latitude e longitude são armazenadas corretamente no banco.</li>
        <li>TA03.02 - O cliente visualiza apenas suas próprias solicitações.</li>
        <li>TA03.03 - A lista de solicitações é exibida em ordem decrescente de criação.</li>
        <li>TA03.04 - O status da solicitação é atualizado corretamente ao longo do fluxo.</li>
        <li>TA03.05 - O cliente consegue identificar quando um profissional aceitou sua solicitação.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">24h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tempo Real Gasto</strong></td>
    <td style="padding:6px;">--</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tamanho Funcional</strong></td>
    <td style="padding:6px;">15 PF</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Prioridade</strong></td>
    <td style="padding:6px;">Essencial (Core)</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Caio Lucas Lopes</li>
        <li><strong>Desenvolvedor:</strong> Kaique (Back-end) e Eduardo Nascimento (Front-end)</li>
        <li><strong>Revisor:</strong> Ismael Gomes da Silva</li>
        <li><strong>Testador:</strong> Luiz Henrique</li>
      </ul>
    </td>
  </tr>
</table>

### User Story US04 - Cancelar Solicitação de Serviço

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US04</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Cancelar Solicitação de Serviço Pendente ou Aceita</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US04 - Cancelar Serviço</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story / Descrição</strong></td>
    <td style="padding:6px;">
      <strong>Como</strong> <em>Cliente ou Profissional</em>,<br>
      <strong>Quero</strong> <em>poder cancelar um serviço (Job) que ainda não foi concluído</em>,<br>
      <strong>Para</strong> <em>desistir da solicitação ou informar que não poderei mais comparecer ao local, liberando a demanda.</em>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Regras de Negócio (RN)</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>RN01 - Restrição de Status:</strong> O sistema só permite o cancelamento se o Job estiver com o status <code>SEARCHING</code> ou <code>ACCEPTED</code>. Serviços <code>COMPLETED</code> ou já <code>CANCELED</code> não podem ser alterados.</li>
        <li><strong>RN02 - Permissão de Propriedade:</strong> Apenas o Cliente que criou o pedido (<code>client_id</code>) ou o Profissional que aceitou (<code>professional_id</code>) têm autorização para cancelar. Qualquer outro ID via token JWT deve ser bloqueado.</li>
        <li><strong>RN03 - Retorno ao Radar:</strong> Se o cancelamento for feito pelo <em>Profissional</em>, o status do Job não vira <code>CANCELED</code>, ele volta para <code>SEARCHING</code> e o <code>professional_id</code> volta a ser <code>null</code>, para que o Job reapareça no radar de outros prestadores.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Mensagens do Sistema</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>MSG01 (Sucesso):</strong> "Serviço cancelado com sucesso."</li>
        <li><strong>MSG02 (Erro - RN01):</strong> "Não é possível cancelar um serviço que já foi finalizado."</li>
        <li><strong>MSG03 (Erro - RN02):</strong> "Você não tem permissão para alterar o status deste serviço."</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Modelo de Dados Relacionado</strong></td>
    <td style="padding:6px;">
      Fragmento da Entidade <code>Job</code> impactada:<br>
      - <code>id</code> (UUID)<br>
      - <code>client_id</code> (UUID)<br>
      - <code>professional_id</code> (UUID, Nullable)<br>
      - <code>status</code> (Altera para 'CANCELED' ou 'SEARCHING')
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação (TA)</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>TA04.01 - Cancelamento pelo Cliente:</strong> <br><em>Dado que</em> o cliente é dono do Job X (status ACCEPTED), <em>Quando</em> ele clica em cancelar, <em>Então</em> o status muda para CANCELED e a MSG01 é exibida.</li>
        <li><strong>TA04.02 - Cancelamento pelo Profissional:</strong> <br><em>Dado que</em> o profissional é dono do Job X, <em>Quando</em> ele clica em cancelar, <em>Então</em> o status volta para SEARCHING e o professional_id fica nulo.</li>
        <li><strong>TA04.03 - Tentativa Fora do Escopo:</strong> <br><em>Dado que</em> o usuário logado não é o criador nem o profissional do Job, <em>Quando</em> ele tenta enviar a requisição de cancelamento, <em>Então</em> o sistema bloqueia e retorna MSG03.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">8h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Kaique</li>
        <li><strong>Desenvolvedor:</strong> Kaique (Back-end) / Luiz Henrique (Front-end)</li>
        <li><strong>Revisor:</strong> Caio Lucas Lopes</li>
        <li><strong>Testador:</strong> Isaque Guimaraes</li>
      </ul>
    </td>
  </tr>
</table>

### User Story US05 - Avaliar Serviço e Profissional

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US05</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Avaliar serviço concluído e o profissional envolvido</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US05 - Avaliar Serviço</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story / Descrição</strong></td>
    <td style="padding:6px;">
      <strong>Como</strong> <em>Cliente</em>,<br>
      <strong>Quero</strong> <em>avaliar o serviço prestado após a conclusão</em>,<br>
      <strong>Para</strong> <em>compartilhar minha experiência e ajudar outros usuários a escolherem profissionais de qualidade.</em>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Regras de Negócio (RN)</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>RN01 - Restrição de Status:</strong> A avaliação só pode ser realizada para Jobs com status <code>COMPLETED</code>.</li>
        <li><strong>RN02 - Avaliação Única:</strong> Cada cliente pode avaliar um Job apenas uma vez.</li>
        <li><strong>RN03 - Integridade da Nota:</strong> A avaliação deve conter uma nota entre <code>1</code> e <code>5</code> estrelas e um comentário opcional.</li>
        <li><strong>RN04 - Associação Correta:</strong> A avaliação deve estar vinculada ao <code>job_id</code> e ao <code>professional_id</code>.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Mensagens do Sistema</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>MSG01 (Sucesso):</strong> "Avaliação registrada com sucesso."</li>
        <li><strong>MSG02 (Erro - RN01):</strong> "Só é possível avaliar serviços concluídos."</li>
        <li><strong>MSG03 (Erro - RN02):</strong> "Este serviço já foi avaliado."</li>
        <li><strong>MSG04 (Erro - RN03):</strong> "A nota deve estar entre 1 e 5 estrelas."</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Modelo de Dados Relacionado</strong></td>
    <td style="padding:6px;">
      Fragmento da Entidade <code>Rating</code> impactada:<br>
      - <code>id</code> (UUID)<br>
      - <code>job_id</code> (UUID)<br>
      - <code>client_id</code> (UUID)<br>
      - <code>professional_id</code> (UUID)<br>
      - <code>rating</code> (Integer: 1-5)<br>
      - <code>comment</code> (Text, Opcional)<br>
      - <code>created_at</code> (Timestamp)
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação (TA)</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>TA05.01 - Avaliação com Sucesso:</strong><br>
        <em>Dado que</em> o Job está com status COMPLETED,<br>
        <em>Quando</em> o cliente envia uma avaliação válida,<br>
        <em>Então</em> o sistema salva a avaliação e retorna MSG01.</li>

        <li><strong>TA05.02 - Tentativa Antes da Conclusão:</strong><br>
        <em>Dado que</em> o Job está com status ACCEPTED,<br>
        <em>Quando</em> o cliente tenta avaliar,<br>
        <em>Então</em> o sistema bloqueia e retorna MSG02.</li>

        <li><strong>TA05.03 - Avaliação Duplicada:</strong><br>
        <em>Dado que</em> o cliente já avaliou o Job,<br>
        <em>Quando</em> tenta avaliar novamente,<br>
        <em>Então</em> o sistema retorna MSG03.</li>

        <li><strong>TA05.04 - Nota Inválida:</strong><br>
        <em>Dado que</em> a nota enviada está fora do intervalo permitido,<br>
        <em>Quando</em> o cliente envia a avaliação,<br>
        <em>Então</em> o sistema retorna MSG04.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">10h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Caio Lucas Lopes</li>
        <li><strong>Desenvolvedor:</strong> Eduardo Nascimento (Back-end) / Luiz Henrique (Front-end)</li>
        <li><strong>Revisor:</strong> Kaique</li>
        <li><strong>Testador:</strong> Isaque Guimaraes</li>
      </ul>
    </td>
  </tr>
</table>

### User Story US06 - Manter Serviço na visão do profissional (Jobs e Matchmaking)

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US04</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Visualização de demandas no radar e aceitação de serviços por geolocalização.</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US04 - Manter Serviço (Visão Profissional)</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story</strong></td>
    <td style="padding:6px;">
      Como <em>profissional</em>, quero <em>visualizar solicitações de serviços próximas à minha localização no radar</em>, para que eu possa <em>aceitar demandas de trabalho e gerenciar meus serviços em andamento.</em>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Requisitos Relacionados</strong></td>
    <td style="padding:6px;">RF04.01, RF04.02, RF04.03</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Critérios de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>O radar deve listar apenas Jobs com status 'SEARCHING' dentro de um raio de distância configurado para o profissional.</li>
        <li>O profissional deve conseguir visualizar detalhes da demanda (descrição, categoria e distância) antes do aceite.</li>
        <li>O aceite do Job deve ser atômico, garantindo que apenas o primeiro profissional a clicar receba a demanda.</li>
        <li>O sistema deve permitir que o profissional visualize sua agenda de serviços aceitos e pendentes.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>TA04.01 - O radar filtra e exibe corretamente os Jobs baseando-se no ponto geográfico (PostGIS) do profissional.</li>
        <li>TA04.02 - Ao clicar em aceitar, o professional_id é vinculado ao Job e o status é alterado para 'ACCEPTED' com sucesso.</li>
        <li>TA04.03 - Se dois profissionais tentarem aceitar o mesmo Job simultaneamente, o sistema retorna erro para o segundo solicitante.</li>
        <li>TA04.04 - O profissional consegue visualizar a lista de solicitações que ele aceitou anteriormente.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">24h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tempo Real Gasto</strong></td>
    <td style="padding:6px;">--</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Tamanho Funcional</strong></td>
    <td style="padding:6px;">15 PF</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Prioridade</strong></td>
    <td style="padding:6px;">Essencial (Core)</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Caio Lucas Lopes</li>
        <li><strong>Desenvolvedor:</strong> Kaique (Back-end) e Eduardo Nascimento (Front-end)</li>
        <li><strong>Revisor:</strong> Ismael Gomes da Silva</li>
        <li><strong>Testador:</strong> Luiz Henrique</li>
      </ul>
    </td>
  </tr>
</table>

### User Story US07 - Concluir Serviço em Andamento

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US07</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Finalizar o ciclo de vida de um serviço aceito e em execução.</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US07 - Concluir Serviço</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story / Descrição</strong></td>
    <td style="padding:6px;">
      <strong>Como</strong> <em>Profissional</em>,<br>
      <strong>Quero</strong> <em>marcar um serviço (Job) como concluído após a prestação</em>,<br>
      <strong>Para</strong> <em>que o sistema registre a finalização, libere minha agenda e permita que o cliente me avalie.</em>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Regras de Negócio (RN)</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>RN01 - Restrição de Status:</strong> O sistema só permite a conclusão se o Job estiver com o status <code>ACCEPTED</code>.</li>
        <li><strong>RN02 - Permissão de Execução:</strong> Apenas o Profissional vinculado ao serviço (<code>professional_id</code>) tem autorização para marcar como concluído via token JWT.</li>
        <li><strong>RN03 - Registro Temporal:</strong> Ao concluir, o sistema deve registrar automaticamente o timestamp na coluna <code>finished_at</code> ou similar.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Mensagens do Sistema</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>MSG01 (Sucesso):</strong> "Serviço finalizado com sucesso."</li>
        <li><strong>MSG02 (Erro - RN01):</strong> "Não é possível concluir um serviço que não foi previamente aceito."</li>
        <li><strong>MSG03 (Erro - RN02):</strong> "Você não tem permissão para finalizar este serviço."</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Modelo de Dados Relacionado</strong></td>
    <td style="padding:6px;">
      Fragmento da Entidade <code>Job</code> impactada:<br>
      - <code>id</code> (UUID)<br>
      - <code>professional_id</code> (UUID)<br>
      - <code>status</code> (Altera para 'COMPLETED')<br>
      - <code>updated_at</code> (Timestamp de finalização)
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação (TA)</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>TA07.01 - Conclusão pelo Profissional:</strong> <br><em>Dado que</em> o profissional aceitou o Job X (status ACCEPTED), <em>Quando</em> ele clica em concluir, <em>Então</em> o status muda para COMPLETED e a MSG01 é exibida.</li>
        <li><strong>TA07.02 - Tentativa por outro Usuário:</strong> <br><em>Dado que</em> o usuário logado não é o profissional vinculado ao Job, <em>Quando</em> ele tenta concluir, <em>Então</em> o sistema bloqueia e retorna MSG03.</li>
        <li><strong>TA07.03 - Fluxo de Status Inválido:</strong> <br><em>Dado que</em> o Job ainda está em SEARCHING, <em>Quando</em> o profissional tenta forçar a conclusão, <em>Então</em> o sistema retorna MSG02.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Estimativa</strong></td>
    <td style="padding:6px;">6h</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Responsáveis</strong></td>
    <td style="padding:6px;">
      <ul>
        <li><strong>Analista:</strong> Caio Lucas Lopes</li>
        <li><strong>Desenvolvedor:</strong> Caio Lucas Lopes (Back-end)</li>
        <li><strong>Revisor:</strong> Kaique</li>
        <li><strong>Testador:</strong> Eduardo Nascimento Santos</li>
      </ul>
    </td>
  </tr>
</table>
