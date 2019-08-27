
//   var token = [];
//   const start = char => {

//       if(typeof char === 'symbol') return start;
//       if(/[0-9]/.test(char))
//        {
//           token.push(char);
//           return inNumber;   
//       }
//       if(/[\+\-\*\/]/.test(char)
//       ) {
//           emmitToken("Char", char);
//           return start
//       }
//       if(char === ' ' || char === '\r' 
//       || char === '\n') {
//           return start;
//       }
      
//   }
//   const inNumber = char => {
//       if(/[0-9]/.test(char)) {
//           token.push(char);
//           return inNumber;
//       } else {
//           emmitToken("Number", token.join(""));
//           token = [];
//           return start(char); // put back char
//       }
//   }
  
// function emmitToken(type, value) {
//     console.log(value);
// }

// var input = "1024 + 2 * 256"

// var state = start;

// for(var c of input.split(''))
//     state = state(c);

// state('EOF')

function Expression(source){
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "EOF" ) {
        let node = {
            type:"Expression",
            children:[source.shift(), source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source);
}
// <AdditiveExpression> ::= 
//     <MultiplicativeExpression>
//     |<AdditiveExpression><+><MultiplicativeExpression>
//     |<AdditiveExpression><-><MultiplicativeExpression>

function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression") {
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return AdditiveExpression(source);
    } 
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "+") {
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "-") {
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression")
        return source[0];
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}

// <MultiplicativeExpression> ::= 
//     <Number>
//     |<MultiplicativeExpression><*><Number>
//     |<MultiplicativeExpression></><Number>
function MultiplicativeExpression(source){
    if(source[0].type === "Number") {
        let node = {
            type:"MultiplicativeExpression",
            children:[source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source);
    } 
    if(source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === "*") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"*",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression"&& source[1] && source[1].type === "/") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"/",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression")
        return source[0];

    return MultiplicativeExpression(source);
};

var source = [{
    type:"Number",
    value: "3"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "300"
}, {
    type:"+",
    value: "+"
}, {
    type:"Number",
    value: "2"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "256"
}, {
    type:"EOF"
}];
var ast = Expression(source);

console.log(ast);

