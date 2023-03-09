# README

The DSL-*aspecific* code used by the frontends - currently only `ast.js` - is located in the `common/` directory.
Each of the other directories contains a version of the frontend.
The names indicate a section (§ <chapter-number>.<section-number>) of the chapter, usually (but optionally) followed by a hyphen and a further indication of the intention of that version.
That indication can itself be numbered again, so the entire format for the directory names is: `<chapter-number>.<section-number>[-[<sequence number>-]<description-of-intent>]`

Each of the frontend versions can be run by running the following commandline command

```shell
$ npx parcel <dir>/index.html
```

and opening [`http://localhost:1234/`](http://localhost:1234/) in a browser.

