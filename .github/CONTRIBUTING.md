# Contribute

Everyone is very welcome to contribute, either reporting `issues` (Bugs, Feature-Requests, Questions etc.) or develop own features, improvements or bugfixes.

For everything you do, assume positive intent behind anything. Don't blame anyone for anything. We are one big family of developers that wants to improve ourselve as well as the way we deal with technologies.

## Reporting issues

Please be as discriptive as possible, include a brief description of what your topic is about and include as much details as possible so anyone can understand your concern.

Ideal content:

- Description
- Including Screenshots
- Providing links to similar examples
- Add code examples / even pseudo code will help
- Add environment and browser details if you report bugs

## Development

First, create your own fork of this repository and develop within your fork, from there you can make pull requests against the main repostiory.

Documentation, how to fork a repository: https://help.github.com/articles/fork-a-repo/#fork-an-example-repository

```bash
# cloning your fork
git clone git@github.com:<your-github-username>/gluebert.git
```

Create branches for every feature or bugfix and keep separation of concerns, so don't develop 5 different features in one branch. Use a separate branch for every feature.

```bash
# crate a branch like this
git checkout -b feature/<my-initials>-description-of-your-feature
```

Next, do an `npm install` on the root folder. So you have all necessary dependencies installed.

In the main `src/`-folder are all necessary files that runs gluebert. You can run `npm run build` or `npm run build:watch` to generate the necessary files in the dist-folder.

To have an environment ready where everything is prepared, you can explore the content under `documentation`, its the actual website that is rendered from this folder. Running and building the documentation needs to have hugo installed. Hugo is a static site generator that runs with go. You can install it by brew:

```bash
brew install hugo
```

After you have hugo installed, head to `/documentation/themes/gluebert/` and do an `npm install` there. So you have a proper development environment.

There you have the commands like `npm run build:dev`-command to build, or even more convenient `npm run build:watch` watching and rebuilding on changes.

in a separate terminal window you can head to `documentation/` and run `hugo server --watch --disableLiveReload` and you get your server up and running at `http://localhost:1313`.

In a short (expecting you have installed hugo already):

```bash
# install dependencies
# cd gluebert/
npm install
cd documentation/themes/gluebert/
npm install
npm run build:watch

# open a separate terminal window
cd documentation/
hugo server --watch --disableLiveReload
```

It's clearly not a perfect development environment yet. You are more than welcome to give us any feedback :-)

Happy coding, and thanks for any contribution :+1: