#################
Build New Content
#################

Here are the steps to start from scratch and build your own content.

Setting Up
==========

First, if you haven't already, follow the instructions on the :ref:`quick_start`.

Start Editing
=============

Once you have Builder up and running you'll be able to create your own content.
You'll be given the choice between starting from any of the stage container types
(see :ref:`container_types`).

Once you're inside the editor you'll be able to configure your stage container
and start adding stages. The Builder will automatically create a folder called
:code:`Content` (unless overridden by :ref:`server_configuration`).
Any changes made within the editor will automatically save to your file system.

.. _create_git_repo:

Creating a git repository
=========================

Once you have a Content Folder, you'll want to create a git repository.

Navigate to your content folder. By default it is created on the same directory
level as your Builder repository, so it should look like this on your file system:

::

  /Builder
  /Content

Navigate to :code:`/Content` and initialize a new repository, and commit all contents:

::

  git init
  git add .
  git commit -m "init content"

Now you'll need to connect it to a remote. Easiest way to do this is to go to Github and
|New Repo|.

.. |New Repo| raw:: html

   <a href="https://github.com/new" target="_blank">create a new Github Repository</a>

.. note::
   This repository must be public. If you'd like to setup a private repository integration,
   contact us team@chainshot.com

Then connect to your remote repository:

::

  git remote add origin PUT_YOUR_REPO_GIT_URL_HERE
  git push -u origin master


Connecting your Github Repository
=================================

For instructions on linking your new Github Repository to Chainshot, check out
our :ref:`linking_github` section.
