- 柯里化
```js
    var curry = require('lodash').curry;
    var match = curry(function(what,str){
        return str.match(what);
    })
    var replace = curry(function(what,replacement,str) {
        return str.replace(what,replacement);
    })
    var filter = curry(function(f,ary){
        return ary.filter(f)
    })
    var map = curry(function(f,ary){
        return ary.map(f);
    })
    // 调用：
    match(/\s+/g,'hello word')
    // [' ']
    var hasSpaces = match(/\s+/g);
    hasSpaces('hello word')
    // [' ']

```

- 练习
```js
    var	_	=	require('ramda');
    //	练习	1 
    //============== 
    //	通过局部调用（partial	apply）移除所有参数
    var	words	=	function(str)	{		            return	split('	',	str);
    };
    // 答案 1
    var words = split(' ')

    //	练习	2 //============== 
    //	通过局部调用（partial	apply）移除所有参数
        var	filterQs	=	function(xs)	{		return	filter(function(x){	return	match(/q/i,	x);		},	xs); }
    // 答案 2
    var filterQs = filter(match(/q/i))

    //	练习	3 
    //==============
    //	使用帮助函数	`_keepHighest`	重构	`max`	使之成为	curry	函数
    //	无须改动: 
        var	_keepHighest	=	function(x,y){	return	x	>=	y	?	x	:	y;	};
    //	重构这段代码: 
        var	max	=	function(xs)	{		
            return	reduce(function(acc,	x){				
                return	_keepHighest(acc,	x);		
                },	
                -Infinity,	xs);
         };


    // 答案 3
    var max = reduce(_keepHighest,-Infinity)

    //	彩蛋	1: 
    //	============ 
    //	包裹数组的	`slice`	函数使之成为	curry	函数 
    //	
    //[1,2,3].slice(0,	2) 
    var	slice	=	undefined

    // 彩蛋答案 1
    var slice = _.curry(function(start,end,arr){
        return arr.slice(start,end);
    })
    //	彩蛋	2: 
    //	============
    //	借助	`slice`	定义一个	`take`	curry	函数，该函数调用后可以取出字符串的 前	n	个字符。 
    var	take	=	undefined;
    var take = slice(n)

```

- 组合
    - 基本示例
    ```js
    var compose = function(f,g) {
        return function(x) {
            return f(g(x));
        }
    }
    ```
    - 特性：
         - 函数参数从右往左执行
         -结合律：
            ```js
                var associative = compose(f,compose(g,h)) == compose(compose(f,g),h);
            ```
    - 练习
    ```js
    require('../../support'); var	_	=	require('ramda'); var	accounting	=	require('accounting');
    //	示例数据 
    var	CARS	=	[				
        {name:	"Ferrari	FF",	horsepower:	660,	dollar_value:	700000,	in_stock:	true},				
        {name:	"Spyker	C12	Zagato",	horsepower:	650,	dollar_value:	6 48000,	in_stock:	false},				{name:	"Jaguar	XKR-S",	horsepower:	550,	dollar_value:	132000 ,	in_stock:	false},				
        {name:	"Audi	R8",	horsepower:	525,	dollar_value:	114200,	in_ stock:	false},				
        {name:	"Aston	Martin	One-77",	horsepower:	750,	dollar_value:	1850000,	in_stock:	true},			{name:	"Pagani	Huayra",	horsepower:	700,	dollar_value:	13000 00,	in_stock:	false}		];

        //	练习	1:
        //	============ 
        //	使用	_.compose()	重写下面这个函数。提示：_.prop()	是	curry	函数 
        var	isLastInStock	=	function(cars)	{		
            var	last_car	=	_.last(cars);		
            return	_.prop('in_stock',	last_car); 
        };
        // 答案 1
        var isLastInstock = _.compose(_.prop('in_stock'),_.last);

        //	练习	2: 
        //	============ 
        //	使用	_.compose()、_.prop()	和	_.head()	获取第一个	car	的	name
         var	nameOfFirstCar	=	_.compose(_.prop('name'),_head);

        //	练习	3:
         //	============ 
         //	使用帮助函数	_average	重构	averageDollarValue	使之成为一个组合 
         var	_average	=	function(xs)	{	return	reduce(add,	0,	xs)	/	xs.len gth;	};	//	<-	无须改动

        var	averageDollarValue	=	function(cars)	{		
            var	dollar_values	=	map(function(c)	{	
                return	c.dollar_value;	
            } ,	cars);		
            return	_average(dollar_values); 
        };

        var averageDollarValue = _.compose(_average,_.map(_.prop('dollar_value')));

        //	练习	4: 
        //	============ 
        //	使用	compose	写一个	sanitizeNames()	函数，返回一个下划线连接的小写字 符串：例如：sanitizeNames(["Hello	World"])//=>	["hello_world"]。
        var	_underscore	=	replace(/\W+/g,	'_');	//<--	无须改动，并在	sanit izeNames	中使用它
        var	sanitizeNames	= _.map(_.compose(toLowerCase,_underscore,_prop('name')))

        //	彩蛋	1: 
        //	============ 
        //	使用	compose	重构	availablePrices
        var	availablePrices	=	function(cars)	{	
            var	available_cars	=	_.filter(_.prop('in_stock'),	cars);		
            return	available_cars.map(function(x){				
                return	accounting.formatMoney(x.dollar_value);		
            }).join(',	'); 
        };
        var formatPrice = _.compose(accounting.formatMoney,_.prop('dollar_value'));
        var	availablePrices = _compose(join(','),_.map(formatPrice),_.filter(_.prop('in_stock')))
        
        //	彩蛋	2: 
        //	============ 
        //	重构使之成为	pointfree	函数。提示：可以使用	_.flip() 交换函数前两个参数的位置
        var	fastestCar	=	function(cars)	{		
            var	sorted	=	_.sortBy(function(car){	return	car.horsepower	},	cars);		
            var	fastest	=	_.last(sorted);		
            return	fastest.name	+	'	is	the	fastest'; 
        };
        var append = _.flip(_.concat);
        var fastestCar = _.compose(append('is the fastest'),
                                    _.prop('name'),
                                    _.last,
                                    _.sortBy(_.prop('horsepower')));

    ```

- 无数据函数 pointfree
```js
    //	非	pointfree，因为提到了数据：name 
    var	initials	=	function	(name)	{		
        return	name.split('	').map(compose(toUpperCase,	head)).join('.	'); 
    };
    //	pointfree 
    var	initials	=	compose(join('.	'),	map(compose(toUpperCase,	head )),	split('	'));
    initials("hunter	stockton	thompson");
     //	'H.	S.	T'

```

- debug
```js
    var	trace	=	curry(function(tag,	x){		console.log(tag,	x);		return	x; });
    // 当出错时，打印出来传递的参数
    var	dasherize	=	compose(join('-'),	toLower,	trace("after	split") ,	split('	'),	replace(/\s{2,}/ig,	'	'); //	after	split	[	'The',	'world',	'is',	'a',	'vampire'	]

```

- 示例应用(用函数式编程的方法爬取某个网站的图片并且展示)
```js
    requirejs.config({
        paths:{
            ramda:'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ ramda.min',
            jquery:	'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/ jquery.min'
        }
    });
    require([
        'ramda',
        'jquery'
    ],
    function(_,$){
        // Utils
    })
    
```