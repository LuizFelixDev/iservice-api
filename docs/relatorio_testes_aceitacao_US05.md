# Relatório de Testes de Aceitação - US05 (Avaliar Serviço)

**Responsável:** Kaique Vieira Soares
**User Story:** US05 - Avaliar Serviço e Profissional
**Data de Execução:** 02/07/2026

## Resumo da Implementação
Para a Iteração 3, foi desenvolvido o módulo de Reviews (Avaliações). A implementação contemplou desde a API (`reviews.controller`, `reviews.service`) até a persistência no banco (`ReviewEntity`), garantindo as regras de negócio de que um serviço só pode ser avaliado caso esteja concluído (COMPLETED) e que a avaliação não seja duplicada. Além disso, foram implementados os testes de unidade da camada de serviço e controller (com cobertura superior a 65% no SonarQube).

## Cenários de Teste de Aceitação Executados

### TA05.01 - Avaliação com Sucesso
- **Pré-condição:** O cliente possui um serviço com status `COMPLETED` que ainda não foi avaliado.
- **Ação:** O cliente envia uma avaliação (nota de 1 a 5 e um comentário) para o serviço.
- **Resultado Esperado:** O sistema salva a avaliação no banco de dados vinculada ao profissional e retorna a mensagem de sucesso.
- **Resultado Obtido:** Avaliação registrada com sucesso. O rating médio do profissional foi atualizado.
- **Status:** ✅ PASSOU

### TA05.02 - Tentativa de avaliar serviço não concluído (Erro - RN01)
- **Pré-condição:** O cliente possui um serviço com status `PENDING` ou `IN_PROGRESS`.
- **Ação:** O cliente tenta enviar uma avaliação para o serviço.
- **Resultado Esperado:** O sistema recusa a ação e retorna erro informando que "Só é possível avaliar serviços concluídos".
- **Resultado Obtido:** A API retornou status HTTP 400 (Bad Request) com a mensagem de validação esperada.
- **Status:** ✅ PASSOU

### TA05.03 - Avaliação Duplicada (Erro - RN02)
- **Pré-condição:** O cliente possui um serviço com status `COMPLETED` que já foi avaliado anteriormente.
- **Ação:** O cliente tenta enviar uma nova avaliação para o mesmo `job_id`.
- **Resultado Esperado:** O sistema recusa a ação e retorna erro "Este serviço já foi avaliado".
- **Resultado Obtido:** A API bloqueou a criação da nova entidade e retornou o erro de conflito (HTTP 409).
- **Status:** ✅ PASSOU

### TA05.04 - Validação da Nota (Erro - RN03)
- **Pré-condição:** O cliente possui um serviço elegível.
- **Ação:** O cliente tenta enviar uma avaliação com nota `6` (fora do limite 1-5).
- **Resultado Esperado:** O sistema deve recusar a requisição por erro de validação.
- **Resultado Obtido:** O DTO validou o corpo da requisição e o class-validator disparou erro 400 antes de chegar ao service.
- **Status:** ✅ PASSOU

## Cobertura e Qualidade (SonarQube)
- Os testes de unidade do módulo (`reviews.service.spec.ts` e `reviews.controller.spec.ts`) foram executados no Jest e aprovados com 100% de cobertura no módulo em questão.
- A configuração do SonarScanner foi aplicada ao projeto, comprovando a cobertura de código mínima exigida para a Iteração 3.

## Bugs Encontrados
- *Nenhum bug impeditivo encontrado nesta rodada de testes para a US05.* (Os pequenos problemas de validação de DTOs foram corrigidos durante os TDDs de unidade antes do teste de aceitação final).
