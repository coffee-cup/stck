# Stck lang

[![](https://github.com/coffee-cup/stck/workflows/CI/badge.svg)](https://github.com/coffee-cup/stck/actions?query=workflow%3ACI)

Stck is a [stack based](https://esolangs.org/wiki/Stack) programming language.
Stacks can be created, manipulated and deleted.

## Features

- Multiple stacks
- Functions
- Loops

```
1 > a # push 1 to a
a > b # pop from a and push to a
a >   # pop from a

# 0 is popped from empty stack

(a # loop until a is empty
)

:foo { # define function foo
}

:foo # call foo
```
