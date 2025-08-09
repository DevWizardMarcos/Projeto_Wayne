document.addEventListener('DOMContentLoaded', () => {
  const analiseContent = document.querySelector('.analise-content');
  if (!analiseContent) return;

  // 1. Análise de Ameaças Atuais (já implementado)
  const ameacas = [
    { nome: "Coringa", nivel: 100, status: "Foragido", local: "Distrito Industrial", cor: "danger" },
    { nome: "Charada", nivel: 85, status: "Ativo", local: "Centro", cor: "warning" },
    { nome: "Pinguim", nivel: 70, status: "Desaparecido", local: "Iceberg Lounge", cor: "info" },
    { nome: "Bane", nivel: 90, status: "Ativo", local: "Porto", cor: "danger" }
  ];
  const ameacasHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-exclamation-triangle text-danger"></i> <b>Análise de Ameaças Atuais</b>
      </div>
      <div class="card-body">
        <div class="row">
          ${ameacas.map(a => `
            <div class="col-md-6 mb-3">
              <div class="p-3 rounded border border-${a.cor} bg-black bg-opacity-50 h-100">
                <div class="d-flex align-items-center mb-2">
                  <span class="badge bg-${a.cor} me-2" style="font-size:1.1em;">${a.nome}</span>
                  <span class="ms-auto text-muted small">${a.status}</span>
                </div>
                <div class="mb-1"><i class="fas fa-map-marker-alt text-${a.cor}"></i> <span class="text-info">${a.local}</span></div>
                <div class="progress" style="height: 18px;">
                  <div class="progress-bar bg-${a.cor}" role="progressbar" style="width: ${a.nivel}%;">
                    Nível: ${a.nivel}%
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // 2. Mapa de Incidentes em Gotham
  const mapaHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-map-marked-alt text-success"></i> <b>Mapa de Incidentes em Gotham</b>
      </div>
      <div class="card-body text-center position-relative" style="min-height: 220px;">
        <img src="assets/img/fundo.png" alt="Mapa de Gotham" class="img-fluid rounded" style="max-width: 350px; opacity: 0.8;">
        <!-- Pontos de calor fake -->
        <span style="position:absolute;top:40%;left:45%;width:24px;height:24px;background:radial-gradient(circle,#ff000088 60%,transparent 100%);border-radius:50%;"></span>
        <span style="position:absolute;top:60%;left:60%;width:18px;height:18px;background:radial-gradient(circle,#ffae0088 60%,transparent 100%);border-radius:50%;"></span>
        <span style="position:absolute;top:30%;left:70%;width:14px;height:14px;background:radial-gradient(circle,#00f2ff88 60%,transparent 100%);border-radius:50%;"></span>
        <div class="mt-2 text-muted small">Pontos de calor indicam áreas de maior atividade criminosa.</div>
      </div>
    </div>
  `;

  // 3. Reconhecimento Facial/Criminal
  const reconhecimentoHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-user-secret text-info"></i> <b>Reconhecimento Facial/Criminal</b>
      </div>
      <div class="card-body">
        <form id="faceForm" autocomplete="off" class="mb-2">
          <input type="file" class="form-control mb-2" id="faceInput" accept="image/*">
          <button type="submit" class="btn btn-outline-info btn-sm">Analisar Foto</button>
        </form>
        <div id="faceMatch" class="mt-2"></div>
      </div>
    </div>
  `;

  // 4. Estatísticas de Crimes
  const crimes = [
    { tipo: "Roubos", perc: 80, cor: "danger" },
    { tipo: "Furtos", perc: 40, cor: "warning" },
    { tipo: "Sequestros", perc: 60, cor: "info" },
    { tipo: "Ataques", perc: 30, cor: "secondary" }
  ];
  const horarios = [
    { hora: "00h-06h", perc: 20 },
    { hora: "06h-12h", perc: 15 },
    { hora: "12h-18h", perc: 35 },
    { hora: "18h-00h", perc: 70 }
  ];
  const estatisticasHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-chart-bar text-info"></i> <b>Estatísticas de Crimes</b>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <b>Tipos de Crime</b>
          ${crimes.map(c => `
            <div class="mb-2">
              <span>${c.tipo}</span>
              <div class="progress">
                <div class="progress-bar bg-${c.cor}" role="progressbar" style="width: ${c.perc}%;">
                  ${c.perc}%
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div>
          <b>Horários de Pico</b>
          ${horarios.map(h => `
            <div class="mb-2">
              <span>${h.hora}</span>
              <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar" style="width: ${h.perc}%;">
                  ${h.perc}%
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // 5. Análise de Padrões
  const padroes = [
    "Aumento de roubos em Narrows nas últimas 24h.",
    "Movimentação incomum do Charada detectada no centro.",
    "Atividade do Pinguim próxima ao porto.",
    "Relatos de toxina do medo em East End."
  ];
  const padroesHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-project-diagram text-primary"></i> <b>Análise de Padrões</b>
      </div>
      <ul class="list-group list-group-flush">
        ${padroes.map(p => `
          <li class="list-group-item bg-dark text-light">
            <i class="fas fa-angle-right text-info"></i> ${p}
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  // 6. Alertas em Tempo Real
  const alertas = [
    "Sinal do Batmóvel detectado em movimento.",
    "Movimentação suspeita no Asilo Arkham.",
    "Acesso não autorizado ao banco de dados Wayne.",
    "Bat-sinal ativado no topo do GCPD."
  ];
  const alertasHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-bell text-warning"></i> <b>Alertas em Tempo Real</b>
      </div>
      <ul class="list-group list-group-flush">
        ${alertas.map(a => `
          <li class="list-group-item bg-dark text-light">
            <i class="fas fa-exclamation-circle text-danger"></i> ${a}
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  // 7. Simulação de IA
  const iaHtml = `
    <div class="card bg-dark text-light mb-4 shadow">
      <div class="card-header">
        <i class="fas fa-robot text-secondary"></i> <b>Batcomputador IA</b>
      </div>
      <div class="card-body">
        <form id="iaForm" autocomplete="off">
          <div class="mb-2">
            <input type="text" class="form-control" id="iaPergunta" placeholder="Digite sua pergunta para o Batcomputador...">
          </div>
          <button type="submit" class="btn btn-outline-info btn-sm">Perguntar</button>
        </form>
        <div id="iaResposta" class="mt-3 text-info"></div>
      </div>
    </div>
  `;

  analiseContent.innerHTML = ameacasHtml + mapaHtml + reconhecimentoHtml + estatisticasHtml + padroesHtml + alertasHtml + iaHtml;

  // Reconhecimento facial/criminal simulado
  document.getElementById('faceForm').onsubmit = function(e) {
    e.preventDefault();
    const match = document.getElementById('faceMatch');
    const nomes = ["Coringa", "Charada", "Pinguim", "Bane"];
    const rand = Math.floor(Math.random() * nomes.length);
    match.innerHTML = `
      <div class="alert alert-info text-center mb-0">
        <i class="fas fa-user-check"></i> Face reconhecida: <b>${nomes[rand]}</b> – Periculosidade máxima.
      </div>
    `;
  };

  // Simulação simples de IA
  document.getElementById('iaForm').onsubmit = function(e) {
    e.preventDefault();
    const pergunta = document.getElementById('iaPergunta').value.trim().toLowerCase();
    const resposta = document.getElementById('iaResposta');
    if (!pergunta) {
      resposta.textContent = "Por favor, digite uma pergunta.";
      return;
    }
    // Respostas simuladas
    if (pergunta.includes("coringa")) {
      resposta.textContent = "Coringa avistado pela última vez no distrito industrial. Nível de ameaça: máximo.";
    } else if (pergunta.includes("batmóvel")) {
      resposta.textContent = "Batmóvel em patrulha automática. Status: operacional.";
    } else if (pergunta.includes("charada")) {
      resposta.textContent = "Charada deixou um novo enigma no centro de Gotham. Análise em andamento.";
    } else if (pergunta.includes("pinguim")) {
      resposta.textContent = "Pinguim monitorado próximo ao Iceberg Lounge.";
    } else {
      resposta.textContent = "Nenhuma informação relevante encontrada. Tente ser mais específico.";
    }
  };

  // Função para abrir o modal com detalhes da ameaça
  function abrirModalAmeaca(ameaca) {
    const body = document.getElementById('ameaca-modal-body');
    body.innerHTML = `
      <div class="text-center mb-3">
        <span class="badge bg-${ameaca.cor}" style="font-size:1.3em;">${ameaca.nome}</span>
        <div class="mt-2 text-muted">${ameaca.status} — <i class="fas fa-map-marker-alt text-${ameaca.cor}"></i> <span class="text-info">${ameaca.local}</span></div>
      </div>
      <div class="mb-3">
        <div class="progress" style="height: 24px;">
          <div class="progress-bar bg-${ameaca.cor}" role="progressbar" style="width: ${ameaca.nivel}%; ">
            Nível de Ameaça: ${ameaca.nivel}%
          </div>
        </div>
      </div>
      <div class="alert alert-dark border border-${ameaca.cor} mt-4">
        <b>Descrição:</b> Dados detalhados do Batcomputador sobre ${ameaca.nome} podem ser exibidos aqui.<br>
        <span class="text-secondary">* Personalize com informações do seu banco de dados ou HQ.</span>
      </div>
    `;
    const modal = new bootstrap.Modal(document.getElementById('ameacaModal'));
    modal.show();
  }

  // Adicione evento nos cards de ameaça
  document.querySelectorAll('.analise-content .col-md-6').forEach((col, idx) => {
    col.style.cursor = 'pointer';
    col.onclick = () => abrirModalAmeaca(ameacas[idx]);
  });

  document.getElementById('abrirAnaliseModal').onclick = function() {
    // Copia todo o conteúdo da análise para o modal
    document.getElementById('analise-modal-body').innerHTML = document.querySelector('.analise-content').innerHTML;
    const modal = new bootstrap.Modal(document.getElementById('analiseModal'));
    modal.show();
  };
});