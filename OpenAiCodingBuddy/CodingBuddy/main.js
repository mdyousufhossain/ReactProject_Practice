import bot from './assets/bot.svg'
import user from './assets/user.svg'

// selecting form from DOM

const form = document.querySelector('form');
const ChatContainer = document.querySelector('#__chat_container__');

let loadIterval ;


// loader function
function loader(el){
el.textContent = '';
  // making loader by using callback
  loadIterval = setInterval(() => {
    el.textContent += '.';
    // loader cannot have more than 4 dots
    if(el.textContent === '....'){
      el.textContent = '';
    }
  },300)
}



function delayTyper(el,text){
  let index = 0 ;
  // delaying by indexing num
  let intervel = setInterval(() =>{
    if(index < text.length){
      el.innerHTML += text.charAt(index);
      index++
    }else{
      clearInterval(intervel);
    }
  },20)
}


function uniqueID(){
  const timeStamp = Date.now()
  const randomNum = Math.random()
  const hexaNum = randomNum.toString(16)
  // generating random id 
  return `id-${timeStamp}-${hexaNum}`;

}
 
function chatstripe  (isAi,value,uniqueId) {
     return (
      `
      <div class="wrapper ${isAi && 'ai'}"
        <div class="chat">
         <div class="profile">
          <img 
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot': 'user'}"
          />
         </div>
         <div class="message" id=${uniqueId}>${value} </div>
        </div>
      </div>
      `
     )
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form);

  // user chattripe

  ChatContainer.innerHTML += chatstripe(false, data.get('prompt'));
  form.reset();
  // bot's chatsripe
  const unique_ID = uniqueID();
  ChatContainer.innerHTML += chatstripe(true," ",unique_ID);
  
  ChatContainer.scrollTop = ChatContainer.scrollHeight;

  const messageDiv  = document.getElementById(unique_ID);
  loader(messageDiv)

  // fetching data from server

  const response = await fetch('http://localhost:5000/',{
    method: 'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      prompt:data.get('prompt')
    })
  })

  clearInterval(loadIterval);
  messageDiv.innerHTML = '';
    if(response.ok){
      const data = await response.json();
      const parsedData = data.bot.trim()
      console.log(parsedData)
      delayTyper(messageDiv,parsedData)
    } else {
      const err = await response.text()

      messageDiv.innerHTML = "something went wrong"

      alert(err)
    }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) =>{
  if(e.keyCode === 13){
    handleSubmit(e);
  }
});