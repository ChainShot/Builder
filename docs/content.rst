####################
Content Repositories
####################

ChainShot learning content is stored in git repositories to allow for maximum
collaboration between content creators.

Content is built using the Builder application locally and then committed up to
Github. From there, ChainShot users can connect their Github account, link their
content repository and start teaching their audience.

Now let's take a closer look at content repositories.

Structure
=========

Content Repositories are split into two folders: config and projects.

/config
-------

Within the config directory you'll find subdirectories containing JSON documents
of every type of model described in :ref:`model_types`.

These JSON documents contain mostly the configuration data that is used to create
the database documents when the content repository is deployed.

For any properties that are file-like (i.e. markdown, long text or code) the value
will be stored as a $$LOOKUP which means that it will be created under the projects
directory within a particular file. This makes it easier to see file differences
when many collaborators are working on the file, just like how a file diff would look
in a codebase.

/projects
---------

This directory contains all of the project files. Each stage is meant to be it's own
standalone project that can be run locally as well as within the Builder UI.

The structure of the projects are determined by the model and it's properties
as follows:

/{StageContainerGroup.title}/{StageContainer.version}/{Stage.title}/

Whenever these properties change, the corresponding files will be relocated to the
new directory accordingly.

Reserved URLs
=============

One user can have many Content Repositories and can reserve URLs on ChainShot
to display their learning content. For instance:

wwww.chainshot.com/content/chainshot

This is the main content repository for ChainShot. On Github, this repository
can be found at:

www.github.com/ChainShot/content
