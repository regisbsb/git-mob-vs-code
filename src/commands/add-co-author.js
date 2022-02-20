const vscode = require("vscode");
const { CoAuthor } = require("../co-author-tree-provider/co-authors");
const { moveToCoAuthoring } = require("../ext-config/config");
const { saveNewCoAuthors } = require("../git/git-mob-api");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      const moveToSelected = moveToCoAuthoring();

      if (author) {
        await saveNewCoAuthors([{ ...author, key: author.commandKey }]);
        if (moveToSelected) {
          await updateAuthorUiList(coAuthorProvider, author);
        }
      } else {
        const newAuthor = await inputAuthorData();
        if (newAuthor) {
          await saveNewCoAuthors([newAuthor]);
          if (moveToSelected) {
            const { name, email, key } = newAuthor;
            await updateAuthorUiList(
              coAuthorProvider,
              new CoAuthor(name, email, false, key)
            );
          }
        }
      }

      if (!moveToSelected) {
        vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

async function updateAuthorUiList(coAuthorProvider, author) {
  coAuthorProvider.mobAuthors.reset();
  await coAuthorProvider.mobAuthors.listCurrent();
  await coAuthorProvider.toggleCoAuthor(author, true);
}

async function inputAuthorData() {
  const name = await vscode.window.showInputBox({
    prompt: "Author name (Required)",
    validateInput: isRequired("Author name"),
  });
  const email = await vscode.window.showInputBox({
    prompt: "Author email (Required)",
    validateInput: isRequired("Author email"),
  });
  const key = await vscode.window.showInputBox({
    prompt: "Author initials (Required)",
    validateInput: isRequired("Author initials"),
  });

  if (anyUndefined(name, email, key)) return null;

  return {
    name,
    email,
    key,
  };
}

function isRequired(fieldName) {
  return (value) => {
    if (value.length === 0) return `${fieldName} is required.`;
  };
}

function anyUndefined(...args) {
  return args.some((value) => typeof value === "undefined");
}

exports.addRepoAuthorToCoauthors = addRepoAuthorToCoauthors;
