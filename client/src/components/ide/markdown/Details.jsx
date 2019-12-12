import React from 'react';
import MarkdownEdit from './edit/MarkdownEdit';

const mutation = `
mutation modifyStage($id: String, $details: String) {
  modifyStage(id: $id, details: $details) {
    id
    details
  }
}
`;

const Details = ({ stage }) => {
  const { id, details } = stage;
  return <MarkdownEdit mutation={mutation} id={id} markdownProp="details" markdown={details} />
}

export default Details;
