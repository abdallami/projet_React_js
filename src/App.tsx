import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

//ici nous utilisons typescript c'est à javascript avec des types un type est une sorte de contrat qui dit que telle variable doit être de tel type et si on essaye de lui assigner une valeur d'un autre type alors on aura une erreur de compilation//
type priority = "urgent" | "Moyenne" | "basse";
type todo={
  id:number;
  text:string;
  priority:priority
}
function App() {
  
  //filtrage des taches //
  const[filter,setFilter]=useState<priority| "Tous">("Tous");

  //créeons les variables d'etat qui vont nous permettre de stocker les taches et la valeur de l'input par deafaut et lors du changement //
    const [input, setInput] = useState<string>("");
    const[priority,setpriority]=useState<priority>("Moyenne");
    //ici nous allons récupérer les taches stockées dans le localStorage en utilisant la méthode getItem() qui prend en paramètre la clé de l'item à récupérer et qui retourne une chaîne de caractères ou null si l'item n'existe pas//
    const savetodos=localStorage.getItem("todos");
    //ensuite nous allons créer une variable initialtodos qui va stocker les taches récupérées du localStorage ou un tableau vide si aucune tache n'est trouvée en utilisant l'opérateur ternaire ? qui permet de faire une condition en une seule ligne et la méthode JSON.parse() qui permet de convertir une chaîne de caractères en un objet javascript//
    const initialtodos=savetodos?JSON.parse(savetodos):[];
    //ensuite nous allons créer une variable d'etat todos qui va stocker les taches et une fonction setTodos qui va nous permettre de mettre à jour les taches en utilisant la fonction useState() qui prend en paramètre la valeur initiale des taches qui est initialtodos//
    const[todos,setTodos]=useState<todo[]>(initialtodos);
    //ici nous allons utiliser la fonction useEffect() qui permet d'exécuter une fonction à chaque fois que les taches changent en utilisant la méthode setItem() du localStorage qui prend en paramètre la clé de l'item à stocker et la valeur de l'item à stocker qui doit être une chaîne de caractères donc nous allons utiliser la méthode JSON.stringify() qui permet de convertir un objet javascript en une chaîne de caractères//
    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos));
    },[todos]);
    //add todo
    function addtodo(){
  if(input.trim()==""){
    return
  }
  //ici nous allons créer un nouvel objet de type todo en utilisant les valeurs de l'input et de la priorité et en lui assignant un id unique en utilisant la fonction Date.now() et trim() qui permet de supprimer les espaces en début et fin de chaîne//
  const newtodo:todo={
    id:Date.now(),
    text:input.trim(),
    priority:priority
  }
  //ensuite nous allons créer un nouveau tableau de taches en utilisant l'opérateur de spread ... qui permet de copier les éléments d'un tableau dans un nouveau tableau et en ajoutant la nouvelle tache à la fin du tableau//
  const newtodos=[...todos,newtodo]
  setTodos(newtodos);
  setInput("");
  setpriority("Moyenne");
  console.log(newtodos);
    }
    let filteredtodos:todo[]=[];
    if(filter==="Tous"){
    filteredtodos=todos;
    } else{
      filteredtodos=todos.filter((todo)=>todo.priority===filter);
    }
    //POUR COMPTER LES TACHEES  par prioriter on va utiliser la méthode filter() qui permet de créer un nouveau tableau avec les éléments qui passent un test défini par une fonction et la propriété length qui permet de retourner le nombre d'éléments dans un tableau//
  const urgentcount=todos.filter((t)=>t.priority==="urgent").length;
  const moyennecount=todos.filter((t)=>t.priority==="Moyenne").length;
  const bassecount=todos.filter((t)=>t.priority==="basse").length;
  //compter le nombre de taches total
  const totalcount=todos.length;
  //fonction de suppression de tache 
  function deleteTodo(id:number){
    const newtodos=todos.filter((todo)=>todo.id!==id);
    setTodos(newtodos);
  }
//pour selectionner id pour chaque tache dans une collection 
 //
const [selectedtodos,setSelectedtodos]=useState <Set <number>>(new Set());
//onchange de la chekbox//
function toggleSelectTodo(id:number){
  const newselectedtodos=new Set(selectedtodos)
  if(newselectedtodos.has(id)){
       newselectedtodos.delete(id);
  }else{
    newselectedtodos.add(id);
  }
  setSelectedtodos(newselectedtodos);
}
//fonction pour finir les taches selectionnées//
function finishselected(){
  const newTodos=todos.filter((todo)=>{
    if(selectedtodos.has(todo.id)){
      return false;
  } else{
    return true;
}
} )
  setTodos(newTodos);
  setSelectedtodos(new Set());
}
  return (
      <div className="flex justify-center min-h-screen bg-base-200">
       <div className="w-full sm:w-11/12 md:w-4/5 lg:w-2/3 flex flex-col gap-3 sm:gap-5 rounded-2xl p-3 sm:p-5 bg-base-300 mt-3 sm:mt-5 mb-5">
       
       <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <input type="text" name="" id="" placeholder="Entrer une tache" className="input w-full text-sm sm:text-base" onChange={(e)=>setInput(e.target.value)} value={input}/>
        <select name="" id="" className="select w-full sm:w-auto text-sm sm:text-base" value={priority}
         onChange={(e)=>setpriority(e.target.value as priority)}>
          <option value="urgent">Urgent</option>
          <option value="Moyenne">Moyenne</option>
          <option value="basse">Basse</option>
        </select>
        <button className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto text-xs sm:text-sm" onClick={addtodo}>Ajouter</button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button className={'btn btn-soft btn-xs sm:btn-sm text-xs sm:text-sm ${filter==="Tous" ? "btn-primary" : ""}'} onClick={() => setFilter("Tous")}>
            { /*afficher nbre total de taches*/ }
            Tous({totalcount})
          </button>
          <button className={'btn btn-soft btn-xs sm:btn-sm text-xs sm:text-sm ${filter==="urgent" ? "btn-primary" : ""}'} onClick={() => setFilter("urgent")}>
            { /*afficher nbre des taches urgentes*/ }
            Urgent({urgentcount})
          </button>
          <button className={'btn btn-soft btn-xs sm:btn-sm text-xs sm:text-sm ${filter==="Moyenne" ? "btn-primary" : ""}'} onClick={() => setFilter("Moyenne")}>
            { /*afficher nbre total de taches Moyenne*/ }
            Moyenne({moyennecount})
          </button>
          <button className={'btn btn-soft btn-xs sm:btn-sm text-xs sm:text-sm ${filter==="basse" ? "btn-primary" : ""}'} onClick={() => setFilter("basse")}>
            { /*afficher nbre total de taches Basse*/ }
            Basse({bassecount})
          </button>
         
          </div>
        </div>
         <button className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto text-xs sm:text-sm"
         onClick={finishselected}
         disabled={selectedtodos.size===0}>
            Finir ({selectedtodos.size})
          </button>
          
       </div>
    
        
        {filteredtodos.length > 0 ? (
          <ul className="divide-y divide-primary/20">
            {
              filteredtodos.map((todo)=>(
                <li  key={todo.id}>
                  {/* ici nous avons importez le composant TodoItem qui va nous permettre d'afficher chaque tache en utilisant la méthode map() qui permet de parcourir un tableau et de retourner un nouveau tableau avec les éléments modifiés et en passant la tache en props au composant TodoItem */}
                  <TodoItem  todo={todo}
                  onToggleSelect={toggleSelectTodo}
                  isSelected={selectedtodos.has(todo.id)}
                  onDelete={()=>deleteTodo(todo.id)} />
                </li>
              ))
            }

          </ul>
        ) : (
         <div className="flex justify-center items-center flex-col p-3 sm:p-5 ">
          <div>
            <Construction strokeWidth={1} className="w-24 h-24 sm:w-40 sm:h-40 text-primary"/>
          </div>
          <p className="text-xs sm:text-sm">Aucune tâche à afficher</p>
         </div>
        )}
      </div>
      
      
      </div>
  )
}

export default App
