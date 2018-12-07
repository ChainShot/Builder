import React from 'react';
import MarkdownEdit from './MarkdownEdit';

const mutation = `
mutation modifyStage($id: String, $task: String) {
  modifyStage(id: $id, task: $task) {
    id
    task
  }
}
`;

const Task = ({ stage }) => {
  const { id, task } = stage;
  return <MarkdownEdit mutation={mutation} id={id} markdownProp="task" markdown={task} />
}

export default Task;
