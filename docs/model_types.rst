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

:: _stages:

Stages
======

Stages are the main interactive piece of content. They contain some text documentation
which helps the user understand their goals.

There are four different types of Stages. To learn more about each type of stage
see :ref:`stage_types`.

The fundamental properties for all stages are:

Fields
------

======================  ====================================================================
Field                   Description
======================  ====================================================================
id                      Mongo ID identifier
title                   Short Name
type                    See :ref:`stage_types`
completionMessage       A message shown to the user after completion
position                Integer value for the stage position in the container (zero-indexed)
version                 Uniquely identifies this container from others in the group
task                    Markdown file describing the users task in this stage
details                 Markdown file containing additional context information for the user
======================  ====================================================================


CodeFiles
=========

Solutions
=========
