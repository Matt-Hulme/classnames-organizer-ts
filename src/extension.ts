import * as vscode from 'vscode';
import { parseClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension activated');
    context.subscriptions.push(vscode.commands.registerCommand('extension.sortClassNames', sortClassNames));

    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(async (e) => {
      console.log('onWillSaveTextDocument event fired');
      const edit = sortClassNames(e.document);
      if (edit) {
          console.log('Edit created');
          const success = await vscode.workspace.applyEdit(edit);
          console.log('Edit applied:', success);
      } else {
          console.log('No edit created');
      }
  }));
}

function sortClassNames(document: vscode.TextDocument): vscode.WorkspaceEdit | undefined {
  console.log('sortClassNames called');
  const code = document.getText();
  console.log('Original code:', code);
  const sortedCode = parseClassNames(code);
  console.log('Sorted code:', sortedCode);
  if (sortedCode !== code) {
      console.log('Code was sorted');
      const range = new vscode.Range(
          document.positionAt(0),
          document.positionAt(code.length)
      );
      const edit = new vscode.WorkspaceEdit();
      edit.replace(document.uri, range, sortedCode);
      return edit;
  } else {
      console.log('Code was not sorted');
      return undefined;
  }
}