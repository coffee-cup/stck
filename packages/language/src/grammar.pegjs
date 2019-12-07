{
  const makeNode = (type, value) => ({
    type,
    ...value,
    ...location()
  })
}

start = _ body:expr _ { return body }

expr
  = function
  / if
  / call
  
if "if expression"
  = "if" _ "(" _ cond:expr _ ")" _ trueBranch:expr _ "else" _ falseBranch:expr
  { return makeNode("if", { cond, trueBranch, falseBranch }) }
  
function "function"
  = "(" _ param:identifier _ ")" _ "=>" _ body:expr
  { return makeNode("function", { param, body }) }

call "function call"
  = head:atom tail:args*
  { 
    return tail.reduce((acc, n) => {
      n["callee"] = acc;
      return n
  	}, head)
  }

args = "(" _ arg:expr _ ")" 
  { return makeNode("call", { arg }) }
  
atom
  = number
  / identifier
  / literal
  / parens
  
parens =
  "(" _ value:expr _ ")"
  { return makeNode("parens", { value }) }

identifier "identifier" 
  = [a-zA-Z]+ 
  { return makeNode("identifier", {value: text()}) }
  
literal
  = number
  / string
  
string "string"
  = '"' chars:stringChars* '"' 
  { return makeNode("literal", { value: chars.join("") }) }
  
stringChars
  = !('"' / "\\") . { return text() }
  / "\\" seq:"\"" { return seq }

number "number"
  = minus? int frac? 
  { return makeNode("literal", {value: parseFloat(text())}) }

decimal_point
  = "."

digit1_9
  = [1-9]
  
frac
  = decimal_point DIGIT+

int
  = zero / (digit1_9 DIGIT*)

minus
  = "-"

plus
  = "+"

zero
  = "0"
  
_ "whitespace"
  = [ \t\n\r]*
  
DIGIT  = [0-9]
