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

Embedding YouTube Videos
========================

ChainShot will render YouTube videos. You can embed them by clicking "share" on
your YouTube video and then finding the "Embed" option. This will give you some
HTML in the form of an :code:`<iframe>` which you can add to your markdown.

You can choose to enable privacy-enhanced mode, ChainShot will render videos from
both :code:`www.youtube.com` as well as :code:`www.youtube-nocookie.com`.
