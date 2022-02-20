# <img src="https://user-images.githubusercontent.com/10452163/79142596-a808fa00-7db3-11ea-9a02-2d020e0b29d7.png" width="80" alt="VS Code Git Mob logo" /> Co-author commits

[![](https://vsmarketplacebadge.apphb.com/version-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![](https://vsmarketplacebadge.apphb.com/rating-short/RichardKotze.git-mob.svg)](https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob) [![Build Status](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_apis/build/status/rkotze.git-mob-vs-code?branchName=master)](https://dev.azure.com/TinkerTaylor/VS%20code%20extensions/_build/latest?definitionId=1?branchName=master) ![](https://vsmarketplacebadge.apphb.com/installs/RichardKotze.git-mob.svg)

> VS Code extension to easily _co-author a commit message_ from the source control panel.

Helpful when **pair programming**.

![Git Mob in action](https://user-images.githubusercontent.com/10452163/103484860-d323f580-4de9-11eb-9819-bb8d6602a21e.gif)

1. [Install](#install)
2. [Quick start](#quick-start)
3. [Features](#features)
4. [Settings](#settings)
5. [Contributing](https://github.com/rkotze/git-mob-vs-code/blob/master/CONTRIBUTING.md)

## Install

Open VS Code and search for **"git-mob"** in **Extensions panel**.

Optional, will sync with _[git-mob cli](https://github.com/findmypast-oss/git-mob/#install)_

## Quick start

### Key commands

**Select co-authors** - `CTRL+shift+p` or `⌘+⇧+p` -> "Select co-authors". Use the multi-selector to add and remove co-authors.

**Solo** - clear all selected co-authors: `CTRL+shift+p` or `⌘+⇧+p` -> "Solo: remove all co-authors"

Add new co-authors from [repository contributors](#search-repository-contributors-co-authors) or add directly to your co-authors file [`.git-coauthors`](#add-new-co-authors).

## Features

- Append multiple co-author metadata to commit message
- Select multiple co-authors (`shift` or `ctrl` or `⌘`) in SCM panel view
- [Search repository contributors co-authors](#search-repository-contributors-co-authors) from the "More Authors" list ([Add from local repository](#add-from-repository-contributors))
- **After a commit** [remove all selected co-authors](#post-commit---solo) 
- [Workspace support](#workspace-support), multiple Git repositories
- Add co-authors from **GitHub**, see [setting options](#settings) to learn more
- [Change primary author](#change-primary-author)
- Add [emojis](#git-emojis) to commits (Gitmojis)
- Manually [add new co-authors](#add-new-co-authors) via input
- Button to open co-author file (`.git-coauthors`) in VS Code
- Configurable see [setting options](#settings)

`prepare-commit-msg` hook support **removed** in `v1.12.0`

### Add new co-authors

**Option 1:** `CTRL+shift+p` or `⌘+⇧+p` -> "Add new co-author". Fill in all input fields.

**Option 2:** `ctrl+shift+p` or `⌘+⇧+p` -> "Open .git-coauthors file" or use UI to open co-authors file `.git-coauthors`.

![open_coauthors](https://user-images.githubusercontent.com/10452163/52169086-b167f280-272a-11e9-947d-0e00df3eefa4.png)

### Add from repository contributors

Click the **plus +** button on an author in **More Authors** list.

![image](https://user-images.githubusercontent.com/10452163/52488610-1d79a900-2bb8-11e9-8a9b-46529d4b9608.png)

### Search repository contributors co-authors

Click the search icon on the **More Authors** section or `CTRL+shift+p` or `⌘+⇧+p` -> "Search Git repository for co-authors".

![image](https://user-images.githubusercontent.com/10452163/57807338-e2f44f00-7758-11e9-8fb1-6d8b8cb9d7ce.png)

### Workspace support

Select one of multiple open Git repositories and add co-author metadata to source control input field.

<img alt="workspace-support" src="https://user-images.githubusercontent.com/10452163/80038666-08074b00-84ee-11ea-9565-26c9f755d512.gif" width="320" />

### Git Emojis

Using the **standardised** list from [Gitmoji](https://github.com/carloscuesta/gitmoji).

Search and select an emoji to add to the Git message input field. 

`CTRL+shift+p` or `⌘+⇧+p` -> "Search Gitmojis - emojis"

![git emojis select list](https://user-images.githubusercontent.com/10452163/79442052-ef6bd200-7fcf-11ea-85c1-82789738add3.png)

### Change primary author

![Change primary author](https://user-images.githubusercontent.com/10452163/89105613-6d86a400-d41a-11ea-88ec-25b34a084598.gif)

## Settings

### Post commit -> Solo

After a commit remove selected co-authors. If you commit in the command-line the UI will update as well.

`Default: false`

### Author list -> Expand more authors

Expand 'More Authors' tree when UI starts.

`Default: true`

### Author list -> More Authors To Co-authoring

Add a new author directly to 'Co-authoring' from 'More Authors'.

`Default: true`

### Github -> Personal Access Token

Search for co-authors on GitHub you will need to generate a PAT.

1.  Visit [GitHub > settings > tokens](https://github.com/settings/tokens)
2.  Click "generate new token"
3.  Select "user:read" _(This allows GitMob to fetch a users public email)_

`Default: <empty>`

### Co-authors -> Sort direction

Co-author list sorting direction.

`Default: ascending`
