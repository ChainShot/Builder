import React from 'react';
import GroupList from './GroupList';
import SelectLayout from './SelectLayout';

const Challenges = () => (
  <SelectLayout>
    <h1> Choose an existing Challenge or create your own! </h1>
    <GroupList containerType="Challenge" />
  </SelectLayout>
)

export default Challenges;
