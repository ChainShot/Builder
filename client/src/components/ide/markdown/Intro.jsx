import React from 'react';
import MarkdownEdit from './edit/MarkdownEdit';

const mutation = `
mutation modifyStageContainer($id: String, $intro: String) {
  modifyStageContainer(id: $id, intro: $intro) {
    id
    intro
  }
}
`;

const Intro = ({ stageContainer }) => {
  const { id, intro } = stageContainer;
  return <MarkdownEdit mutation={mutation} id={id} markdownProp="intro" markdown={intro} />
}

export default Intro;
