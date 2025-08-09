const batmovelImages = [
    { id: 1, src: 'assets/img/batmovel1966.png', legenda: 'Batmóvel 1966', ano: 1966 },
    { id: 2, src: 'assets/img/batmovel1989.png', legenda: 'Batmóvel 1989', ano: 1989 },
    { id: 3, src: 'assets/img/batmovel2005.png', legenda: 'Batmóvel 2005', ano: 2005 },
    { id: 4, src: 'assets/img/batmovel2022.png', legenda: 'Batmóvel 2022', ano: 2022 }
];

let batmovelIndex = 0;
let nextId = 5; // Para novos IDs únicos

// Função para atualizar o carousel com animação
function updateBatmovelCarousel(){
    const img = document.getElementById('batmovel-img');
    const caption = document.getElementById('batmovel-caption');
    
    if (!img || !caption) return;
    
    if (batmovelImages.length === 0) {
        img.src = 'assets/img/no-batmovel.png';
        caption.textContent = 'Nenhum Batmóvel disponível';
        updateCounter();
        return;
    }
    
    // Remover animações anteriores
    img.classList.remove('girar', 'girar-entrada');
    
    // Pequeno delay para garantir que a animação seja removida
    setTimeout(() => {
        img.src = batmovelImages[batmovelIndex].src; 
        caption.textContent = `${batmovelImages[batmovelIndex].legenda} (${batmovelImages[batmovelIndex].ano})`;
        
        // Adicionar animação de entrada primeiro
        img.classList.add('girar-entrada');
        
        // Depois de completar a entrada, adicionar rotação contínua
        setTimeout(() => {
            img.classList.remove('girar-entrada');
            img.classList.add('girar');
        }, 500);
        
        // Atualizar contador
        updateCounter();
    }, 50);
}

// Função para atualizar contador de imagens
function updateCounter() {
    const counter = document.getElementById('batmovel-counter');
    if (counter && batmovelImages.length > 0) {
        counter.textContent = `${batmovelIndex + 1} / ${batmovelImages.length}`;
    }
}

// Função para mostrar a galeria
function showBatmovelGallery(){
    batmovelIndex = 0;
    updateBatmovelCarousel();
    updateBatmovelList();
    
    // Configurar navegação de slides
    const prevBtn = document.getElementById('prev-batmovel');
    const nextBtn = document.getElementById('next-batmovel');
    
    if (prevBtn) {
        prevBtn.onclick = function(){
            if (batmovelImages.length > 0) {
                batmovelIndex = (batmovelIndex - 1 + batmovelImages.length) % batmovelImages.length;
                updateBatmovelCarousel();
            }
        };
    }

    if (nextBtn) {
        nextBtn.onclick = function(){
            if (batmovelImages.length > 0) {
                batmovelIndex = (batmovelIndex + 1) % batmovelImages.length;
                updateBatmovelCarousel();
            }
        };
    }
}

// Função para adicionar novo Batmóvel
function addBatmovel() {
    const src = document.getElementById('new-batmovel-src')?.value.trim();
    const legenda = document.getElementById('new-batmovel-legenda')?.value.trim();
    const ano = parseInt(document.getElementById('new-batmovel-ano')?.value);
    
    if (!src || !legenda || !ano || isNaN(ano)) {
        showAlert('Por favor, preencha todos os campos corretamente!', 'warning');
        return;
    }
    
    if (ano < 1939 || ano > 2030) {
        showAlert('Ano deve estar entre 1939 e 2030!', 'warning');
        return;
    }
    
    // Verificar se a URL da imagem é válida
    const img = new Image();
    img.onload = function() {
        const newBatmovel = {
            id: nextId++,
            src: src,
            legenda: legenda,
            ano: ano
        };
        
        batmovelImages.push(newBatmovel);
        
        // Limpar formulário
        document.getElementById('new-batmovel-src').value = '';
        document.getElementById('new-batmovel-legenda').value = '';
        document.getElementById('new-batmovel-ano').value = '';
        
        // Limpar preview
        const previewImg = document.getElementById('preview-img');
        const previewPlaceholder = document.getElementById('preview-placeholder');
        
        if (previewImg) previewImg.style.display = 'none';
        if (previewPlaceholder) {
            previewPlaceholder.style.display = 'block';
            previewPlaceholder.innerHTML = `
                <i class="fas fa-image fa-3x"></i>
                <p>Digite uma URL válida para ver o preview</p>
            `;
        }
        
        // Atualizar visualização
        updateBatmovelCarousel();
        updateBatmovelList();
        
        showAlert('Batmóvel adicionado com sucesso!', 'success');
        
        // Opcional: mudar para aba de visualização
        const viewTab = document.getElementById('view-tab');
        if (viewTab) {
            setTimeout(() => {
                var tab = new bootstrap.Tab(viewTab);
                tab.show();
            }, 1000);
        }
    };
    
    img.onerror = function() {
        showAlert('URL da imagem inválida! Verifique se o link está correto.', 'error');
    };
    
    img.src = src;
}

// Função para remover Batmóvel
function removeBatmovel(id) {
    const batmovel = batmovelImages.find(bat => bat.id === id);
    if (!batmovel) return;
    
    if (confirm(`Tem certeza que deseja remover "${batmovel.legenda}"?`)) {
        const index = batmovelImages.findIndex(bat => bat.id === id);
        if (index !== -1) {
            batmovelImages.splice(index, 1);
            
            // Ajustar índice se necessário
            if (batmovelIndex >= batmovelImages.length) {
                batmovelIndex = Math.max(0, batmovelImages.length - 1);
            }
            
            updateBatmovelCarousel();
            updateBatmovelList();
            showAlert('Batmóvel removido com sucesso!', 'success');
        }
    }
}

// Função para editar Batmóvel
function editBatmovel(id) {
    const batmovel = batmovelImages.find(bat => bat.id === id);
    if (!batmovel) return;
    
    const newSrc = prompt('Nova URL da imagem:', batmovel.src);
    if (newSrc === null) return;
    
    const newLegenda = prompt('Nova legenda:', batmovel.legenda);
    if (newLegenda === null) return;
    
    const newAno = prompt('Novo ano:', batmovel.ano);
    if (newAno === null) return;
    
    const anoNumerico = parseInt(newAno);
    if (isNaN(anoNumerico) || anoNumerico < 1939 || anoNumerico > 2030) {
        showAlert('Ano inválido! Deve estar entre 1939 e 2030.', 'warning');
        return;
    }
    
    // Verificar se a nova URL é válida
    if (newSrc.trim() !== batmovel.src) {
        const img = new Image();
        img.onload = function() {
            batmovel.src = newSrc.trim();
            batmovel.legenda = newLegenda.trim();
            batmovel.ano = anoNumerico;
            
            updateBatmovelCarousel();
            updateBatmovelList();
            showAlert('Batmóvel atualizado com sucesso!', 'success');
        };
        
        img.onerror = function() {
            showAlert('URL da imagem inválida!', 'error');
        };
        
        img.src = newSrc.trim();
    } else {
        batmovel.legenda = newLegenda.trim();
        batmovel.ano = anoNumerico;
        
        updateBatmovelCarousel();
        updateBatmovelList();
        showAlert('Batmóvel atualizado com sucesso!', 'success');
    }
}

// Função para atualizar lista de Batmóveis
function updateBatmovelList() {
    const listContainer = document.getElementById('batmovel-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    if (batmovelImages.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-car fa-4x mb-3 text-secondary"></i>
                <h5>Nenhum Batmóvel cadastrado</h5>
                <p>Use a aba "Adicionar" para cadastrar um novo Batmóvel</p>
            </div>
        `;
        return;
    }
    
    batmovelImages.forEach((batmovel, index) => {
        const item = document.createElement('div');
        item.className = 'batmovel-list-item';
        item.innerHTML = `
            <div class="batmovel-item-content">
                <img src="${batmovel.src}" alt="${batmovel.legenda}" class="batmovel-thumb" loading="lazy">
                <div class="batmovel-info">
                    <h6>${batmovel.legenda}</h6>
                    <small>Ano: ${batmovel.ano}</small>
                    <small>ID: ${batmovel.id}</small>
                </div>
                <div class="batmovel-actions">
                    <button class="btn btn-sm btn-info" onclick="goToBatmovel(${index})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editBatmovel(${batmovel.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="removeBatmovel(${batmovel.id})" title="Remover">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// Função para ir para um Batmóvel específico
function goToBatmovel(index) {
    batmovelIndex = index;
    updateBatmovelCarousel();
    
    // Mudar para aba de visualização
    const viewTab = document.getElementById('view-tab');
    if (viewTab) {
        viewTab.click();
    }
}

// Função para exportar dados
function exportBatmovelData() {
    if (batmovelImages.length === 0) {
        showAlert('Não há dados para exportar!', 'warning');
        return;
    }
    
    const dataStr = JSON.stringify(batmovelImages, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `batmovel-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    showAlert('Dados exportados com sucesso!', 'success');
}

// Função para importar dados
function importBatmovelData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/json') {
        showAlert('Formato de arquivo inválido! Use apenas arquivos .json', 'error');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedData)) {
                throw new Error('Formato de dados inválido');
            }
            
            // Validar estrutura dos dados
            const isValidData = importedData.every(item => 
                item.hasOwnProperty('id') && 
                item.hasOwnProperty('src') && 
                item.hasOwnProperty('legenda') && 
                item.hasOwnProperty('ano')
            );
            
            if (!isValidData) {
                throw new Error('Estrutura de dados inválida');
            }
            
            if (confirm(`Isso irá substituir todos os ${batmovelImages.length} Batmóveis atuais por ${importedData.length} novos. Continuar?`)) {
                batmovelImages.length = 0; // Limpar array
                batmovelImages.push(...importedData);
                
                // Atualizar nextId
                nextId = Math.max(...batmovelImages.map(b => b.id || 0)) + 1;
                
                batmovelIndex = 0;
                updateBatmovelCarousel();
                updateBatmovelList();
                
                showAlert(`${importedData.length} Batmóveis importados com sucesso!`, 'success');
            }
        } catch (error) {
            showAlert('Erro ao importar dados: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
    
    // Limpar input
    event.target.value = '';
}

// Função para mostrar alertas estilizados
function showAlert(message, type) {
    const alertTypes = {
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-danger',
        info: 'alert-info'
    };
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertTypes[type]} alert-dismissible fade show position-relative`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Adicionar no topo do modal body
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.insertBefore(alertDiv, modalBody.firstChild);
    }
    
    // Auto-remover após 4 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 4000);
}

// Função para preview da imagem
function setupImagePreview() {
    const srcInput = document.getElementById('new-batmovel-src');
    const previewImg = document.getElementById('preview-img');
    const previewPlaceholder = document.getElementById('preview-placeholder');
    
    if (srcInput && previewImg && previewPlaceholder) {
        srcInput.addEventListener('input', function() {
            const url = this.value.trim();
            
            if (url) {
                // Mostrar loading
                previewPlaceholder.style.display = 'block';
                previewPlaceholder.innerHTML = `
                    <i class="fas fa-spinner fa-spin fa-2x"></i>
                    <p>Carregando preview...</p>
                `;
                
                previewImg.src = url;
                
                previewImg.onerror = function() {
                    previewImg.style.display = 'none';
                    previewPlaceholder.style.display = 'block';
                    previewPlaceholder.innerHTML = `
                        <i class="fas fa-exclamation-triangle fa-3x text-warning"></i>
                        <p>URL da imagem inválida</p>
                    `;
                };
                
                previewImg.onload = function() {
                    previewImg.style.display = 'block';
                    previewPlaceholder.style.display = 'none';
                };
            } else {
                previewImg.style.display = 'none';
                previewPlaceholder.style.display = 'block';
                previewPlaceholder.innerHTML = `
                    <i class="fas fa-image fa-3x"></i>
                    <p>Digite uma URL válida para ver o preview</p>
                `;
            }
        });
    }
}

// Event listeners
const batmovelModal = document.getElementById('batmovelModal');
if(batmovelModal){
    batmovelModal.addEventListener('show.bs.modal', showBatmovelGallery);
}

// Event listener principal
document.addEventListener('DOMContentLoaded', function() {
    // Configurar formulário de adicionar
    const addForm = document.getElementById('add-batmovel-form');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addBatmovel();
        });
    }
    
    // Configurar importação de arquivo
    const importInput = document.getElementById('import-file');
    if (importInput) {
        importInput.addEventListener('change', importBatmovelData);
    }
    
    // Setup inicial do preview
    setupImagePreview();

    // Forçar Bootstrap a inicializar abas manualmente (caso necessário)
    var triggerTabList = [].slice.call(document.querySelectorAll('#batmovelTabs .nav-link'));
    triggerTabList.forEach(function(triggerEl) {
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            var tab = new bootstrap.Tab(triggerEl);
            tab.show();
        });
    });
});