import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onDelete, onEdit }) => {
  // Styles based on status
  const getColumnStyles = () => {
    switch (status) {
      case 'Todo':
        return 'bg-slate-100/50 border-slate-200';
      case 'In Progress':
        return 'bg-brand-50/50 border-brand-100';
      case 'Done':
        return 'bg-green-50/50 border-green-100';
      default:
        return 'bg-slate-100/50 border-slate-200';
    }
  };

  const getHeaderStyles = () => {
    switch (status) {
      case 'Todo':
        return 'text-slate-700 bg-slate-200/50';
      case 'In Progress':
        return 'text-brand-700 bg-brand-100/50';
      case 'Done':
        return 'text-green-700 bg-green-100/50';
      default:
        return 'text-slate-700 bg-slate-200/50';
    }
  };

  return (
    <div className={`flex-1 min-w-[300px] flex flex-col rounded-xl border ${getColumnStyles()}`}>
      <div className={`px-4 py-3 border-b flex justify-between items-center rounded-t-xl border-inherit ${getHeaderStyles()}`}>
        <h2 className="font-semibold">{status}</h2>
        <span className="bg-white/60 px-2 py-0.5 rounded-full text-xs font-bold">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 overflow-y-auto custom-scrollbar transition-colors ${
              snapshot.isDraggingOver ? 'bg-black/5' : ''
            }`}
            style={{ minHeight: '150px' }}
          >
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
