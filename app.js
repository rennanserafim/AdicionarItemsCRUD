const produto = document.querySelector("#produto")
const valor = document.querySelector("#valor")
const quantidade = document.querySelector("#quantidade")
const form = document.querySelector("#form")
const lista = document.querySelector("tbody")
const validacao = document.querySelector("#validacao")
const editarBtn = document.querySelectorAll(".fa-pen-to-square")
const limparTodos = document.querySelector("#limparTodos")


let editElement
editFlag = false;
editId = ""

// EVENT LISTENERS
//Acionar botão Adicionar ou Editar
form.addEventListener('submit',adicionarItem);


// Acionar botão limpar tudo
limparTodos.addEventListener('click',limparTudo)



// FUNCTIONS
function adicionarItem(e){
    e.preventDefault();
    // console.log("add ok")

    const produtoValue = produto.value
    const valorValue = valor.value
    const quantidadeValue = quantidade.value
    const geradorId = new Date().getTime().toString();

    if (produtoValue && !editFlag){
        const criarTr = document.createElement("tr")
        const attr = document.createAttribute("dataid")
        criarTr.classList.add("itemAdded")
        attr.value = geradorId
        criarTr.setAttributeNode(attr)
        criarTr.innerHTML=`
        <td>${geradorId}</td>
        <td>${produtoValue}</td>
        <td>${valorValue}</td>
        <td>${quantidadeValue}</td>
        <td><i class="fa-solid fa-pen-to-square"></i></td>
        <td><i class="fa-solid fa-trash"></i></td>
        `
        lista.appendChild(criarTr)
        validacaoAlert("ItemAdicionado","success")

        const editarBtn = criarTr.querySelector(".fa-pen-to-square")
        const deletarBtn = criarTr.querySelector(".fa-trash")
        editarBtn.addEventListener('click', editarElement)
        deletarBtn.addEventListener('click', deletarElement)

        padrao();
    }
    else if (produtoValue && editFlag){

        fatherElement.childNodes[3].innerHTML = produto.value
         fatherElement.childNodes[5].innerHTML = valor.value
         fatherElement.childNodes[7].innerHTML = quantidade.value

       
         validacaoAlert(`Item alterado ${fatherElement.childNodes[1].innerHTML} com sucesso`,"success")

         padrao();
    }

    else{
        validacaoAlert(`Favor preencher todos os campos!`,"danger")
    }
 

}

//EDIT

function editarElement(e) {


    fatherElement = e.currentTarget.parentElement.parentElement;
    editId = fatherElement.childNodes[1].innerHTML
    console.log((typeof editId))
    produto.value = fatherElement.childNodes[3].innerHTML
    valor.value = fatherElement.childNodes[5].innerHTML
    quantidade.value = fatherElement.childNodes[7].innerHTML

    const btnAdd = document.querySelector("#btnAdd")
   

    editFlag = true;
    editId = fatherElement.dataset.id;
    btnAdd.textContent = "Editar"


  


    
    

}

function deletarElement(e) {


    deleteElement = e.currentTarget.parentElement.parentElement;
    editId = deleteElement.dataset.id;

   deleteElement.remove()
   padrao();
}


// Validação

function validacaoAlert(text,action){
    validacao.textContent = text
    validacao.classList.add(`validacao-${action}`)

    setTimeout(function(){
        validacao.textContent = ""
        validacao.classList.remove(`validacao-${action}`)

        },1000)
}

//Clear all

function limparTudo (){
    const itemsAdded = document.querySelectorAll('.itemAdded')    
    
    if(itemsAdded.length > 0){
        itemsAdded.forEach(function(itemexcluir){
            itemexcluir.remove();
        })
    }

}


// SetBackToDefault
function padrao(){
    
    editFlag = false;
    editId = ""
    produto.value = ""
    valor.value = ""
    quantidade.value = ""
    btnAdd.textContent = "Adicionar"

}




