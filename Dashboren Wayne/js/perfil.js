const viloes = [
  {
    nome: "Coringa",
    codinome: "Joker",
    descricao: "Perfil psicológico altamente instável. Mestre do caos, utiliza toxinas e armadilhas letais. Sorriso permanente causado por desfiguração química. Periculosidade máxima. Motivações imprevisíveis.",
    imgBase: "assets/img/hologramas/jokker.png",
    imgHover: "assets/img/hologramas/jokker2.png"
  },
  {
    nome: "Charada",
    codinome: "Riddler",
    descricao: "Obcecado por enigmas e desafios intelectuais. Deixa pistas criptografadas em cenas de crime. Altíssimo QI, porém narcisista. Perigo: manipulação psicológica e armadilhas lógicas.",
    imgBase: "assets/img/hologramas/charada.png",
    imgHover: "assets/img/hologramas/charada2.png"
  },
  {
    nome: "Harvey Dent",
    codinome: "Duas-Caras",
    descricao: "Ex-promotor de Gotham. Personalidade dividida após trauma químico. Decisões baseadas no acaso (moeda). Perigo: imprevisibilidade e liderança de organizações criminosas.",
    imgBase: "assets/img/hologramas/duas-caras.png",
    imgHover: "assets/img/hologramas/duas-caras2.png"
  },
  {
    nome: "Oswald Cobblepot",
    codinome: "Pinguim",
    descricao: "Chefão do submundo. Usa fachada de empresário. Especialista em armas ocultas (guarda-chuva). Perigo: influência política e recursos ilimitados.",
    imgBase: "assets/img/hologramas/pinguim.png",
    imgHover: "assets/img/hologramas/pinguim2.png"
  },
  {
    nome: "Jonathan Crane",
    codinome: "Espantalho",
    descricao: "Ex-psiquiatra. Mestre do medo, utiliza toxinas alucinógenas. Perigo: ataques psicológicos em massa e manipulação de fobias.",
    imgBase: "assets/img/hologramas/espantalho.png",
    imgHover: "assets/img/hologramas/espantalho2.png"
  },
  {
    nome: "Bane",
    codinome: "Bane",
    descricao: "Força sobre-humana devido ao composto Veneno. Tático brilhante, já derrotou Batman fisicamente. Perigo: força bruta e inteligência estratégica.",
    imgBase: "assets/img/hologramas/bane.png",
    imgHover: "assets/img/hologramas/bane2.png"
  },
  {
    nome: "Selina Kyle",
    codinome: "Mulher-Gato",
    descricao: "Ladra ágil e mestre em infiltração. Motivação ambígua: oscila entre aliada e adversária. Perigo: habilidades acrobáticas e manipulação social.",
    imgBase: "assets/img/hologramas/catwoman.png",
    imgHover: "assets/img/hologramas/catwoman2.png"
  },
  {
    nome: "Ra’s al Ghul",
    codinome: "Ra’s al Ghul",
    descricao: "Líder da Liga das Sombras. Imortalidade parcial via Poço de Lázaro. Perigo: recursos globais, treinamento marcial e visão extremista de justiça.",
    imgBase: "assets/img/hologramas/ras.png",
    imgHover: "assets/img/hologramas/ras2.png"
  },
  {
    nome: "Victor Fries",
    codinome: "Senhor Frio",
    descricao: "Especialista em criogenia. Precisa de traje refrigerado para sobreviver. Perigo: armas de congelamento em massa e motivação pessoal obsessiva.",
    imgBase: "assets/img/hologramas/frio.png",
    imgHover: "assets/img/hologramas/frio2.png"
  },
  {
    nome: "Waylon Jones",
    codinome: "Crocodilo",
    descricao: "Mutação genética resultou em força e resistência sobre-humanas. Instintos predatórios. Perigo: ataques físicos devastadores e domínio de áreas subterrâneas.",
    imgBase: "assets/img/hologramas/crocodilo.png",
    imgHover: "assets/img/hologramas/crocodilo2.png"
  }
];



let vilaoAtual = 0;

function criarCardVilao(vilao, efeitoHover = true) {
  const card = document.createElement('div');
  card.className = 'vilao-3d-card';
  card.innerHTML = `
    <div class="vilao-img-container" style="perspective: 1000px;">
      <img src="${vilao.imgBase}" alt="${vilao.nome}" class="vilao-img" style="transition: transform 0.5s;">
      <img src="${vilao.imgHover}" alt="${vilao.nome} Hover" class="vilao-img-hover" style="display:none;position:absolute;top:0;left:0;width:100%;height:100%;">
    </div>
    <div class="vilao-info mt-3">
      <h4>${vilao.nome} <small>(${vilao.codinome})</small></h4>
      <p>${vilao.descricao}</p>
    </div>
  `;

  // Efeito 3D e troca de imagem ao passar o mouse
  if (efeitoHover) {
    const imgBase = card.querySelector('.vilao-img');
    const imgHover = card.querySelector('.vilao-img-hover');
    card.addEventListener('mouseenter', () => {
      imgBase.style.display = 'none';
      imgHover.style.display = 'block';
      card.style.transform = 'translateY(-30px) scale(1.05) rotateX(10deg)';
    });
    card.addEventListener('mouseleave', () => {
      imgBase.style.display = 'block';
      imgHover.style.display = 'none';
      card.style.transform = '';
    });
  }
  card.style.position = 'relative';
  card.style.width = '320px';
  card.style.margin = '0 auto';
  return card;
}

function mostrarVilao(index) {
  const body = document.getElementById('perfil-modal-body');
  body.innerHTML = '';
  body.appendChild(criarCardVilao(viloes[index]));

  // Navegação tipo carrossel
  const nav = document.createElement('div');
  nav.className = 'd-flex justify-content-between mt-4';
  nav.innerHTML = `
    <button class="btn btn-outline-light" id="prevVilao"><i class="fas fa-chevron-left"></i></button>
    <button class="btn btn-outline-light" id="nextVilao"><i class="fas fa-chevron-right"></i></button>
  `;
  body.appendChild(nav);

  document.getElementById('prevVilao').onclick = () => {
    vilaoAtual = (vilaoAtual - 1 + viloes.length) % viloes.length;
    mostrarVilao(vilaoAtual);
  };
  document.getElementById('nextVilao').onclick = () => {
    vilaoAtual = (vilaoAtual + 1) % viloes.length;
    mostrarVilao(vilaoAtual);
  };
}

// Evento para abrir o modal e mostrar o primeiro vilão
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('abrirPerfilModal').onclick = () => {
    vilaoAtual = 0;
    mostrarVilao(vilaoAtual);
    const modal = new bootstrap.Modal(document.getElementById('perfilModal'));
    modal.show();
  };
});