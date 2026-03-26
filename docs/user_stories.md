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

### User Story US03 - Manter Serviço (Jobs e Matchmaking)

<table>
  <tr>
    <th colspan="2" style="text-align:left;background:#e0e0e0;padding:8px;">📌 User Story - US03</th>
  </tr>
  <tr>
    <td style="width:25%;padding:6px;"><strong>Título</strong></td>
    <td style="padding:6px;">Fluxo de criação de demanda com GPS, exibição no radar e aceite (Match).</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Identificação</strong></td>
    <td style="padding:6px;">US03 - Manter Serviço</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Story</strong></td>
    <td style="padding:6px;">
      Como <em>cliente</em>, quero <em>solicitar um serviço compartilhando meu GPS</em>, e como <em>profissional</em>, quero <em>ver demandas no meu radar para aceitá-las</em>.
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Requisitos Relacionados</strong></td>
    <td style="padding:6px;">RF03.01, RF03.02, RF03.03, RF03.04</td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Critérios de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>A criação do Job deve obrigatoriamente registrar um ponto geográfico (PostGIS).</li>
        <li>O Radar deve listar apenas Jobs com status 'SEARCHING' dentro de um raio de distância válido.</li>
        <li>O aceite do Job por um profissional deve ser atômico (evitar que dois aceitem ao mesmo tempo).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:6px;"><strong>Testes de Aceitação</strong></td>
    <td style="padding:6px;">
      <ul>
        <li>TA03.01 - Criação de Job salva latitude e longitude corretamente no banco.</li>
        <li>TA03.02 - Profissional visualiza no feed apenas Jobs próximos à sua localização atual.</li>
        <li>TA03.03 - Ao aceitar um Job, o status muda para ACCEPTED e o professional_id é vinculado.</li>
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