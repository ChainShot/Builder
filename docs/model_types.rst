.. _model_types:

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

.. _stage_containers:

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

.. _stages:

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

.. _code_files:

Code Files
==========

Code Files represent a file within a CodeStage. They come with a number of properties
that describe how they should be rendered and executed within the stage.

Fields
------

======================  ====================================================================
Field                   Description
======================  ====================================================================
id                      Mongo ID identifier
name                    Short Name
initialCode             The code which this CodeFile should begin with for the user
mode                    The Monaco Code Editor mode to display the code in
stageContainerId        Which of the :ref:`stage_containers` this belongs in
codeStageIds            Array of IDs of all :ref:`code_stage` this code file belongs to
executable              Should this be included when the stage code is executed?
executablePath          The path at which the code file is executed
hasProgress             Should ChainShot track users progress for this CodeFile?
readOnly                Should users be allowed to change this file?
testFixture             Is this a file with test cases in it?
visible                 Should this be shown to the user? (sometimes turned off for utils)
======================  ====================================================================


Solutions
=========

Solutions are predominantly for reference and help designing the test cases.

They ensure that there is a working solution and can be shared across
collaborating content creators to ensure the test cases are
still working properly for any updates.


Fields
------

======================  ====================================================================
Field                   Description
======================  ====================================================================
id                      Mongo ID identifier
codeFileId              Which of the :ref:`code_files` this belongs to
stageId                 Which :ref:`code_stage` this belongs to
code                    The actual solution code
======================  ====================================================================
