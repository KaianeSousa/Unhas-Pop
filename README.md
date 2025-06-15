# 💅 Unhas Pop - Estúdio

Um site moderno com acessibilidade para agendamento de serviços de manicure e pedicure.

---

## 🚀 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript (ES6)**
- **Font Awesome**

---

## 🎨 Justificativa do Design

- **Tipografia**: Utilização das fontes sem serifa Lexend e Open Sans, em conjunto com efeito negrito. Lexend é uma fonte projetada para reduzir o estresse visual e otimizar a interpretação, principalmente para pessoas com dislexia. Já Open Sans foi usada como um complemento a anterior, de maneira a destacar a mensagem personalizada de boas-vindas do restante do site.
- **Grid e Layout**: Utilização do sistema de grid do Bootstrap para organização e responsividade dos elementos, de maneira a permitir que funcionem em diferentes telas.
- **Cores**: Paleta em tons de rosa e roxo escuro, variando entre os temas claro e escuro.
     ### 🌞 Tema Claro

    | Elemento                       | Cor                                 | HEX       |
    |-------------------------------|--------------------------------------|-----------|
    | Fundo principal               | Branco                               | `#FFFFFF` |
    | Texto principal               | Preto (Bootstrap padrão)             | `#212529` |
    | Fundo do botão (primário)    | Rosa claro / destaque                | `#E83E8C` |
    | Texto do botão (primário)    | Branco                               | `#FFFFFF` |
    | Mensagem de boas-vindas      | Rosa escuro (letra branca)           | `#C2185B` |
    | Bordas e detalhes             | Cinza claro                          | `#DEE2E6` |
    
    ---

    ### 🌙 Tema Escuro

    | Elemento                       | Cor                                 | HEX       |
    |-------------------------------|--------------------------------------|-----------|
    | Fundo principal               | Preto profundo / carvão              | `#121212` |
    | Texto principal               | Branco cinza claro                   | `#F8F9FA` |
    | Fundo do botão (primário)    | Rosa vibrante                        | `#FF4081` |
    | Texto do botão (primário)    | Preto escuro                         | `#1C1C1C` |
    | Fundo das seções             | Cinza chumbo                         | `#2C2C2C` |
    | Bordas e divisores           | Cinza médio                          | `#444444` |

---


## 🧠 Interações com JavaScript

- **Mensagem de boas-vindas**: Personalizada conforme horário (manhã, tarde ou noite).
- **Exibição dinâmica de seções**: Seções específicas de serviço são mostradas conforme seleção.
- **Validação de formulário**: 
  - Campos obrigatórios com feedback visual (`is-invalid`)
  - Modelo de estrutura para telefone e verificação de número
- **Tema Claro/Escuro**:
  - Alternância com ícone (sol/lua)
  - Salva a preferência no `localStorage`
- **Acessibilidade**:
  - Suporte à navegação por teclado
  - Imagens sem alt são ocultadas para leitores de tela
  - Feedback em tempo real com `aria-live`

---

## ✅ Boas Práticas

- **Progressive Enhancement**: Conteúdo base funciona sem JS.
- **Semântica HTML**: Uso de elementos como  `<header>`, `<section>`,  `<form>` e  `<footer>`,.
- **Acessibilidade (a11y)**: Navegação e contraste por leitores de tela.
- **Organização**: Separação clara entre estilos (CSS), lógica(JS) e estrutura(HTML.
- **Validações claras**: Não permite envio de dados em formato incorreto e informa o usuário.

---

## 📌 Etapas do Desenvolvimento

1. **Planejamento**:
   - Estruturação das seções (banner, serviços, formulário, footer)
   - Definição da paleta de cores e layout geral

2. **Implementação Estática**:
   - Criação do HTML com base semântica
   - Inclusão do Bootstrap e classes de layout

3. **Estilização**:
   - CSS personalizado para identidade visual
   - Adição de modo escuro

4. **Interatividade**:
   - Script JS com funções organizadas por escopo:
     - Acessibilidade
     - Agendamento
     - Mensagens dinâmicas
     - Tema

5. **Validações e Testes**:
   - Validação de inputs
   - Acessibilidade por teclado
   - Testes em diferentes resoluções

6. **Aprimoramentos**:
   - Inserção de feedback visual
   - Animações suaves
   - Adoção de boas práticas de UX

---

## Trechos do script JS:

### ✅ Acessibilidade
```js
document.querySelectorAll('img:not([alt])').forEach(img => {
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
});
```

### ✅ Troca de tema
```js
btnTema.addEventListener('click', function() {
  document.body.classList.toggle('tema-escuro');
  localStorage.setItem('tema', document.body.classList.contains('tema-escuro') ? 'escuro' : 'claro');
});

```
