function autenticar(event){
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const enigma = document.getElementById('enigma').value;

    console.log(email, senha, enigma);
}

const emailCodificado = "QnJ1Y2VUaG9tYXNAV2F5bmUuY29t";
const senhaCodificada = "SnNvbnRvZGR5";
const enigmaCodificado = "QXJraGFtIC8gV2F5bmU=";

function autenticar(event){
    event.preventDefault();
    
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    const enigma = document.getElementById('enigma').value

    if (
        email === atob (emailCodificado) && 
        senha === atob (senhaCodificada) && 
        enigma === atob (enigmaCodificado)
    )
    {   
        const animacaoDiv = document.getElementById('batman-animacao');
        animacaoDiv.innerHTML = `

        
        `;
        setTimeout(()=>{
            document.getElementById('batman-logo').style.opacity = 1;
        },100)

        setTimeout(() =>{
            document.getElementById('batman-logo').style.opacity = 0
        }, 2000);

        setTimeout(()=>{
            
        window.location.href = "Dashboren Wayne/index.html";
            
        },2500);




    }

    else {
         alert("Tentantiva de Invasão")
    }

    document.querySelector('form').style.display = 'none';

    const alertaDiv = document.getElementById('alerta-invasor');
    alertaDiv.innerHTML = `
    <video id="video-invasor" src="assets/acesso.mp4" autoplay></video>

    `;
    const video = document.getElementById('video-invasor');
    video.onended = function(){
        alertaDiv.innerHTML = `
        <img src="assets/img/jump.jpg" style="width:100vw;height:100vh;object-fit:cover;">
        <audio src="assets/audios/jump.mp3" autoplay></audio>
        <audio src="assets/audios/jump.mp3" autoplay></audio>
        `;
    };








    fetch('./registrar_invasor.php',{
        method : 'POST',
        headers : {'content-Type' : 'application/x-www-form-urlencoded'},
        body: `email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}&enigma=${encodeURIComponent(enigma)}`
    })
}