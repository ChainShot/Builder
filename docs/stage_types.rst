.. _stage_types:

###########
Stage Types
###########

.. _code_stage:

Code Stage
==========

This is the bread and butter stage for ChainShot. It has some text documentation
and a Code Editor which can flip between many files.

The user will need to pass all test cases for the `testFixture` in order to move
onto the next stage.

Along with all the fields mentioned for :ref:`stages`, here are the Code Stage fields:

Fields
------
======================  ====================================================================
Field                   Description
======================  ====================================================================
language                The execution environment in which the code is run
languageVersion         The version of the execution environment where the code is run
testFramework           The test framework that is used to execute the test cases
abiValidations          See :ref:`abi_validations`
validatedContract       The contract that is validated with the abi validations
======================  ====================================================================

.. _download_stage:

Download Stage
==============

This stage is the primary ending point for :ref:`building_blocks`. Since Building
Block tutorials are based around a project, the download stage allows the user
to download all of their code into :ref:`project_skeletons`.

Along with all the fields mentioned for :ref:`stages`, here are the Download Stage fields:

Fields
------
======================  ====================================================================
Field                   Description
======================  ====================================================================
projectSkeletons        An embedded array of :ref:`project_skeletons`
======================  ====================================================================
