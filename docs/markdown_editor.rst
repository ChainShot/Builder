###############
Markdown Editor
###############

Many of the models in the builder have properties that will be rendered as markdown
within the ChainShot application.

Markdown is a simple language that looks similar to text and can be output as HTML.

For instance the following:

::

  ## A Header

Would be translated to the HTML:

::

  <h2>A Header</h2>

Here's a |good resource|.

.. |good resource| raw:: html

   <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">a useful resource for more Markdown Syntax</a>
