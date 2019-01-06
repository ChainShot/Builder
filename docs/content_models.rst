###########
Model Types
###########

.. _stage_container_groups:

Stage Container Groups
======================

Stage Container Groups are used to group together different versions of the same
content.

For instance, if we had a tutorial that used Solidity and web3.js, there might
be another version that uses Vyper and web3.js. Or maybe one that uses Solidity
and ethers.js.

Fields
------

====================  ====================================================
Field                 Description
====================  ====================================================
id                    Mongo ID identifier
title                 Short Name
description           Description of the Tutorials Purpose
containerType         Refers to the stage container :ref:`container_types`
preface               One-Liner explanation of the tutorial
productionReady       Should this appear in production to users
====================  ====================================================

Stage Containers
================

As you might expect, a stage container holds many stages.
Stage Containers are abstractly named because there are three different :ref:`container_types`:
:ref:`building_blocks`, :ref:`lessons` and :ref:`challenges`.

Fields
------

======================  ===========================================================
Field                   Description
======================  ===========================================================
id                      Mongo ID identifier
title                   Short Name
type                    See :ref:`container_types`
intro                   Markdown which is shown to the user when they begin
stageContainerGroupId   The ID of the group to which this container belongs
version                 Uniquely identifies this container from others in the group
======================  ===========================================================

Stages
======

CodeFiles
=========

Solutions
=========
