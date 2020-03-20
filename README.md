# Stck lang

[![](https://github.com/coffee-cup/stck/workflows/CI/badge.svg)](https://github.com/coffee-cup/stck/actions?query=workflow%3ACI)
[![](https://img.shields.io/npm/v/stck?style=flat-square)](https://www.npmjs.com/package/stck)
[![](https://img.shields.io/github/license/coffee-cup/stck?style=flat-square&color=brightgreen)](https://github.com/coffee-cup/stck/blob/master/LICENSE)

Stck is a minimal [stack based](https://en.wikipedia.org/wiki/Stack-oriented_programming)
[esoteric programming language](https://esolangs.org/wiki/Esoteric_programming_language).
Data is stored on an unlimited number of stacks. Stacks can be pushed to, popped
from, or manipulated with operators.

The language spec can be found at [stck.jakerunzer.com/spec](https://stck.jakerunzer.com/stck).

```sh
npx stck file.stck
```

## Features

- Multiple stacks
- Functions
- Loops

```
1>a # push 1 to a
a>b # pop from a and push to a
a>   # pop from a

# 0 is popped from empty stack

# o is the output stack and is write only
# pushing values to it will be sent to stdout
"hello, world">o

# i is the input stack and is read only
# when the program starts, stdin is parsed and added to this stack
i>o

a+  # pop from a and b, add, push result to a
a+a # pop 2 values from a, add, push result to a
a+1 # pop from a, add 1, push result to a

(a # loop until a is empty
)

:foo { # define function foo
}

:foo # call foo
```

## Getting Started

Head to [stck.jakerunzer.com](https://stck.jakerunzer.com) for information how to use and get started with Stck.
