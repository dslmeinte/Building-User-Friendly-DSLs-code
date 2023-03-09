# Answer to exercise 10.3

The following lists every source file of the Domain IDE, and whether it's DSL-_specific_, -_generic_, or -_aspecific_.

| Folder | File | DSL- |
| ------ | ---- | ---- |
| `src/backend` | `server.js` | aspecific |
| | `storage.js` | aspecific |
| `src/common` | `ast.js` | generic |
| | `dependency-utils.js` | aspecific* |
| | `file-utils.js` | aspecific |
| `src/frontend` | `css-util.js` | aspecific |
| | `index.html` | aspecific |
| | `index.jsx` | aspecific |
| | `projection.jsx` | *specific* |
| | `styling.css` | all three |
| | `support-components.jsx` | generic |
| | `value-components.jsx` | generic |
| `src/generator` | `generate.js` | generic |
| | `indexJsx-template.js` | *specific* |
| | `template-utils.js` | aspecific |
| `src/init` | `example-AST.js` | *specific* |
| | `install-example-DSL-content.js` | *specific* |
| | `migrations.js` | *specific* |
| `src/language` | `constraints.js` | *specific* |
| | `queries.js` | *specific* |

*) after doing a proper Refactoring so that a dependencies function is passed as an argument, instead of using the `referencedAttributesInValueOf` function from `src/language/queries`.

