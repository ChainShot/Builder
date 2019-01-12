.. _project_skeletons:

#################
Project Skeletons
#################

Project Skeletons are working applications that are intended to work along with
:ref:`building_blocks`. Since Building Blocks are project-based tutorials,
at the end the user will be able to download all of their code into a "skeleton"
of a project. The user's code combined with the skeleton creates a fully functional app
that is partially written by the user.

Github Repository
=================

To create a Project Skeleton, the best first step is to create a working application.
This will be application you essentially want your users to build.

Once you've created this application, upload it to Github.

Next, you'll want to take out the core components that can be written by the user,
that will serve as good learning points and turn them into Code Stages in a Building Block.

Connecting The Building Block
=============================

Once you have your working application built, you'll want to connect it to a
Building Block Tutorial.

Create the Block
----------------

If you've setup your Builder application (:ref:`quick_start`),
you'll be able to create your own Building Block.

You can create some stages that are designed to help the user learn about the project
by having them write code to pass certain test cases.

Setting File Locations
----------------------

For Code Files that will be combined with a Project Skeleton, it is necessary
to set the :code:`file_location` property. This property will indicate where
the file will be placed in the project skeleton relative to the base of the project.

Download Stage
--------------

Once you have finished your Building Block and setup the Code File locations, the
final step is to create a :ref:`download_stage`. This stage will allow your users
to pick a project skeleton among your project skeleton(s) to download their code into.

You'll need to set the Project Skeleton Fields and associate it to a Github repository.

Fields
======

Here are the fields for the embedded project skeleton:

======================  ====================================================================
Field                   Description
======================  ====================================================================
id                      Mongo ID identifier
title                   Short Name
description             Short Explanation of the Skeleton
ghNodeId                Global Github Identifier
ghRepoId                Github Repository Identifier
thumbnailUrl            Image URL to represent the Skeleton
zipName                 The name of the zip folder the user will download the code into
======================  ====================================================================

Example
=======

For an example of a Skeleton, see the |Escrow React| which is used for the |ChainShot Escrow|.

.. |Escrow React| raw:: html

   <a href="https://github.com/ChainShot/Escrow-React-Skeleton" target="_blank">Escrow React Skeleton</a>

.. |ChainShot Escrow| raw:: html

    <a href="https://www.chainshot.com/blocks/5adab204929d249e5faefb4c/" target="_blank">ChainShot Escrow Building Block</a>
