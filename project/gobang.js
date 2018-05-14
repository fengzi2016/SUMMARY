// 实现一个简单五子棋
// 实现目标：
// 1.双方下棋，一人一步，分别持黑白
// 2.有5个连续的棋子则为赢，全盘下满为和
// 3. 可以悔棋


//棋盘类
var Gobang = (function() {
    //左半部分四个轴，从↖开始逆时针转，等差分别为 
    // x | y
    // -1| -1
    // 0 | -1
    // +1| -1
    // +1| 0
    //右半部分 (+1,+1),(+1,0),(-1,+1),(0,-1)
    // => (+-1,+-1),(0,+-1),(+-1,0),(+-1,-+1)
    //创建单个方向，保证另一半可以通过 * -1 得到
    var roundDirect = [[1,1],[0,1],[1,0],[1,-1]];
    class GobangDeal {
        getProps(x,y) {
            return 'x'+x+'y'+y;
        }
        getColor(board, x, y) {
            return board[this.getProps(x,y)];
        }  
        //返回每个方向颜色相同的棋子数
        getDirectSameColorNum(x,y,board,direct) {
            //返回了一个新函数，并且承接了原函数的第一个参数
            let bindColor = this.getColor.bind(this,board);
            let currentColor = bindColor(x,y);
            let result = 0;
            //每个方向应该从原点开始遍历4个直线点
            for(let i = 0; i < 5; i++) {
                let nextColor = bindColor(x + i * direct[0],y + i * direct[1]);
                if(nextColor == currentColor ) {result ++};
            }
            return result;  
        }
        // 判断单个轴（两个方向）是否成立
        checkSingerDirect(x,y,board,direct) {
            let rightDirect = direct;
            let leftDirect = direct.map(v=>-v);
             //返回一个只缺少direct的新函数，承接了之前的参数
            let getNum = this.getDirectSameColorNum.bind(this,x,y,board);
            return (getNum(rightDirect) + 1 +getNum(leftDirect)) >= 5;
        }
        checkRoundDirect(x, y, board, roundDirect) {
            return roundDirect.some(direct => this.checkSingerDirect(x,y,board,direct));
        }
    }
    class Gobang extends GobangUtil {
        constructor(callback) {
            super();
            let board = new Proxy({},{
                get:function(target,property) {
                    if(property in target) {
                        return target[property];
                    } else {
                        return 0
                    }
                }
            })
            this.board = board;
            this.callback = callback;
            this.playChess = this.playChess.bind(this)
        }
        playChess(x,y,colorNumber) {
            this.board[super.getProps(x,y,colorNumber)] = colorNumber;
            let isWin = super.checkRoundDirect(x,y,this.board,roundDirect);
            isWin ? this.callback.end(colorNumber):this.callback.keep(colorNumber);
        }
    }
    return Gobang;
})()

let Game = (function() {
    let chessColor = 2;
    let isWin = false;
    let ele = document.getElementById('root');

    function instantGobang (onEnd,onKeep) {
        let mygobang = new Gobang({
            end(color) {
                onEnd(color);
                isWin = true;
            },
            keep(color) {
                onKeep(color);
            }
        })
        return mygobang;
    }
    function renderTpl(num) {
        let tpl,
            coordArr = []
            htm = '',
            arr = [...Array(num).keys()]
            
            
    }
})
