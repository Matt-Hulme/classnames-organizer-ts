import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.sortClassNames', sortClassNames));

    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((e) => {
        if (e.document.languageId === 'typescript' || e.document.languageId === 'javascript') {
            const edit = sortClassNames(e.document);
            if (edit) {
                e.waitUntil(Promise.resolve(edit));
            }
        }
    }));
}

function sortClassNames(document: vscode.TextDocument): vscode.WorkspaceEdit | undefined {
  const code = document.getText();
  const sortedCode = parseClassNames(code);
  if (sortedCode !== code) {
      const range = new vscode.Range(
          document.positionAt(0),
          document.positionAt(code.length)
      );
      const edit = new vscode.WorkspaceEdit();
      edit.replace(document.uri, range, sortedCode);
      return edit;
  }
  return undefined;
}