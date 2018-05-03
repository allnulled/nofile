# nofile

![](https://img.shields.io/badge/nofile-v1.0.0-green.svg)

A simple tool, for Node.js, to find the first missing file in a directory, based on a simple string pattern.


## 1. Installation

~$ `npm install -s nofile`

## 2. Usage

You can use the `sync` or the `async` approach.

In the above examples, supose that there is a folder in your filesystem that looks like this:

```bash
/temporary
├── file.1.txt
├── file.2.txt
├── file.3.txt
└── file.4.txt
```

##### 1. Example of sync approach:

```js
var nofile = require("nofile").findSync("/temporary/file.{n}.txt");
// 'nofile' is "/temporary/file.5.txt" now
```

##### 2. Example of async approach:

```js
require("nofile")
  .find("/temporary/file.{n}.txt")
  .then(function(nofile) {
    // 'nofile' is "/temporary/file.5.txt" now
});
```

## 3. API

**Method:** `nofile.find`

**Type:** {Function}

**Parameters:** `{String:pattern}` Pattern to find the first missing file. It is a pattern because it needs to contain `"{n}"` literally. This substring will be replaced by 0, 1, 2, 3, 4,... (and so on) until a missing file is found.

**Returns:** {Promise}

**Description:** Finds the first missing file based on the passed pattern, and returns a `{Promise}` object that receives that file.

**Example:** see the `Usage` section of this document.

----

**Method:** `nofile.find`

**Type:** {Function}

**Parameters:** `{String:pattern}` Pattern to find the first missing file. It is a pattern because it needs to contain `"{n}"` literally. This substring will be replaced by 0, 1, 2, 3, 4,... (and so on) until a missing file is found.

**Returns:** {String} The missing file itself.

**Description:** Finds the first missing file based on the passed pattern, and returns it as `{String}`.

**Example:** see the `Usage` section of this document.



## 4. Conclusion

This is a very simple module, but can result handy in order to avoid typing unnecessary code.

















