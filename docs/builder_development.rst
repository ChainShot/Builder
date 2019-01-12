.. _builder_development:

#####################
Developing on Builder
#####################

There are two ways to setup Builder:

1) Quick Start using the CLI
2) Setting up for Development by running it manually

2. Setting up for Development
-----------------------------

If you want to setup the Builder for development, it will take a few more steps!

First, clone the |Builder Repository|.

.. |Builder Repository| raw:: html

   <a href="https://github.com/ChainShot/Builder" target="_blank">Builder repository</a>

::

 git clone https://github.com/ChainShot/Builder.git

The Builder runs with a client/server architecture so it is broken into
two main components client and server. We'll need to install the dependencies
and run these components separately.

Install Dependencies
====================

1) :ref:`install_client`

2) :ref:`install_server`

Start Client & Server
=====================

1) :ref:`run_client`

2) :ref:`run_server`

Configure
=========

Both the server and the client can be configured to run with different environment
settings, :ref:`client_configuration` and :ref:`server_configuration`.
