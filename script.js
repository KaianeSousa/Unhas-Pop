// Indica que o JS está habilitado
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll('.js-dependent').forEach(el => {
    el.style.display = '';
  });
  document.querySelectorAll('.no-js-alternative').forEach(el => {
    el.style.display = 'none';
  });

  // Mensagem de boas-vindas
  function mensagem() {
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

  // Navegação por teclado
  function navegacaoAcessivel() {
    const focaveis = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
    document.querySelectorAll(focaveis).forEach(el => {
      el.classList.add('focus-visible');
    });

    document.querySelectorAll('img:not([alt])').forEach(img => {
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
    });

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

  // Configuração do formulário
  function formulario() {
  const form = document.getElementById('scheduling');
  if (!form) return;
  

  form.setAttribute('action', 'processa-formulario.php');
  form.setAttribute('method', 'POST');

  const servicoSelect = document.getElementById('servico');
  const todasSecoes = document.querySelectorAll('[id^="details-"]');
  const telefoneInput = document.getElementById('numero'); 


  if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {

      let valor = this.value.replace(/\D/g, '');
      if (valor.length > 2) {
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}${valor.length > 6 ? '-' + valor.substring(6, 11) : ''}`;
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

  servicoSelect.addEventListener('change', function() {
    todasSecoes.forEach(sec => sec.classList.add('d-none'));
    
    if (this.value) {
      const secaoAtiva = document.getElementById(`details-${this.value}`);
      if (secaoAtiva) {
        secaoAtiva.classList.remove('d-none');
        secaoAtiva.style.opacity = '0';
        secaoAtiva.style.transition = 'opacity 0.3s ease';
        setTimeout(() => secaoAtiva.style.opacity = '1', 10);
      }
    }
  });

  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('is-invalid');
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const telefone = form.querySelector('#numero');
    if (telefone) {
      const numerosTelefone = telefone.value.replace(/\D/g, '');
      if (numerosTelefone.length < 10 || numerosTelefone.length > 11) {
        telefone.classList.add('is-invalid');
        isValid = false;
      }
    }

    form.querySelectorAll('[required]').forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    if (isValid) {
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
        todasSecoes.forEach(sec => sec.classList.add('d-none'));
      }, 5000);
    } else {
      const primeiroInvalido = form.querySelector('.is-invalid');
      if (primeiroInvalido) {
        primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
        primeiroInvalido.focus();
      }
    }
  });
}

  // Toggle de tema
  function configurarToggleTema() {
    const btnTema = document.getElementById('toggleTema');
    if (!btnTema) return;

    if (localStorage.getItem('tema') === 'escuro') {
      document.body.classList.add('tema-escuro');
      btnTema.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
    }

    btnTema.addEventListener('click', function() {
      document.body.classList.toggle('tema-escuro');
      if (document.body.classList.contains('tema-escuro')) {
        this.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
        localStorage.setItem('tema', 'escuro');
      } else {
        this.innerHTML = '<i class="fas fa-moon"></i> Tema Escuro';
        localStorage.setItem('tema', 'claro');
      }
    });
  }

  // Inicialização das funções
  mensagem();
  navegacaoAcessivel();
  formulario();
  configurarToggleTema();
});