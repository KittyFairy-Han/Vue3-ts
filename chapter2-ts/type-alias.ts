/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 16:13:26
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 16:25:06
 * @Description: 类型别名
 */
let sum: (x: number, y: number) => number;
type plusType = (x: number, y: number) => number; //给一个函数类型起了一个别名
let sum2: plusType;
//字面量的应用
type Directions = 'Up'|'Down'|'Left'|'Right'
let toWhere:Directions = 'Left' //这种的就可以自动提示，超好用哦

//交叉类型 union联合类型是∪集 教程类型是∩交集
interface IName {
    name:string
}
type Iperson=IName&{age:number}
let person:Iperson={name:'124',age:124}
//用interface也可以实现对类型的约束，用这种交叉类型也可以，区别只能在之后的使用中体会