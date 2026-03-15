const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema
const temasalvo = localStorage.getItem('tema');
temaEscuro(temasalvo === 'escuro');

// Função para alternar entre tema claro e escuro
function temaEscuro(tipo) {
    if (tipo == true) {
        body.classList.add('escuro');
        botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove('escuro');
        botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

botao.addEventListener('click', (e) => {
    e.preventDefault();
    const isescuro = body.classList.toggle('escuro');
    temaEscuro(isescuro);
    localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});


// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {

        if(this.id === 'botao-tema') return; 

        e.preventDefault();

        const targetId = this.getAttribute('href');
        const detalhesSection = document.getElementById('detalhes');
        const targetElement = document.querySelector(targetId);

        if (targetElement && detalhesSection) {
            detalhesSection.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});


// Expansão dos Projetos
const botoesExpandir = document.querySelectorAll('.btn-expandir');

botoesExpandir.forEach(botao => {
    botao.addEventListener('click', function() {

        const projeto = this.closest('.projeto');
        const icone = this.querySelector('i');

        const isExpandido = projeto.classList.toggle('expandido');

        if (isExpandido) {

            icone.classList.remove('fa-expand');
            icone.classList.add('fa-compress');

            setTimeout(() => {
                projeto.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);

        } else {

            icone.classList.remove('fa-compress');
            icone.classList.add('fa-expand');

        }
    });
});


// --- Lógica de Filtro de Tecnologias ---
const techBtns = document.querySelectorAll('.tech-btn');
const projetos = document.querySelectorAll('.projeto');
const filtroAtivo = document.getElementById('filtro-ativo');
const secaoProjetos = document.getElementById('projetos');
const btnLimpar = document.getElementById('limpar-filtro');


// Função centralizada para limpar filtros
function limparFiltros() {

    techBtns.forEach(b => b.classList.remove('ativo'));
    projetos.forEach(p => p.classList.remove('oculto'));

    if (filtroAtivo) {
        filtroAtivo.textContent = "";
    }

    if (btnLimpar) {
        btnLimpar.style.display = "none";
    }

}


// Evento do botão limpar
if (btnLimpar) {
    btnLimpar.addEventListener('click', limparFiltros);
}


// Evento dos botões de tecnologia
techBtns.forEach(btn => {

    btn.addEventListener('click', function(e) {

        e.preventDefault();

        const filtro = this.getAttribute('data-filter');
        const jaEstaAtivo = this.classList.contains('ativo');

        // Se clicou novamente no mesmo botão → limpar filtro
        if (jaEstaAtivo) {

            limparFiltros();

        } 
        
        // Aplicar filtro
        else {

            techBtns.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');

            projetos.forEach(p => {

                const techsDoProjeto = p.getAttribute('data-tech') || "";

                if (techsDoProjeto.includes(filtro)) {
                    p.classList.remove('oculto');
                } else {
                    p.classList.add('oculto');
                }

            });

            if (filtroAtivo) {
                filtroAtivo.textContent = "— " + this.textContent.trim();
            }

            if (btnLimpar) {
                btnLimpar.style.display = "inline-block";
            }

            // Scroll automático até projetos
            if (secaoProjetos) {
                secaoProjetos.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }

    });

});