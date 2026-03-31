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
        <li><strong>Desenvolvedor:</strong> Ismael Gomes da Silva (Back-end)</li>
        <li><strong>Revisor:</strong> Kaique</li>
        <li><strong>Testador:</strong> Eduardo Nascimento Santos</li>
      </ul>
    </td>
  </tr>
</table>

<br>

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