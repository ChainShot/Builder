.. _builder_structure:

#################
Builder Structure
#################

Hey there! If you're looking to help contribute to the builder
the project is divided into three main folders: client, server and docs.

Client
======

The Builder Client is the main interface building content repositories. The UI
is meant predominantly as an extension of an IDE for ChainShot content. As
there are some intricacies involved with building the content, it is preferable
to use this UI rather than edit the content repository directly.

Currently the client allows for the creation and modification of all the main model
types (with the exception of a few special stage types). As more stage types and
features are added to the ChainShot system, the Builder client will continue to
add more functionality for recording videos, running competitions and holding
livestreams.

.. _install_client:

Install Client Dependencies
---------------------------

To install dependencies for the Builder Client you can navigate to the /client
folder and run :code:`npm install`.

.. _run_client:

Start Client
------------

To run the Builder Client you can navigate to the :code:`/client`
folder and run :code:`npm start`.

Tech Stack
----------

The client's main tech stack includes react, scss, and GraphQL.

Initially it was created using the create-react-app tool and then ejected
for further configuration of it's webpack settings.

.. _client_configuration:

Client Configuration
--------------------

Builder Client uses the dotenv node module which makes it easier to create override
settings for your own environment without committing them.

To create your own environmental variables simply create a :code:`.env` file in the
:code:`client/` directory. You can then override settings with the format:

::

  REACT_APP_SETTING1=VALUE1
  REACT_APP_SETTING2=VALUE2

.. note::
    You'll notice the REACT_APP_* prefix on these settings. This is used by
    create-react-app to store environmental variables. Builder client was generated
    and ejected from the create-react-app tool.

Some of the override-able settings include:

====================  ===========================================================================
Field                 Description
====================  ===========================================================================
REACT_APP_API_URL     The API URL for the builder server (useful if changing builder server PORT)
====================  ===========================================================================

Server
======

The Builder Server acts as the intermediary layer between the client and the file system.
It interprets many of the clients requests and translates them to ensure that the content
is written and read in the expected fashion from the file system.

It uses websockets to ensure that updates are broadcasted to all listening clients, so
that multiple tabs of the client UI do not get out of sync.

The builder is expected to be run on a single machine, locally, for a single user.
As such, it's not safe for concurrency. Sending multiple updates at once may result in some
unexpected overrides.

.. _install_server:

Install Server Dependencies
---------------------------

To install dependencies for the Builder Server you can navigate to the :code:`/server`
folder and run :code:`npm install`.

.. _run_server:

Start Server
------------

To run the Builder Server you can navigate to the :code:`/server` folder and
run :code:`npm start`.

Tech Stack
----------

The client's main tech stack includes node, express, socket.io and GraphQL.

.. _server_configuration:

Server Configuration
--------------------

Builder Server uses the :code:`dotenv` node module which makes it easier to create override
settings for your own environment without committing them.

To create your own environmental variables simply create a :code:`.env` file in the
:code:`server/` directory. You can then override settings with the format:

::

  SETTING1=VALUE1
  SETTING2=VALUE2

Some of the override-able settings include:

====================  ==============================================================
Field                 Description
====================  ==============================================================
PORT                  The port that builder runs on
CONTENT_REPO_NAME     The name of the content repo that builder looks for or creates
====================  ==============================================================

Docs
====

The Builder Docs are built using Sphinx and are hosted on Read The Docs. Since the
docs are stored in rst files the intention is that anyone can come and make updates
as necessary.

For installation instructions, see `Sphinx Docs <`http://sphinx-doc.org/`>`_. To
build the docs locally simply run the :code:`make` command and open the :code:`index.html`
file within the generated :code:`_build` folder.
