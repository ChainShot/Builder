import React from 'react';
import GroupList from './GroupList';
import SelectLayout from './SelectLayout';

const Lessons = () => (
  <SelectLayout>
    <h1> Choose an existing Lesson or create your own! </h1>
    <GroupList containerType="Lesson"/>
  </SelectLayout>
)

export default Lessons;
