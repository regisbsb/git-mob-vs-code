const vscode = require("vscode");
const { MobAuthors } = require("./mob-authors");
const { TreeNode } = require("./tree-node");

class CoAuthorProvider {
  constructor(context) {
    this._notLoaded = true;
    this._selected = [];
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.mobAuthors = new MobAuthors();
    this.context = context;
  }

  getChildren(element = {}) {
    const allAuthors = this.mobAuthors.listAll;
    if (element.key === "Selected") {
      return this.mobAuthors.listCurrent;
    }

    if (element.key === "Unselected") {
      const setAllAuthor = new Set(allAuthors);
      for (let author of setAllAuthor) {
        if (author.selected) setAllAuthor.delete(author);
      }
      return Array.from(setAllAuthor);
    }

    if (element.key === "More Authors") {
      return this.mobAuthors.repoAuthorList();
    }

    return [
      this.mobAuthors.author,
      new TreeNode("Selected", "selected", "selected.svg"),
      new TreeNode("Unselected", "unselected", "unselected.svg"),
      new TreeNode("More Authors", "more-authors", "more.svg", false)
    ];
  }

  getTreeItem(element) {
    if (
      element.email === this.mobAuthors.lastCoAuthor.email &&
      this._notLoaded
    ) {
      this.loaded();
      this._notLoaded = false;
    }

    if (
      element.email === this.mobAuthors.lastCoAuthor.email &&
      this._changed()
    ) {
      this.onChanged();
    }

    return element.getTreeItem({ context: this.context });
  }

  toggleCoAuthor(author, selected) {
    this.mobAuthors.setCurrent(author, selected);
    this.reloadData();
  }

  _changed() {
    const currentSelected = this.mobAuthors.listAll.filter(
      coAuthors => coAuthors.selected
    );

    const isDiff = this._selected.length !== currentSelected.length;

    this._selected = currentSelected;

    return isDiff;
  }

  reloadData() {
    this._onDidChangeTreeData.fire();
  }
}

exports.CoAuthorProvider = CoAuthorProvider;
