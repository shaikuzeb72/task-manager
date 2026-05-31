import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';

const TaskBoard = ({ tasks, onStatusChange, onDelete, onEdit }) => {
  const columns = ['Todo', 'In Progress', 'Done'];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    // Call the parent handler to update state and API
    // draggableId is the task ID
    onStatusChange(Number(draggableId), newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-6 h-full overflow-x-auto pb-4">
        {columns.map((column) => (
          <TaskColumn
            key={column}
            status={column}
            tasks={getTasksByStatus(column)}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
