/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 14:04:30
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 14:31:10
 * @Description: 枚举
 */

// 数字枚举
enum Direction {
  Up = 10,
  Down,
  Left,
  Right,
}
console.log(Direction.Down); //11
console.log(Direction[12]); //'Left'

//字符串枚举
enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "Right",
}
console.log(Direction2.Up); // 'UP'


//以上举得例子都是常量 常量枚举通常直接写成 const enum xxx {...}
//计算枚举后面再讲
