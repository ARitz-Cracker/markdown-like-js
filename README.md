# markdown-like

Yes, simple markdown-like things (also, escaping special HTML characters)

## Text replacements:

`*bold*` ➡ `<b>bold</b>`

`_italic_` ➡ `<i>italic</i>`

`~strikethrough~` ➡ `<s>strikethrough</s>`

\`monospace\` ➡ `<span class="monospace">monospace</span>`

`super^script^` ➡ `super<sup>script</sup>`

`<td>sub|script|</td>` ➡ `<td>sub<sub>script</sub></td>`

`[link](http://aritzcracker.ca)` ➡ `<a href="http://aritzcracker.ca">link</a>`

`[@new tab link](http://aritzcracker.ca)` ➡ `<a href="http://aritzcracker.ca" target="_blank">new tab link</a>`

`escaping\_special\_characters\*` ➡ `escaping_special_characters*`

## Usage

```js

const {markdownToHTML, escapeHTMLSpecialChars} = require("markdown-like")
console.log(escapeHTMLSpecialChars("Hello, *<world!>*")); // Hello, *&lt;world!&gt;*
console.log(markdownToHTML("Hello, *<world!>*")); // Hello, <b>&lt;world!&gt;</b>
console.log(markdownToHTML("Hello,\n_world!_")); // Hello, <i>world!</i>
console.log(markdownToHTML("Hello,\n_world!_", "<br>")); // Hello,<br><i>world!</i>
```
