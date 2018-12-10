import React from 'react';
import GroupList from './GroupList';
import SelectLayout from './SelectLayout';

const BuildingBlocks = () => (
  <SelectLayout>
    <h1> Choose an existing Building Block or create your own! </h1>
    <GroupList containerType="BuildingBlock" />
  </SelectLayout>
)

export default BuildingBlocks;
