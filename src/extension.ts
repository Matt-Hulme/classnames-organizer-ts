import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('extension.sortClassNames', sortClassNames));

  context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((e) => {
    if (e.document.languageId === 'typescript' || e.document.languageId === 'javascript') {
      vscode.commands.executeCommand('extension.sortClassNames', e.document);
    }
  }));
}

async function sortClassNames(document: vscode.TextDocument) {
  const editor = vscode.window.activeTextEditor;
  if (editor && editor.document === document) {
    const code = editor.document.getText();
    const sortedCode = parseClassNames(code);
    if (sortedCode !== code) {
      const range = new vscode.Range(
        editor.document.positionAt(0),
        editor.document.positionAt(code.length)
      );
      const edit = new vscode.WorkspaceEdit();
      edit.replace(document.uri, range, sortedCode);
      await vscode.workspace.applyEdit(edit);
    }
  }
}