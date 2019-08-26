
  var token = [];
  const start = char => {

      if(typeof char === 'symbol') return start;
      if(/[0-9]/.test(char))
       {
          token.push(char);
          return inNumber;   
      }
      if(/[\+\-\*\/]/.test(char)
      ) {
          emmitToken("Char", char);
          return start
      }
      if(char === ' ' || char === '\r' 
      || char === '\n') {
          return start;
      }
      
  }
  const inNumber = char => {
      if(/[0-9]/.test(char)) {
          token.push(char);
          return inNumber;
      } else {
          emmitToken("Number", token.join(""));
          token = [];
          return start(char); // put back char
      }
  }
  
function emmitToken(type, value) {
    console.log(value);
}

var input = "1024 + 2 * 256"

var state = start;

for(var c of input.split(''))
    state = state(c);

state('EOF')

