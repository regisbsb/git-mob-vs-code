const { mob, config } = require("../commands");
const { Author } = require("./author");
const { gitAuthors } = require("./git-authors");
const { gitMessage } = require("./git-message");
const {
  resolveGitMessagePath,
  setCommitTemplate,
} = require("./resolve-git-message-path");

async function getAllAuthors() {
  const gitMobAuthors = gitAuthors();
  return gitMobAuthors.toList(await gitMobAuthors.read());
}

async function setCoAuthors(keys) {
  await solo();
  const selectedAuthors = pickSelectedAuthors(keys, await getAllAuthors());
  for (const author of selectedAuthors) {
    mob.gitAddCoAuthor(author.toString());
  }
  await updateGitTemplate(selectedAuthors);
  return selectedAuthors;
}

async function updateGitTemplate(selectedAuthors) {
  const gitTemplate = gitMessage(
    resolveGitMessagePath(config.get("commit.template"))
  );
  if (selectedAuthors && selectedAuthors.length) {
    return gitTemplate.writeCoAuthors(selectedAuthors);
  }
  return gitTemplate.removeCoAuthors();
}

function pickSelectedAuthors(keys, authorMap) {
  return authorMap.filter((author) => keys.includes(author.key));
}

function getSelectedCoAuthors(allAuthors) {
  let coAuthorsString = "";
  const CO_AUTHOR_KEY = "--global git-mob.co-author";
  if (config.has(CO_AUTHOR_KEY)) coAuthorsString = config.getAll(CO_AUTHOR_KEY);

  return allAuthors.filter((author) => coAuthorsString.includes(author.email));
}

async function solo() {
  setCommitTemplate();
  mob.removeGitMobSection();
  return updateGitTemplate();
}

function getPrimaryAuthor() {
  const name = config.get("user.name");
  const email = config.get("user.email");

  if (name && email) {
    return new Author("prime", name, email);
  }
  return null;
}

function setPrimaryAuthor(author) {
  if (author) {
    config.set("user.name", author.name);
    config.set("user.email", author.email);
  }
}

module.exports = {
  getAllAuthors,
  getPrimaryAuthor,
  getSelectedCoAuthors,
  setCoAuthors,
  setPrimaryAuthor,
  solo,
  updateGitTemplate,
};
