import { Trash2, Circle, CheckCircle2 } from "lucide-react";

type Priority = "urgent" | "Moyenne" | "basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type TodoItemProps = {
  todo: Todo;
  onDelete: () => void;
  isSelected?: boolean;
  onToggleSelect: (id: number) => void;
};

const TodoItem = ({
  todo,
  onDelete,
  isSelected,
  onToggleSelect,
}: TodoItemProps) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "urgent":
        return "badge-error";
      case "Moyenne":
        return "badge-warning";
      case "basse":
        return "badge-success";
    }
  };

  return (
    <div
      className={`p-4 transition-all ${
        isSelected ? "bg-primary/10" : "hover:bg-base-200/50"
      }`}
    >
      <div className="flex justify-between items-center gap-3 flex-col sm:flex-row">
        <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
          <button
            onClick={() => onToggleSelect(todo.id)}
            className="btn btn-ghost btn-sm p-0 h-auto min-h-auto shrink-0"
            aria-label={isSelected ? "Désélectionner" : "Sélectionner"}
          >
            {isSelected ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <Circle className="w-5 h-5 text-base-content/50" />
            )}
          </button>

          <span
            className={`text-sm sm:text-base font-medium line-clamp-2 flex-1 ${
              isSelected ? "line-through text-base-content/60" : ""
            }`}
          >
            {todo.text}
          </span>

          <span
            className={`badge badge-sm shrink-0 ${getPriorityColor(
              todo.priority
            )}`}
          >
            {todo.priority}
          </span>
        </div>

        <button
          onClick={onDelete}
          className="btn btn-error btn-ghost btn-sm shrink-0 w-full sm:w-auto"
          aria-label="Supprimer la tâche"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-xs sm:hidden">Supprimer</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;