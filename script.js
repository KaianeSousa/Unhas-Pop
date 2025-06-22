// script.js
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', function() {
  // Mostra elementos dependentes de JS
  document.querySelectorAll('.js-dependent').forEach(el => {
    el.style.display = '';
  });
  
  // Oculta alternativas
  document.querySelectorAll('.no-js-alternative').forEach(el => {
    el.style.display = 'none';
  });

  // Mensagem de boas-vindas baseada no horário
  function exibirMensagemHorario() {
    const hora = new Date().getHours();
    let mensagem = '';
    
    if (hora >= 5 && hora < 12) {
      mensagem = 'Bom dia! Bem-vinda ao Unha Pop Estúdio, estamos funcionando';
    } else if (hora >= 12 && hora < 18) {
      mensagem = 'Boa tarde! Pronta para renovar suas unhas?';
    } else {
      mensagem = 'Boa noite! Horário perfeito para planejar cuidar de você';
    }
    
    const banner = document.querySelector('.banner div');
    if (banner) {
      const titulo = banner.querySelector('h1');
      const mensagemElement = document.createElement('p');
      mensagemElement.className = 'mensagem-horario text-white fw-bold mb-3';
      mensagemElement.textContent = mensagem;
      mensagemElement.setAttribute('aria-live', 'polite');
      titulo.insertAdjacentElement('beforebegin', mensagemElement);
    }
  }

  // Configura navegação acessível por teclado
  function configurarNavegacaoAcessivel() {
    const focaveis = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
    document.querySelectorAll(focaveis).forEach(el => {
      el.classList.add('focus-visible');
    });

    // Garante que todas as imagens tenham alt
    document.querySelectorAll('img:not([alt])').forEach(img => {
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
    });

    // Navegação por teclado no menu
    const menuItems = document.querySelectorAll('nav a, nav button');
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = menuItems[index + 1] || menuItems[0];
          next.focus();
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = menuItems[index - 1] || menuItems[menuItems.length - 1];
          prev.focus();
        }
      });
    });
  }

  // Configura o formulário de agendamento
  function configurarFormularioAgendamento() {
    const form = document.getElementById('form-agendamento');
    if (!form) return;
    
    form.setAttribute('action', 'processa-formulario.php');
    form.setAttribute('method', 'POST');

    const servicoSelect = document.getElementById('servico');
    const todasSecoes = document.querySelectorAll('[id^="detalhes-"]');
    const telefoneInput = document.getElementById('telefone');

    // Máscara para telefone
    if (telefoneInput) {
      telefoneInput.addEventListener('input', function(e) {
        let valor = this.value.replace(/\D/g, '');
        if (valor.length > 2) {
          valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}${valor.length > 7 ? '-' + valor.substring(7, 11) : ''}`;
        } else if (valor.length > 0) {
          valor = `(${valor}`;
        }
        this.value = valor;
      });

      telefoneInput.addEventListener('blur', function() {
        const numeros = this.value.replace(/\D/g, '');
        if (numeros.length < 10 || numeros.length > 11) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
        }
      });
    }

    // Mostra seções baseadas no serviço selecionado
    if (servicoSelect) {
      servicoSelect.addEventListener('change', function() {
        todasSecoes.forEach(sec => sec.classList.add('d-none'));
        
        if (this.value) {
          const secaoAtiva = document.getElementById(`detalhes-${this.value}`);
          if (secaoAtiva) {
            secaoAtiva.classList.remove('d-none');
            secaoAtiva.style.opacity = '0';
            secaoAtiva.style.transition = 'opacity 0.3s ease';
            setTimeout(() => secaoAtiva.style.opacity = '1', 10);
          }
        }
      });
    }

    // Remove classes de erro ao digitar
    form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('is-invalid');
      });
    });

    // Validação do formulário
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Valida telefone
      const telefone = form.querySelector('#telefone');
      if (telefone) {
        const numerosTelefone = telefone.value.replace(/\D/g, '');
        if (numerosTelefone.length < 10 || numerosTelefone.length > 11) {
          telefone.classList.add('is-invalid');
          isValid = false;
        }
      }

      // Valida campos obrigatórios
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        }
      });

      // Valida seleção de tipo de serviço
      if (servicoSelect.value) {
        const secaoAtiva = document.getElementById(`detalhes-${servicoSelect.value}`);
        if (secaoAtiva && !secaoAtiva.querySelector('input[type="radio"]:checked')) {
          secaoAtiva.classList.add('border', 'border-danger', 'p-2', 'rounded');
          isValid = false;
        }
      }

      if (isValid) {
        // Simula envio bem-sucedido
        const alertaSucesso = document.createElement('div');
        alertaSucesso.className = 'alert alert-success mt-3';
        alertaSucesso.innerHTML = `
          <i class="fas fa-check-circle me-2"></i>
          Agendamento realizado! Entraremos em contato para confirmação.
        `;
        form.appendChild(alertaSucesso);
        
        setTimeout(() => alertaSucesso.scrollIntoView({ behavior: 'smooth' }), 100);
        setTimeout(() => {
          alertaSucesso.remove();
          form.reset();
          todasSecoes.forEach(sec => {
            sec.classList.add('d-none');
            sec.classList.remove('border', 'border-danger', 'p-2', 'rounded');
          });
        }, 5000);
      } else {
        const primeiroInvalido = form.querySelector('.is-invalid, .border-danger');
        if (primeiroInvalido) {
          primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
          primeiroInvalido.focus();
        }
      }
    });

    // Limpar formulário
    const btnLimpar = document.getElementById('limpar-formulario');
    if (btnLimpar) {
      btnLimpar.addEventListener('click', function() {
        form.reset();
        todasSecoes.forEach(sec => {
          sec.classList.add('d-none');
          sec.classList.remove('border', 'border-danger', 'p-2', 'rounded');
        });
        
        form.querySelectorAll('.is-invalid').forEach(el => {
          el.classList.remove('is-invalid');
        });
        
        const alertaSucesso = form.querySelector('.alert-success');
        if (alertaSucesso) {
          alertaSucesso.remove();
        }
      });
    }
  }

  // Alterna entre os temas
  function configurarTema() {
    const btnTema = document.getElementById('toggleTema');
    if (!btnTema) return;

    const temaSalvo = localStorage.getItem('tema');
    const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (temaSalvo === 'escuro' || (!temaSalvo && prefereEscuro)) {
      document.body.classList.add('tema-escuro');
      btnTema.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
      document.querySelector('.logo-light').classList.add('d-none');
      document.querySelector('.logo-dark').classList.remove('d-none');
      document.querySelector('.menu-light').classList.add('d-none');
      document.querySelector('.menu-dark').classList.remove('d-none');
    }

    btnTema.addEventListener('click', function() {
      document.body.classList.toggle('tema-escuro');
      
      if (document.body.classList.contains('tema-escuro')) {
        this.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
        localStorage.setItem('tema', 'escuro');
        document.querySelector('.logo-light').classList.add('d-none');
        document.querySelector('.logo-dark').classList.remove('d-none');
        document.querySelector('.menu-light').classList.add('d-none');
        document.querySelector('.menu-dark').classList.remove('d-none');
      } else {
        this.innerHTML = '<i class="fas fa-moon"></i> Tema Escuro';
        localStorage.setItem('tema', 'claro');
        document.querySelector('.logo-light').classList.remove('d-none');
        document.querySelector('.logo-dark').classList.add('d-none');
        document.querySelector('.menu-light').classList.remove('d-none');
        document.querySelector('.menu-dark').classList.add('d-none');
      }
    });
  }

  // Inicializa todas as funcionalidades
  exibirMensagemHorario();
  configurarNavegacaoAcessivel();
  configurarFormularioAgendamento();
  configurarTema();
});