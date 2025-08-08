function criarModalGotham() {
    if (document.getElementById('gothamModal')) return;

    const modalHtml = `
    <div class="modal fade" id="gothamModal" tabindex="-1" aria-labelledby="gothamModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-dark text-light">
                <div class="modal-header">
                    <h5 class="modal-title" id="gothamModalLabel">Gotham em tempo real</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body d-flex justify-content-center align-items-center" style="min-height:400px;">
                    <div class="gotham-3d-card" style="width:100%;height:100%;position:relative;">
                        <img src="assets/img/gothamup.png" alt="Gotham City" class="gotham-img" style="width:100%;height:100%;position:absolute;top:0;left:0;">
                        <video class="gotham-video" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;display:none;border-radius:18px;z-index:2;" loop muted playsinline>
                            <source src="assets/video/gotham-3d.mp4" type="video/mp4">
                            Seu navegador não suporta vídeo.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Efeito hover para mostrar vídeo e esconder imagem
    setTimeout(() => {
        const card = document.querySelector('.gotham-3d-card');
        const img = card.querySelector('.gotham-img');
        const video = card.querySelector('.gotham-video');
        card.addEventListener('mouseenter', () => {
            img.style.display = 'none';
            video.style.display = 'block';
            video.currentTime = 0;
            video.play();
        });
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.style.display = 'none';
            img.style.display = 'block';
        });
    }, 500);
}

function criarImagemGothamTrigger() {
    const painel = document.querySelector('.gotham-city.panel');
    if (!painel) return;

    if (document.getElementById('gothamTriggerImg')) return;

    painel.innerHTML = `
        <h2>GOTHAM CITY</h2>
        <img id="gothamTriggerImg" src="assets/img/gothamup.png" alt="Abrir Gotham" 
            style="width:100%;max-width:340px;cursor:pointer;border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,0.7);transition:transform .2s;">
    `;
    document.getElementById('gothamTriggerImg').onclick = () => {
        const modal = new bootstrap.Modal(document.getElementById('gothamModal'));
        modal.show();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    criarModalGotham();
    criarImagemGothamTrigger();
});