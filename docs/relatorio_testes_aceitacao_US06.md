# Relatório de Testes de Aceitação

**User Story:** US06 - Manter Serviço na visão do profissional (Jobs e Matchmaking)  
**Módulo:** Radar e Aceite de Serviços  
**Responsáveis:** Kaique (Back-end) e Eduardo Nascimento (Front-end) / Analista: Caio Lucas Lopes  
**Data da Execução:** 03 de Julho de 2026  
**Status Geral:** ✅ Aprovado

---

## 1. Resumo da Execução

Todos os critérios de aceitação estipulados para a US06 foram validados com sucesso em ambiente de desenvolvimento. A integração entre o aplicativo móvel (React Native) e a API (NestJS) comportou-se conforme o esperado, com destaque para a assertividade do filtro geográfico (PostGIS) e a segurança na concorrência de aceites.

## 2. Detalhamento dos Testes (TAs)

| ID do Teste | Descrição | Resultado Esperado | Status | Observações |
| :--- | :--- | :--- | :--- | :--- |
| **TA04.01** | O radar filtra e exibe corretamente os Jobs baseando-se no ponto geográfico (PostGIS) do profissional. | A API deve retornar apenas serviços com status `SEARCHING` dentro do raio estabelecido (em metros), calculando a distância da localização atual do usuário. | **✅ Passou** | Função `ST_DWithin` operando perfeitamente no backend. Integração testada via `getRadarJobs` no frontend. |
| **TA04.02** | Ao clicar em aceitar, o `professional_id` é vinculado ao Job e o status é alterado para 'ACCEPTED'. | O banco de dados deve atualizar o status da vaga e retornar sucesso. O frontend deve navegar para a aba de serviços. | **✅ Passou** | Transação concluída com sucesso via método PATCH. UI reflete a mudança instataneamente. |
| **TA04.03** | Se dois profissionais tentarem aceitar o mesmo Job simultaneamente, o sistema retorna erro para o segundo solicitante. | Apenas a primeira requisição altera o status. A segunda deve receber um erro HTTP 409 (Conflict) informando a indisponibilidade. | **✅ Passou** | Atomicidade garantida pela cláusula de update com filtro de status na API. Frontend captura o `409` e exibe `Alert.alert` amigável ("Outro profissional já aceitou"). |
| **TA04.04** | O profissional consegue visualizar a lista de solicitações que ele aceitou anteriormente. | A tela "Meus Serviços" deve listar as vagas vinculadas ao ID do profissional via Token JWT. | * Passou** | Rota `/jobs/my-services` funcionando corretamente e consumida pela `MyServicesScreen`. |

## 3. Cobertura de Testes de Unidade (Backend)
* **Arquivo:** `jobs.service.spec.ts`
* **Cenários testados:** Busca por raio padrão (10km), busca por raio customizado, bloqueio de aceite do próprio cliente e bloqueio de dupla aceitação (simulação de `affected: 0`).
* **Resultado:** 100% de aprovação (PASS).

## 4. Conclusão e Próximos Passos
A US06 atende rigorosamente aos Requisitos Funcionais (RF04.01, RF04.02, RF04.03). A funcionalidade está estável e pronta para ser mesclada na *branch* principal (`main`/`develop`) para o ciclo de QA em homologação.