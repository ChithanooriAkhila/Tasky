const taskContainer = document.querySelector('.task__container')
let globalStore = [];
const generateNewCard=(taskData)=>
`<div class="col-md-6 col-lg-4" id="col${taskData.id}">
<div class="card text-center">
    <div class="card-header d-flex justify-content-end gap-2"><button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
      <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button></div>
      <img src=${taskData.imageUrl} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${taskData.taskTitle}</h5>
      <p class="card-text">
       ${taskData.TaskDescription}
      </p>
      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    <div class="card-footer"><button type="button" class="btn btn-primary float-end">Open Task</button></div>
  </div>
</div>
`;
const loadInitialCardData=()=>{
  const getCardData=localStorage.getItem("tasky");
  const {cards}= JSON.parse(getCardData);
  cards.map((cardObject)=>{
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

    globalStore.push(cardObject);
  })

};
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //unique number
    imageUrl: document.getElementById('imageurl').value,
    taskTitle: document.getElementById('tasktitle').value,
    taskType: document.getElementById('tasktype').value,
    TaskDescription: document.getElementById('taskdescription').value,
  }
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));// an object
};
const deleteCard=(event)=>{
  event = window.event;
  const targetID=event.target.id;
  const tagname=event.target.tagName;//BUTTON
  globalStore = globalStore.filter((cardObject)=>cardObject.id!==targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
  if(tagname=="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};
