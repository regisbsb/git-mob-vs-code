const vscode = require("vscode");
const { solo } = require("git-mob-core");

function soloCommand() {
  return vscode.commands.registerCommand("gitmob.solo", async function () {
    await solo();
    await vscode.commands.executeCommand("gitmob.reload");
  });
}

exports.soloCommand = soloCommand;
