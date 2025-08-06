const batmovelImages = [
    { src: 'assets/img/batmovel1966.png', legenda: 'Batmóvel 1966' },
    { src: 'assets/img/batmovel1989.png', legenda: 'Batmóvel 1989' },
    { src: 'assets/img/batmovel2005.png', legenda: 'Batmóvel 2005' },
    { src: 'assets/img/batmovel2022.png', legenda: 'Batmóvel 2022' }
];

let batmovelIndex  = 0 // começa o no index 0 


//troca de slides 
function updateBatmovelCarousel(){
    const img = document.getElementById('batmovel-img');
    const caption = document.getElementById('batmovel-caption');
    img.src = batmovelImages[batmovelIndex].src; 
    caption.textContent = batmovelImages[batmovelIndex].legenda;
    img.classList.add('girar');
}   


function showBatmovelGallery(){
  batmovelIndex = 0;
  updateBatmovelCarousel();
    //munça de slide
  document.getElementById('prev-batmovel').onclick = function(){
    batmovelIndex = (batmovelIndex - 1 + batmovelImages.length) % batmovelImages.length;
    updateBatmovelCarousel();
  };

  document.getElementById('next-batmovel').onclick = function(){
    batmovelIndex = (batmovelIndex + 1 ) % batmovelImages.length;
    updateBatmovelCarousel();
  };
}

const batmovelModal = document.getElementById('batmovelModal');
if(batmovelModal){
    batmovelModal.addEventListener('show.bs.modal', showBatmovelGallery);
}