const loginAtual = localStorage.getItem("usuariologado");
if (!loginAtual) {
  window.location.replace("cadastro.html");
}

const datacampo = document.querySelector(".data");
const codigocampo = document.querySelector(".codigo");
const produtocampo = document.querySelector(".produtoselect");
const marcacampo = document.querySelector(".marcaselect");
const funcionariocampo = document.querySelector(".funcionario");
const valorcampo = document.querySelector(".valor");
const btncampo = document.querySelector(".btn");
const tbody = document.querySelector(".tbody");
const dataalterar = document.querySelector(".dataalterar");
const buttonalterar = document.querySelector(".altrarbutton");
const btncriar = document.querySelector(".btncriar");

function campoprenchido(){
    return(
    datacampo.value === "" || 
    codigocampo.value === "" ||
    produtocampo.value === "" ||
    marcacampo.value === "" ||
    funcionariocampo.value === "" ||
    valorcampo.value === "")
}

valorcampo.addEventListener("input", () => formatarMoeda(valorcampo));
function formatarMoeda(campo) {
    let valor = campo.value.replace(/\D/g, "");
    valor = (parseInt(valor) / 100).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    campo.value = "R$ " + valor;
}

let ordemAscendente = true; 
function ordernar (indiceColuna){
    const linhas = Array.from(tbody.querySelectorAll("tr"));
    linhas.sort((a, b) => {
        const valorA = a.children[indiceColuna].textContent.toLowerCase();
        const valorB = b.children[indiceColuna].textContent.toLowerCase();
    
        if (!isNaN(valorA) && !isNaN(valorB)) {
          return ordemAscendente ? valorA - valorB : valorB - valorA; }
    
        return ordemAscendente
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA); });

      linhas.sort((a, b) => {
        const valorA = a.children[indiceColuna].textContent.replace(/[^\d,-]/g, "").replace(",", ".");
        const valorB = b.children[indiceColuna].textContent.replace(/[^\d,-]/g, "").replace(",", ".");
        const numeroA = parseFloat(valorA);
        const numeroB = parseFloat(valorB);
    
        return ordemAscendente ? numeroA - numeroB : numeroB - numeroA;
     });
    linhas.forEach(linha => tbody.appendChild(linha));
      ordemAscendente = !ordemAscendente;
}
function criacaoitem (){
    datacampo.value = "";
    codigocampo.value = "";
    produtocampo.value = "";
    marcacampo.value = "";
    funcionariocampo.value = "";
    valorcampo.value = "";}

function criação(item) { 
    const trc = document.createElement("tr");
    const datavalor = document.createElement("td");
    const codigovalor = document.createElement("td");
    const produtorvalor = document.createElement("td");
    const marcavalor = document.createElement("td");
    const funcionariovalor = document.createElement("td");
    const valorvalor = document.createElement("td");
    const lixeira = document.createElement("td");
    const lixeiraicone = document.createElement("i");
    const pencil = document.createElement("td");
    const pencilicone = document.createElement("i");

    datavalor.innerText = item.data;
    codigovalor.innerText = item.codigo;
    produtorvalor.innerText = item.produto;
    marcavalor.innerText = item.marca;
    funcionariovalor.innerText = item.funcionario;
    valorvalor.innerText = item.valor;
 
    pencilicone.classList.add("bi-pencil-square");
    pencil.appendChild(pencilicone)
    lixeiraicone.classList.add("bi-trash2-fill");
    lixeira.appendChild(lixeiraicone);

    trc.appendChild(datavalor);
    trc.appendChild(codigovalor);
    trc.appendChild(produtorvalor);
    trc.appendChild(marcavalor);
    trc.appendChild(funcionariovalor);
    trc.appendChild(valorvalor);
    trc.appendChild(lixeira);
    trc.appendChild(pencil) 
    tbody.appendChild(trc);



    lixeira.addEventListener("mouseenter", () => {
        trc.style.backgroundColor = "#bd0606";
        trc.style.color = "white";
        lixeiraicone.style.color = "white";
    })
    lixeira.addEventListener("mouseleave",()=> {
        trc.style.backgroundColor = "";
        trc.style.color = "";
        lixeiraicone.style.color= "";
    })
   
    lixeiraicone.addEventListener("click", () => {
        const confirmar = confirm("Tem certeza que deseja excluir este item?");
        if (!confirmar) return;

        trc.remove();
        let dadoslocalstorage = JSON.parse(localStorage.getItem(`tabela_${loginAtual}`)) || [];
        dadoslocalstorage = dadoslocalstorage.filter(dado => dado.codigo !== item.codigo);
        localStorage.setItem(`tabela_${loginAtual}`, JSON.stringify(dadoslocalstorage));
    });


    pencil.addEventListener("mouseenter", ()=> {
        trc.style.backgroundColor = "#008300";
        trc.style.color = "white";
        pencilicone.style.color = "white";
    })
    pencil.addEventListener("mouseleave", ()=> {
        trc.style.backgroundColor= "";
        trc.style.color= "";
        pencilicone.style.color="";
    })

    pencil.addEventListener("click", (alvo) => {
        const alvoe = alvo.target.parentElement.parentElement;
        datacampo.value = item.data;
        produtocampo.value = item.produto;
        codigocampo.value = item.codigo;
        marcacampo.value = item.marca;
        funcionariocampo.value = item.funcionario;
        valorcampo.value = item.valor;

        btncriar.classList.add("hidden");
        buttonalterar.classList.remove("hidden");

        buttonalterar.onclick = () =>  {
            if (campoprenchido()) {
                alert("Preencha Todos os Campos para Criar!!!");
                return; }

          const tds = alvoe.querySelectorAll("td");
          tds[0].textContent = datacampo.value;
          tds[1].textContent = codigocampo.value;
          tds[2].textContent = produtocampo.value;
          tds[3].textContent = marcacampo.value;
          tds[4].textContent = funcionariocampo.value;
          tds[5].textContent = valorcampo.value;

          let dados = JSON.parse(localStorage.getItem(`tabela_${loginAtual}`))||[];
          const index = dados.findIndex(d => d.codigo === item.codigo);
          if(index !== -1){
            dados[index]= {
                data: datacampo.value,
                codigo: codigocampo.value,
                produto: produtocampo.value,
                marca: marcacampo.value,
                funcionario: funcionariocampo.value,
                valor: valorcampo.value
            }
            localStorage.setItem(`tabela_${loginAtual}`, JSON.stringify(dados));
          }
          criacaoitem();
          
          btncriar.classList.remove("hidden");
          buttonalterar.classList.add("hidden");

          localStorage.setItem(`tabela_${loginAtual}`, JSON.stringify(dados));
          tbody.innerHTML = ""; 
          const dadoslocalstorage = JSON.parse(localStorage.getItem(`tabela_${loginAtual}`)) || [];
          dadoslocalstorage.forEach(item => criação(item)); ;
        }
    })
}
 
btncampo.addEventListener("click", () => {
    if (campoprenchido()) {
        alert("Preencha Todos os Campos para Criar!!!");
        return; }

    const novoitem = {
        data: datacampo.value, /* pra guardar no local storage */
        codigo: codigocampo.value,
        produto: produtocampo.value,
        marca: marcacampo.value,
        funcionario: funcionariocampo.value,
        valor: valorcampo.value    };

    let dadoslocalstorage = JSON.parse(localStorage.getItem(`tabela_${loginAtual}`)) || [];
    dadoslocalstorage.push(novoitem);
    localStorage.setItem(`tabela_${loginAtual}`, JSON.stringify(dadoslocalstorage));

    criação(novoitem);
    criacaoitem()
})

window.addEventListener("load", () => {/* puxar do local storage */
    const dadoslocalstorage = JSON.parse(localStorage.getItem(`tabela_${loginAtual}`)) || [];
    dadoslocalstorage.forEach(item => criação(item));
});

const searchInput = document.querySelector(".search")

searchInput.addEventListener("keyup", () => {
    const filtro = searchInput.value.toLowerCase();
    const linhas = document.querySelectorAll(".tableprincipal tbody tr");
    linhas.forEach((linha) => {
        const colunas = linha.querySelectorAll("td");
        let encontrou = false;
        colunas.forEach((coluna) => {
            if (coluna.textContent.toLowerCase().includes(filtro)) {
                encontrou = true;  } });
        linha.style.display = encontrou ? "" : "none";
    });
});

const sair = document.querySelector(".Sair")
sair.addEventListener("click", ()=> {
    localStorage.removeItem("usuariologado");
    window.location.href = "cadastro.html";
})