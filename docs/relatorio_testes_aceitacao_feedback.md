# Relatório de Testes de Aceitação - Reportar Problema (Feedback)

## 1. Introdução
Este documento detalha os resultados dos testes de aceitação executados para a funcionalidade "Reportar Problema" (Feedback).

## 2. Casos de Teste

### CT01: Envio de feedback com sucesso
- **Pré-condição:** O usuário deve estar autenticado no aplicativo.
- **Passos:**
  1. Acessar a tela de Perfil.
  2. Clicar no botão "Reportar um Erro".
  3. Preencher o campo de texto do Modal com uma descrição válida.
  4. Clicar em "Enviar".
- **Resultado Esperado:** O feedback deve ser enviado para a API com sucesso. O Modal deve ser fechado e um alerta de sucesso exibido.
- **Resultado Obtido:** Aprovado. O feedback é salvo no banco de dados vinculando o usuário autenticado.

### CT02: Envio de feedback com texto em branco
- **Pré-condição:** O usuário deve estar autenticado no aplicativo.
- **Passos:**
  1. Acessar a tela de Perfil.
  2. Clicar no botão "Reportar um Erro".
  3. Deixar o campo de texto vazio.
  4. Clicar em "Enviar".
- **Resultado Esperado:** O sistema não deve permitir o envio e deve exibir uma mensagem de erro ("Por favor, descreva o problema.").
- **Resultado Obtido:** Aprovado. O botão fica desabilitado e a validação impede envios nulos.

## 3. Conclusão
A funcionalidade atende aos requisitos solicitados. Nenhum bug crítico foi encontrado durante a validação local.
