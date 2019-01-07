#################
Builder Structure
#################

The builder is divided into three main folders: client, server and docs.

Client
======

Server
======

.. _server_configuration:

Configuration
-------------

Builder Server uses the dotenv node module which makes it easier to create override
settings for your own environment without committing them.

To create your own environmental variables simply create a `.env` file in the `server/`
directory. You can then override settings with the format:

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
