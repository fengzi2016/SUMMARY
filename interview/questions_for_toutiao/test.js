'use strict'
function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
  }
  function Bao(name){
    Product.call(1,name);
  }
  console.log(new Bao('1').name);
  console.log(window.name);
  console.log(new Food('cheese', 5));
  // expected output: "cheese"
  