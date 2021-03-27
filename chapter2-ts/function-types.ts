/*
 * @Author: 鱼小柔
 * @Date: 2021-02-15 18:25:58
 * @LastEditors: your name
 * @LastEditTime: 2021-02-15 18:38:42
 * @Description: ts-function
 */
const add = (x: number, y: number, z?: number, r?: number): number => {
  //可选参数必须放到后面，可以是多个可选参数
  if (typeof z === "number") {
    return x + y + z;
  } else {
    return x + y;
  }
};
add(1, 2); //参数类型、个数都必须严格遵守声明

interface ISum {
  (x: number, y: number, z?: number): number;
}
let add2: ISum = add;
/* ------------------------------------------------------??? */
/* 
2-7
05:10
声明一个函数类型这样写
let add2:(x: number, y: number, z?: number, r?: number)=>number=add
疑问是为啥不直接
let add2 = add
*/


