import React from 'react';
import MarkdownEdit from './MarkdownEdit';

const mutation = `
mutation modifyStage($id: String, $completionMessage: String) {
  modifyStage(id: $id, completionMessage: $completionMessage) {
    id
    task
  }
}
`;

const Task = ({ stage }) => {
  const { id, completionMessage } = stage;
  return <MarkdownEdit mutation={mutation} id={id} markdownProp="completionMessage" markdown={completionMessage} />
}

export default Task;
