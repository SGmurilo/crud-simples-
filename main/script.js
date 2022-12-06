class Lista{
    constructor(){
        this.id = 1;
        this.arrayP = [];
        this.editId = null;
        this.comeBack = null;
        this.delId = 0;
      

    }
    save(){
        // metodo principal onde é executado outros metodos conforme a necessidade do usuario
    const produto = this.getData(); 
    const comeBack = this.comeBack;


    if(comeBack == null){
    if(this.verifyData(produto)){
        if(this.editId==null){

        this.insertArray(produto);
        
        }
        else{
            this.att(this.editId, produto)
        }
    }
}
    if(comeBack !== null){
        this.idMore()
    }

    this.listData()
       
    this.cancel();



    }
    getData(){

        // metodo onde obtenho os dados dos inputs e os insiro em um objeto, logo após retorno o objeto na "var object" no metodo "save()".

        const produto = {};

        let name = document.getElementById("nome-produto").value;
        let price = document.getElementById("valor-produto").value;
        let qtd = document.getElementById("estoque-produto").value;
        

        produto.id = this.id
        produto.name = name;
        produto.price = price;
        produto.qtd = qtd;
        

        return produto

    }
  
    verifyData(produto){

    // metodo onde verifico os dados do objeto, caso as propriedades estejam com algum valor retorno "true" para o metodo "save()"!

        let msg = ""

        if(produto.name == ""){
            msg += 'O campo "Nome do produto" está vazio! \n'
        }
        if(produto.price ==""){
            msg +='O campo "Valor do produto" está vazio! \n'
        }
        if(produto.qtd ==""){
            msg +='O campo "Estoque" está vazio! \n'
        }
        if(msg !== ""){
            alert(msg);
            return false
        }
      
        return true

    }

    insertArray(produto){
        
        // metodo onde pego o objeto verificado e o insiro em um array, adiciono +1 no construtor "this.id"

        this.id++
        this.arrayP.push(produto);

    }


    listData(){
    

        // metodo onde pego o array de objetos e insiro cada indice em uma lista no html dinamicamente, atribuindo funções para editar e deletar. 

        var tbody = document.getElementById("tbody");
        tbody.innerText = "";
       

        for(var i = 0; i < this.arrayP.length ;i++){
           
            

            let tr = tbody.insertRow()

            let id = tr.insertCell();
            let name = tr.insertCell();
            let price = tr.insertCell();
            let qtd = tr.insertCell();
            let acoes = tr.insertCell();

            id.innerText = this.arrayP[i].id;
            name.innerText = this.arrayP[i].name
            price.innerText = this.arrayP[i].price;
            qtd.innerText = this.arrayP[i].qtd;

// 

            let imgEdit = document.createElement("img");
            imgEdit.src = "./botao-editar.png";
            imgEdit.setAttribute("onclick","lista.edit("+JSON.stringify(this.arrayP[i])+")");
            acoes.appendChild(imgEdit)

// 

            let imgDel = document.createElement("img");
            imgDel.src = "./lata-de-lixo.png";
            imgDel.setAttribute("onclick","lista.delete("+JSON.stringify(this.arrayP[i])+")");
            acoes.appendChild(imgDel);



        }

    }
    idMore(){
    //    metodo usado para em caso de recarregamento da lista, o ID do produto adicionado após o carregamento fique correto e também para que em caso de produtos deletados, não ocorra desorganização da forma em que os ID´s são colocados.
        for(var i = 0 ; i< this.arrayP.length;i++){
    
            this.id++
        }

        let correctId = this.arrayP.length-1
        let moreId = this.arrayP[correctId].id

        if(this.delId>0){
            this.id = moreId+1
            console.log(this.id)
        }
        
    }

    edit(produto){

         //  metodo onde pego os valores de um produto e os coloco novamente no input para que possa modificar sem precisar adicionar outro objeto no array.

        this.editId = produto.id; 


        document.getElementById("nome-produto").value = produto.name;
        document.getElementById("valor-produto").value = produto.price;
        document.getElementById("estoque-produto").value = produto.qtd;

        document.getElementById("btn-salvar").innerText = "Atualizar";


    }
    att(id, produto){

    //    metodo utlizado para editar um produto da lista já adicionado, podendo manter o produto no mesmo lugar mas com valores modificados, evitando ter que excluir e adicionar outro.
        for(var i = 0; i < this.arrayP.length; i++){
            if(this.arrayP[i].id == id){
                this.arrayP[i].name = produto.name;
                this.arrayP[i].price = produto.price;
                this.arrayP[i].qtd = produto.qtd 
            }
        }

    }

    cancel(){
        // metodo utilizado para resetar valores dos inputs e contrutores utilizados em condicionais sempre que a função "save()" é chamada.

        document.getElementById("nome-produto").value = "";
        document.getElementById("valor-produto").value = "";
        document.getElementById("estoque-produto").value = "";

        this.editId = null
        this.comeBack = null
        document.getElementById("btn-salvar").innerText = "Salvar"
    
    }
    delete(produto){
    
        // metodo utilizado para deletar um objeto de um array utilizando o metodo "splice()" e logo depois "listData()", para que o item seja deletado dinamicamente.
        for(var i = 0; i < this.arrayP.length ; i++){
            if(this.arrayP[i].id == produto.id){

               if(confirm("Deseja deletar o ID "+produto.id+"?")){ 
                
                this.arrayP.splice(i,1);

                this.listData();
                this.delId++
               }
           }
        }
       

 }

    storageSave(){
        // metodo utilizado para salvar os dados da lista para se utilizar os mesmos após um carregamento. onde salvo os dados do array e dados de quantos produtos foram deletados.

    let local = localStorage.lista = JSON.stringify(this.arrayP) 
    let numDel = localStorage.delId = JSON.stringify(this.delId)
    console.log(local)
    console.log(numDel);

    }

    getStorage(){

        // metodo onde se recupera os ultimos dados salvos e os lista novamente com os mesmos id´s e adiciona valores em contrutores utilizados em condicionais para manter a organização de id´s da lista 

      let getLocal = JSON.parse(localStorage.lista);
      let getDelId = JSON.parse(localStorage.delId)
      console.log(getDelId)
      this.comeBack = "."
      this.arrayP = getLocal
      this.delId = getDelId
      
      this.save()

    }




    

    
};

const lista = new Lista();