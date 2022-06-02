//Arrays donde se guardan y cargan eventos
let events = [] 
let arr = [] 

//Variables y extraccion de ID's
const eventName = document.querySelector('#eventName') //---> input text
const eventDate = document.querySelector('#eventDate') //---> input date
const bAdd = document.querySelector('#bAdd') // --->input submit
const eventContainer = document.querySelector('#eventsContainer') // ---> Para agregar los nuevos html,css y eventos 

const json = load()
try {
    arr = JSON.parse(json)
} catch (error) {
    arr = []
}
events = arr? [...arr] : []
renderEvents()
//DOM ---> Formulario cuando se envie (submit) se ejecuta el siguiente codigo
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault() // ---> Para que el navegador no se ejecute de manera predeterminada
    addEvent() // ---> Callback, funcion para agregar Eventos
    
})
buttonAdd.addEventListener('click',(e)=>{
    e.preventDefault() 
    addEvent() 
    
})

function addEvent(){
    // Si el nombre del evento o la fecha esta vacio no se ejecuta nada
    if (eventName.value === "" || eventDate.value === "") {
        return 
    }
    
    if (dateDiff (eventDate.value) < 0 ) {
        return
    }
    const newEvent = {
        id : (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date : eventDate.value
   }
   events.unshift(newEvent)
   save(JSON.stringify(events))


   eventName.value = ""

   renderEvents()
}

function dateDiff(d) {
    const targetDate = new Date(d) 
    const now = new Date() 
    const difference = targetDate.getTime() - now.getTime()
    const days =   Math.ceil(difference / (1000 * 3600 * 24))
    return days 
}

function renderEvents (){
    const eventsHtml = events.map( event =>{
        return `
        <div class="event">
        <div class="days">
        <span class="days-number">${dateDiff(event.date)}</span>
        <span class="days-text">Dias</span>
        </div>
        <div class="event-name">${event.name}</div>
        <div class="event-date">${event.date}</div>
        <div class="actions" >
        <button  class="bDelete" data-id="${event.id}">Eliminar</button>
        </div>
        </div>
        `
        
})
     document.querySelector("#eventContainer").innerHTML = eventsHtml.join("")

     //codigo para eliminar desde el boton 
     document.querySelectorAll('.bDelete').forEach((button) => {
        button.addEventListener("click", (e) =>{
             const id = button.getAttribute("data-id")
             events = events.filter((event) => event.id !== id )
             save(JSON.stringify(events))
             renderEvents()
        })
    })
    
} 

function save (data){
     localStorage.setItem('items', data)

}

function load (){
    return localStorage.getItem('items')
}