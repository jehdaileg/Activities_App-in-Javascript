
//SELECTEURS

const todoInput    = document.querySelector(".todo-input");
const todoButton   = document.querySelector(".todo-button");
const todoList     = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

//FONCTIONS

function  addTodo(event)
{

  event.preventDefault();  //bloquer la redirection du formulaire

  //créer une div todo
  const todoDiv = document.createElement("div");

  //attribuer la class todo à la div todoDiv
  todoDiv.classList.add("todo");

  //créer les li (list items)
  const newTodo = document.createElement("li");
 //ajout de la valeur de l'input dans le li
  newTodo.innerText = todoInput.value;
 //attribuer la class todo-item à la li
  newTodo.classList.add("todo-item");

 //Lier les deux éléments créés (todo (div.class) et newTodo (li)) sachant que li est l'enfant de todo
  todoDiv.appendChild(newTodo);
//ajout du li (newTodo) dans le localStorage
  saveLocalTodos(todoInput.value);

  //création des boutons pour les li (newTodo)
  //bouton pour le checking
  const completedButton = document.createElement("button");
  //ajout d'un fontawesome au bouton créer
  completedButton.innerHTML = '<i class="fa fa-check"></i>';
  //ajout d'une autre classe au bouton
  completedButton.classList.add("complete-btn");

  //ajout du bouton dans la div todoDiv
  todoDiv.appendChild(completedButton);

  //bouton pour la suppression
  const trashButton = document.createElement("button");
  //ajout du fontawesome au bouton
  trashButton.innerHTML = '<i class="fa fa-trash"></i>';
  //ajout d'une autre classe au bouton
  trashButton.classList.add("trash-btn");

  //ajout du bouton dans la div todoDiv
  todoDiv.appendChild(trashButton);

  //ajout du todoDiv qui contient nos éléments à todo-list (ul)
  todoList.appendChild(todoDiv);

  //rafraishir l'input
  todoInput.value = "";

}


function deleteCheck(e)
{
  //stocker l'élément sur lequel on a cliqué
  const item = e.target;

  if(item.classList[0]=== "trash-btn") // si c'est le button supprimer
  {
    const todo = item.parentElement;
    todo.classList.add("fall");
    //suppression du parent qui est la todoDiv
    //Le todo doit attendre la fin de la transition css pour ensuite être supprimé
      removeLocalTodos(todo);
    todo.addEventListener("transitionend", function(){

      todo.remove();
    });

  }
  if(item.classList[0]==="complete-btn")
  //Si c'est au bouton complete , on ne fait qu'ajouter la classe completed à codeer dans css
  {
    const todo = item.parentElement;

    todo.classList.toggle("completed");

  }

}


function filterTodo(e)
{
  //récupérer tous les enfants de todoList(ul)
  const todos = todoList.childNodes;

  //parcourir tous les enfants et comparer la valeur de chacune d'entre elles
  todos.forEach(function (todo) {
    switch(e.target.value) {

      case "all":
      todo.style.display = "flex";
      break;

      case "completed":
      if(todo.classList.contains("completed")){
        todo.style.display = "flex";
      } else
      {
        todo.style.display = "none";
      }
      break;

      case "uncompleted":
      if(!todo.classList.contains("completed"))
      {
        todo.style.display = "flex";
      }else{
        todo.style.display = "none";
      }
      break;

    }
  });

}


function saveLocalTodos(todo)
{
  //vérifier s'il y a des items à saurder sur la page
  let todos;

  if(localStorage.getItem("todos") === null)
  {
    todos = [];  //s'il y en a pas, on ne les stocke vide

  }else
  {
    todos = JSON.parse(localStorage.getItem("todos"));  // si y en a, on les stocke dans todos sous format JSON
  }
  //insérer todo dans todos
  todos.push(todo);
  //chargement du localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos()
{
  //vérifier s'il y a des items à saurder sur la page
  let todos;

  if(localStorage.getItem("todos") === null)
  {
    todos = [];  //s'il y en a pas, on ne les stocke vide

  }else
  {
    todos = JSON.parse(localStorage.getItem("todos"));  // si y en a, on les stocke dans todos sous format JSON
  }
  todos.forEach(function(todo){

    //créer une div todo
    const todoDiv = document.createElement("div");

    //attribuer la class todo à la div todoDiv
    todoDiv.classList.add("todo");

    //créer les li (list items)
    const newTodo = document.createElement("li");
   //ajout de la valeur de l'input dans le li
    newTodo.innerText = todo;
   //attribuer la class todo-item à la li
    newTodo.classList.add("todo-item");

   //Lier les deux éléments créés (todo (div.class) et newTodo (li)) sachant que li est l'enfant de todo
    todoDiv.appendChild(newTodo);

    //création des boutons pour les li (newTodo)
    //bouton pour le checking
    const completedButton = document.createElement("button");
    //ajout d'un fontawesome au bouton créer
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    //ajout d'une autre classe au bouton
    completedButton.classList.add("complete-btn");

    //ajout du bouton dans la div todoDiv
    todoDiv.appendChild(completedButton);

    //bouton pour la suppression
    const trashButton = document.createElement("button");
    //ajout du fontawesome au bouton
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    //ajout d'une autre classe au bouton
    trashButton.classList.add("trash-btn");

    //ajout du bouton dans la div todoDiv
    todoDiv.appendChild(trashButton);

    //ajout du todoDiv qui contient nos éléments à todo-list (ul)
    todoList.appendChild(todoDiv);


  });
}


function removeLocalTodos(todo)
{
  //vérifier s'il y a des items à saurder sur la page
  let todos;

  if(localStorage.getItem("todos") === null)
  {
    todos = [];  //s'il y en a pas, on ne les stocke vide

  }else
  {
    todos = JSON.parse(localStorage.getItem("todos"));  // si y en a, on les stocke dans todos sous format JSON
  }

  //index de l'élément et suppression
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  //mise à jour du localStorage
  localStorage.setItem("todos", JSON.stringify(todos));


}
