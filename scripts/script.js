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
        // Ignora o botão de tema para o scroll
        if(this.id === 'botao-tema') return; 

        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Como o scroll agora acontece DENTRO da section#detalhes, precisamos focar lá
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

// Substitua a Lógica de Expansão dos Projetos por esta:

const botoesExpandir = document.querySelectorAll('.btn-expandir');

botoesExpandir.forEach(botao => {
    botao.addEventListener('click', function() {
        const projeto = this.closest('.projeto');
        const icone = this.querySelector('i');
        
        // Alterna a classe 'expandido' no card do projeto
        const isExpandido = projeto.classList.toggle('expandido');

        // Alterna o ícone entre expandir e diminuir
        if (isExpandido) {
            icone.classList.remove('fa-expand');
            icone.classList.add('fa-compress'); // Ícone de encolher/diminuir
            
            // Opcional: faz o card rolar suavemente para a visualização caso a tela seja pequena
            setTimeout(() => {
                projeto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        } else {
            icone.classList.remove('fa-compress');
            icone.classList.add('fa-expand'); // Ícone de expandir
        }
    });
});