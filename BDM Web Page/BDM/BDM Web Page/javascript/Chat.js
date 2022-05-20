/*class InteractiveChatbox {
    constructor(a, b, c) {
        this.args = {
            button: a,
            chatbox: b
        }
        this.icons = c;
        this.state = false; 
    }

    display() {
        const {button, chatbox} = this.args;
        
        button.addEventListener('click', () => this.toggleState(chatbox))
    }

    toggleState(chatbox) {
        this.state = !this.state;
        this.showOrHideChatBox(chatbox, this.args.button);
    }

    showOrHideChatBox(chatbox, button) {
        if(this.state) {
            chatbox.classList.add('chatbox--active')
            this.toggleIcon(true, button);
        } else if (!this.state) {
            chatbox.classList.remove('chatbox--active')
            this.toggleIcon(false, button);
        }
    }

    toggleIcon(state, button) {
        const { isClicked, isNotClicked } = this.icons;
        let b = button.children[0].innerHTML;

        if(state) {
            button.children[0].innerHTML = isClicked; 
        } else if(!state) {
            button.children[0].innerHTML = isNotClicked;
        }
    }
}*/

const sendMessage = document.getElementById("SendMessage");
const msgContent = document.getElementById("msg");


const MensajeC={
    fecha:'',
    texto:'',
    propietario:null    
};

var docurl = new URL(document.URL);

var destinatario = docurl.searchParams.get("Destiny");


sendMessage.addEventListener("click",function(e){
    InMessage(msgContent.value,destinatario);
});


$(document).ready(function(){


LoadMessage(destinatario);

});


async function InMessage(Mensaje, IdDestino){

    //CORREGIR LA WEA DE LOS 2 CHATS
    // const urlC = 'http://localhost/BDM%20Web%20Page/php/GetChatId.php?Destiny='+IdDestino;
    const urlC = 'php/GetChatId.php?Destiny='+IdDestino;
    const dataC = await fetch(urlC);
    var dbC = await dataC.json();
    
    // const url = 'http://localhost/BDM%20Web%20Page/php/SendMsg.php?Mensaje='+Mensaje+'&chatID='+dbC;
    const url = 'php/SendMsg.php?Mensaje='+Mensaje+'&chatID='+dbC;
    await fetch(url);

    LoadMessage(destinatario);

    msgContent.value = "";
}

async function LoadMessage(IdDestino){
    //Recibe el mensaje y el id de quien lo envia (cambiar esto pa mandarlo desde php), y el id de quien lo recibira
    //CORREGIR LA WEA DE LOS 2 CHATS
    // const urlC = 'http://localhost/BDM%20Web%20Page/php/GetChatId.php?Destiny='+IdDestino;
    const urlC = 'php/GetChatId.php?Destiny='+IdDestino;
    const dataC = await fetch(urlC);
    var dbC = await dataC.json();

    // const url = 'http://localhost/BDM%20Web%20Page/php/GetMessagesByChat.php?id_chat='+dbC;
    const url = 'php/GetMessagesByChat.php?id_chat='+dbC;
    const data = await fetch(url);
    var db = await data.json();
    console.log(db);
    //Manda la fecha, el texto y un condicional de propietario para aplicar css
    SetMensajes(db);
}

async function SetMensajes(jsonFile){

    const container = document.getElementById("MsgList");
    container.innerHTML = "";

    // jsonFile.slice().reverse().forEach(MensajeC => {
    jsonFile.forEach(MensajeC => {
        const {fecha,texto,propietario} = MensajeC;

        const e_Msg=document.createElement("P");
        e_Msg.setAttribute('v-for','"items in item1"');
        e_Msg.setAttribute('v-text','"items1"');
        e_Msg.setAttribute('class',propietario);
        e_Msg.textContent = texto;

        const e_Date=document.createElement("P");
        e_Date.setAttribute('class','hora');
        e_Date.textContent=fecha;

        const e_hr=document.createElement("HR");

        container.appendChild(e_Msg);
        container.appendChild(e_Date);
        container.appendChild(e_hr);
    });
}