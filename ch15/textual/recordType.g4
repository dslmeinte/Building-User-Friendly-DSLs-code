grammar recordType;

STRING: '"' [A-Za-z0-9 ]+ '"' ;

type: 'amount' | 'percentage' | 'period in days' ;

WS: (' ' | '\t' | '\n')+ ;

attributeReference: '->' WS? STRING ;

fragment DIGIT: [0-9] ;

number: DIGIT+ ('.' DIGIT+)? ;

value: attributeReference | number ;

attribute: STRING WS? ':' WS? type (WS 'initially' WS? value)? ;

recordType: WS? 'record type' WS? STRING WS? 'having attributes:' (WS? attribute)* WS? ;

