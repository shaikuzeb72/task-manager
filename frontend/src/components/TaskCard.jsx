import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Edit2, Trash2, Clock } from 'lucide-react';

const TaskCard = ({ task, index, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card p-4 transition-all duration-200 ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-brand-500 scale-[1.02] rotate-1 z-50' : 'hover:shadow-md'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-slate-800 break-words line-clamp-2 pr-2">
              {task.title}
            </h3>
            
            <div className={`flex gap-1 transition-opacity duration-200 ${isHovered || snapshot.isDragging ? 'opacity-100' : 'opacity-0 md:opacity-0 opacity-100'}`}>
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    onDelete(task.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-slate-500 line-clamp-3 mb-4 break-words">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center text-xs text-slate-400 mt-auto pt-2 border-t border-slate-100">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
