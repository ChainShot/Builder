## ChainShot Builder

This is the Content Building application for ChainShot-style educational content.
The Builder creates [Content Repositories](https://chainshotbuilder.readthedocs.io/en/latest/content.html) (i.e. [ChainShot Content](https://github.com/ChainShot/Content))
which can be setup to deploy automatically to ChainShot for live user audiences.

ChainShot Builder is for teachers, meetup hosts, hackathon organizers and anyone excited to builder educational coding content! Build [Challenges](https://chainshotbuilder.readthedocs.io/en/latest/container_types.html#challenges), write [Lessons](https://chainshotbuilder.readthedocs.io/en/latest/container_types.html#lessons),
design [Building Blocks](https://chainshotbuilder.readthedocs.io/en/latest/container_types.html#building-blocks).

### Quick Start

Use the [Builder CLI](https://github.com/ChainShot/Builder-CLI).

Simply install `chainshot-builder` globally and run it to create your first content repository!

```
npm install -g chainshot-builder
mkdir myContentRepository
cd myContentRepository
chainshot-builder init
```

This will spin up the IDE and get you started. To learn more about editing and committing
to your new content repository check out the [Building New Content Docs](https://chainshotbuilder.readthedocs.io/en/latest/building_new_content.html#start-editing).

**Note:** You'll want to have the **latest** version of Node installed to ensure
builder compatibility. For switching between versions easily, we suggest you check
out the [n](https://www.npmjs.com/package/n) package.

### App Preview

![Builder Preview](preview.png)

### Documentation

Check out the [Builder Documentation](https://chainshotbuilder.readthedocs.io/en/latest/) to learn more.
