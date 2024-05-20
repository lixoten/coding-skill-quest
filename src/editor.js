/*
theme demo
https://codemirror.net/5/demo/theme.html#oceanic-next

Step 1
---install rollup used to create
> npm i rollup @rollup/plugin-node-resolve

Step 2
---Command to create new Bundle.js
>   npx rollup editor.js -f iife -o editor.bundle.js -p @rollup/plugin-node-resolve
  npx rollup editor.js -f iife -o dist/cm6.bundle.js -p @rollup/plugin-node-resolve --output.name cm6
  npx rollup src/editor.js -f iife -o dist/cm6.bundle.js -p @rollup/plugin-node-resolve --output.name cm6
  npx rollup editor.js -f iife -o dist/cm6.bundle.js -p @rollup/plugin-node-resolve --output.name cm6

Step 3
Check npm
> npm list

**/

//npm install style-mod

//-- Thisd creates the package.json file
//npm init -y

//npm install codemirror@6


//import {EditorView, basicSetup} from "codemirror"
//import { basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark";
import { highlightSelectionMatches } from '@codemirror/search';
import {
    bracketMatching,
    defaultHighlightStyle,
    foldGutter, foldKeymap,
    indentOnInput,
    indentUnit,
    syntaxHighlighting
} from '@codemirror/language';
import {indentWithTab, defaultKeymap, historyKeymap} from "@codemirror/commands"
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';

import { EditorState } from '@codemirror/state';

import {
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    drawSelection,
    //dropCursor,
    rectangularSelection,
    crosshairCursor,
    highlightActiveLine,
    keymap,
    EditorView
  } from '@codemirror/view';

//import { defaultTheme } from "@codemirror/basic-setup";

//console.log(1233);
//import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"

//extensions: [basicSetup, javascript()],
//let currentTheme = "";

// const myExtensions = [basicSetup,
//     javascript(),
//     keymap.of([indentWithTab]),
//     indentUnit.of("    ")
// ];
// myExtensions.push(oneDark);

// let editor = new EditorView({
//     //extensions: [basicSetup, javascript(), EditorView.theme.of('dracula')],
//     extensions: myExtensions,
//     parent: document.body
// })

// document.getElementById('toggleThemeButton').addEventListener('click', ()=> {
//     //toggleTheme();
//     alert("DDDD");
// });


function createEditorState(initialContents, options = {}) {
    let extensions = [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        // history(),
        foldGutter(),
        drawSelection(),
        indentUnit.of("    "),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            indentWithTab,
             ...closeBracketsKeymap,
             ...defaultKeymap,
             ...historyKeymap,
             ...foldKeymap,
             ...completionKeymap,
        ]),
        javascript(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    ];

    if (options.oneDark)
        extensions.push(oneDark);

    return EditorState.create({
        doc: initialContents,
        extensions
    });
}

function createEditorView(state, parent) {
    return new EditorView({ state, parent });
}

export { createEditorState, createEditorView };


//let currentTheme = oneDark;
// function toggleTheme() {
//     if (currentTheme === oneDark) {
//         currentTheme = defaultTheme;
//     } else {
//         currentTheme = oneDark;
//     }
//     editor.dispatch({
//         effects: EditorView.updateListener.of(view => {
//             view.dispatch({
//                 effects: EditorView.reconfigure.of(EditorView.theme.of(currentTheme))
//             });
//         })
//     });
// }

// // At the bottom of your editor.js file, after exporting the functions
//
// // Get the editor element from the DOM
// const editorElement = document.getElementById('editor');
//
// // Define some initial contents for the editor
// const initialContents = 'function helloWorld() {\n  return "Hello, world";\n}';
//
// // Create the editor state with your custom extensions
// const editorState = createEditorState(initialContents, {
//     oneDark: true, // Enable the oneDark theme
// });
//
// // Create the editor view and attach it to the editor element
// const myCodeMirror = createEditorView(editorState, editorElement);