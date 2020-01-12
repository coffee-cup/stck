{
  const makeNode = (type, value) => ({
    type,
    ...value,
    ...location()
  })
}

start = program

program 
  = _ body:body _
  { return makeNode("program", { body }) }

expr
  = loop
  / function
  / call
  / pushpop
  / operator
  / comment

pushpop "pushpop"
  = left:(literal/identifier)? ">" right:identifier?
  { return makeNode("pushpop", { left, right  } ) }  
  
operator "operator"
  = left:identifier op:OP right:(literal/identifier)?
  { return makeNode("operator", { left, op, right }) }
  
OP = "+" / "-" / "*" / "/" / "?"

function "function"
 = "{" _ name:fnname _ body:body _ "}"
 { return makeNode("function", { name, body }) }

loop "loop"
  = "(" _ id:identifier _ body:body _ ")"
  { return makeNode("loop", { stack: id.value, body }) }
  
body
 = exprs:(_ e:expr { return e })*
 { return exprs }
  
call "call"
  = name:fnname
  { return makeNode("call", { name }) }
  
fnname 
  = ":" id:identifier
  { return id.value }

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

comment "comment"
  = "#" p:([^\n\r]*) _ {return makeNode("comment", {value: p.join('').trim()})}

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
