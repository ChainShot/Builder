import React, { Component } from 'react';
import MarkdownEdit from './MarkdownEdit';

const mutation = `
mutation modifyStageContainer($id: String, $intro: String) {
  modifyStageContainer(id: $id, intro: $intro) {
    id
    details
  }
}
`;

const Details = ({ stageContainer }) => {
  const { id, intro } = stageContainer;
  return <MarkdownEdit mutation={mutation} id={id} markdownProp="intro" markdown={intro} />
}

export default Details;
