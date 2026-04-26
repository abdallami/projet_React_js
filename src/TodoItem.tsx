import { Trash } from "lucide-react";

//on va utiliser le meme type que dans App.tsx pour definir le type de tache et de priorite//
type priority = "urgent" | "Moyenne" | "basse";
type todo={
  id:number;
  text:string;
  priority:priority
   
}
//comme on aura pas le meme todo que dans App.tsx on va definir un type props qui va prendre en parametre un objet de type todo qui va nous permettre de passer la tache en props au composant TodoItem//
type props={
    todo:todo
    onDelete:()=>void
    isSelected?:boolean
    onToggleSelect:(id:number)=>void
}
const TodoItem=({ todo  ,onDelete, isSelected,  onToggleSelect }: props)=>{
    return(
        <div>
            <li className="p-3 ">
                <div className="flex justify-between items-center">
                    <div className="flex  items-center gap-2">
                     <input type="checkbox"  className="checkbox checkbox-primary checkbox-sm" 
                     checked={isSelected}
                     onChange={()=>onToggleSelect(todo.id)}
                     />
                     <span className="text-md font-bold">
                        <span>{todo.text}</span>
                     </span>
                     <span className={`badge badge-sm babge-soft 
                        ${todo.priority==="urgent" ? "badge-error" : todo.priority==="Moyenne" ? "badge-warning" : "badge-success"}`}
                        >
                        {todo.priority}
                     </span>
                    </div>
                    <button className="btn btn-sm btn-error btn-soft" onClick={onDelete}>
                    <Trash className="w-4 h-4" />
                    </button>
                </div>
            </li>

        </div>
    )
}
export default TodoItem;