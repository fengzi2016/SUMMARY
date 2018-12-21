
// function Product(name, price) {
//     this.name = name;
//     this.price = price;
//   }

//   function Food(name, price) {
//     Product.call(this, name, price);
//     this.category = 'food';
//   }
//   function Bao(name){
//     Product.call(1,name);
//   }
//   console.log(new Bao('1').name);
//   console.log(window.name);
//   console.log(new Food('cheese', 5));
  // expected output: "cheese"
 function go (str){
   let len = str.length;
   for( let i = 0; i < len/2 ;i++){
      if(str[i]!==str[len-i-1]){
        return false;
      }
   }
   return true;

 }
 console.log(go('abb'))