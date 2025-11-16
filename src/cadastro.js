const login = document.querySelector(".login")
const senha = document.querySelector(".senha")
const btnentrar = document.querySelector(".Entrarbtn")

const nomecriar = document.querySelector(".nomecriar")
const emailcriar = document.querySelector(".emailcriar")
const logincriar = document.querySelector(".logincriar")
const btnnaopossuo = document.querySelector(".naopossuocontabtn")

const senhacriar = document.querySelector(".senhacriar")
const senhaverificaçao = document.querySelector(".senhaverificaçao")
const byeeye = document.querySelector(".eye1")
const byeeye2 = document.querySelector(".eye2")
const eyelogin = document.querySelector(".eyelogin")


const fecharnaopossuo = document.querySelector(".bi-x-circle")
const fundonaopossuo = document.querySelector(".fundonaopossuoconta")
const naopossuo = document.querySelector(".naopossuoconta")
const esquecisenha = document.querySelector(".Esquecisenha")
const fecharesqueci = document.querySelector(".fecharesqueciconta")


emailcriar.addEventListener("input", () => {
   const valor = emailcriar.value.trim();
   if (!valor.endsWith("@gmail.com")) {
     emailcriar.setCustomValidity("o email deve termninar com @gmail")
     emailcriar.reportValidity();
   }else{
      emailcriar.setCustomValidity("")
   }
})

/* fechar nao possuo conta */
function fechardiv (){
   naopossuo.classList.add("hidden")
   fundonaopossuo.classList.add("hidden")
}
fecharnaopossuo.addEventListener("click", () => {
  fechardiv();
})
fundonaopossuo.addEventListener("click", () => {
   fechardiv();
   esquecisenha.classList.add("hidden")
})
fecharesqueci.addEventListener("click", () => {
   fundonaopossuo.classList.add("hidden")
   esquecisenha.classList.add("hidden")
})
/*nao possuo conta*/
/*abrir o nao possuo conta */
const abrirconta = document.querySelector(".abrircriarconta")
abrirconta.addEventListener("click", () => {
naopossuo.classList.remove("hidden")
fundonaopossuo.classList.remove ("hidden")
})

const esquciminhaconta = document.querySelector(".esqueciconta")

esquciminhaconta.addEventListener("click", () => {
fundonaopossuo.classList.remove("hidden")
esquecisenha.classList.remove("hidden")
})
/*change password type para text */

eyelogin.addEventListener("click", () => {
   if(senha.type === "password"){
      senha.type = "text"
   }else {
      senha.type = "password"
   }
})

 byeeye.addEventListener("click", () => {
   if(senhacriar.type === "password"){
      senhacriar.type = "text";
   }else{
      senhacriar.type="password";
   }
 })

 byeeye2.addEventListener("click", () => {
   if(senhaverificaçao.type === "password"){
      senhaverificaçao.type = "text";
   }else{
      senhaverificaçao.type="password";
   }
 })

 function novousuario (){
   return{
      nome: nomecriar.value,
      email: emailcriar.value,
      login: logincriar.value,
      senha: senhacriar.value,
      senha2: senhaverificaçao.value
   }
 }

btnnaopossuo.addEventListener("click", () => {
    const usuario = novousuario();
   
   if(usuario.nome=== "" ||
      usuario.email === ""||
      usuario.login === "" ||
      usuario.senha === ""||
      usuario.senha2 === "")

      {alert("prencha todos os campos")
      return;}

   if(usuario.senha !== usuario.senha2){
         alert("senha não compativel.")
         return
      }

   let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const loginExiste = usuarios.some(u => u.login.trim() === usuario.login.trim());
  const emailExiste = usuarios.some(u => u.email.trim() === usuario.email.trim());
  if (loginExiste && emailExiste) {
    alert("Já existe uma conta com esse login e e-mail.");
    return;
  } 
  else if (loginExiste) {
    alert("Esse login já está em uso.");
    return; }

  else if (emailExiste) {
    alert("Esse e-mail já está cadastrado.");
    return; }

   usuarios.push(usuario);
   localStorage.setItem("usuarios", JSON.stringify(usuarios));
   
   alert("cadastro criado com sucesso!")  
   fechardiv();

   nomecriar.value = "";
   emailcriar.value = "";
   logincriar.value = "";
   senhacriar.value = "";
   senhaverificaçao.value = "";
})

btnentrar.addEventListener("click", () => {
   const loginvalue = login.value.trim();
   const senhavalue = senha.value.trim();

    console.log(loginvalue ,senhavalue);

    if(loginvalue === ""||
       senhavalue === ""
    ) { alert("prencha os campo")
      return;}

   const usuarios = JSON.parse(localStorage.getItem("usuarios"))||[];

   const usuarioautenticado = usuarios.find(u => u.login.trim() === loginvalue && u.senha.trim() === senhavalue);

   if (usuarioautenticado) {
      localStorage.setItem("usuariologado", JSON.stringify(usuarioautenticado));
      window.location.href = "dado.html";
   } 
   else{
      alert("login ou email errado");
   }
})
 
const esquecisenhabtn = document.querySelector(".Esquecisenhabtn");
const loginesqueceu = document.querySelector(".loginesqueceu");
const emailesqueceu = document.querySelector(".emailesqueceu");

esquecisenhabtn.addEventListener("click", () => {
  if (loginesqueceu.value === "" || emailesqueceu.value === "") {
    alert("Preencha os campos");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const login = loginesqueceu.value.trim();
  const email = emailesqueceu.value.trim();

  const usuarioEncontrado = usuarios.find(u =>
    u.login.trim() === login &&
    u.email.trim() === email
  );

  if (usuarioEncontrado) {
    emailjs.send("service_g7tlgmk", "template_wx0ajl6", {
      to_email: usuarioEncontrado.email,
  login: usuarioEncontrado.login,
  mensagem: `...conteúdo HTML acima...`
    }).then(() => {
      alert("Email enviado com sucesso!");
      fundonaopossuo.classList.add("hidden");
      esquecisenha.classList.add("hidden");
    }).catch(error => {
      console.error("Erro ao enviar:", error);
      alert("Não foi possível enviar o e-mail.");
    });
  } else {
    alert("Não existe esse login ou email");
    return;
  }
});
 