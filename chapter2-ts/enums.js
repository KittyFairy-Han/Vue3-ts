/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 14:04:30
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 14:17:31
 * @Description: 枚举
 */
// 数字枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 10] = "Up";
    Direction[Direction["Down"] = 11] = "Down";
    Direction[Direction["Left"] = 12] = "Left";
    Direction[Direction["Right"] = 13] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Down); //11
console.log(Direction[0]); //'Up'
//字符串枚举
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "UP";
    Direction2["Down"] = "DOWN";
    Direction2["Left"] = "LEFT";
    Direction2["Right"] = "Right";
})(Direction2 || (Direction2 = {}));
console.log(Direction.Up); // 'UP'
console.log(Direction['UP']); //'Up'
