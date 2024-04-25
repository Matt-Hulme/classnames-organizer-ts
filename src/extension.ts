import * as vscode from 'vscode';
import { sortClassNames } from './utils';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.sortClassNames', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const code = editor.document.getText();

      // Split the code into lines
      const lines = code.split('\n');

      // Iterate over each line
      for (let i = 0; i < lines.length; i++) {
        // If the line contains a className attribute, sort the class names
        if (lines[i].includes('className=')) {
          const start = lines[i].indexOf('className=') + 12;
          const end = lines[i].indexOf('"', start);
          const classNames = lines[i].substring(start, end);

          const sortedClassNames = sortClassNames(classNames);

          // Replace the original class names with the sorted class names
          lines[i] = lines[i].substring(0, start) + sortedClassNames + lines[i].substring(end);
        }
      }

      // Join the lines back together into a single string
      const sortedCode = lines.join('\n');

      // Replace the original code with the sorted code
      editor.edit(editBuilder => {
        const entireRange = new vscode.Range(
          editor.document.positionAt(0),
          editor.document.positionAt(code.length)
        );
        editBuilder.replace(entireRange, sortedCode);
      });
    }
  });

  context.subscriptions.push(disposable);
}