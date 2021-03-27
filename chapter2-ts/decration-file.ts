/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 16:46:59
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 17:06:53
 * @Description: 声明文件
 */
//2-16 没听懂
// declaration

const a: Array<number> = [1, 2, 3];
const date = new Date();
date.getTime();
const reg = /abc/;
reg.test("abc");
//build-in object
Math.pow(2, 3);
//DOM and BOM
let body = document.body;
let allLis = document.querySelectorAll("li");
allLis.length; //

//Utility Types
interface IPerson {
  name: string;
  age: number;
}
let viking1: IPerson = { name: "viking", age: 20 };
type Ipartial = Partial<IPerson>; //IPerson里面的必要属性都变成了可选的
let viking2: Ipartial = { name: "viking" };
type IOmit = Omit<IPerson, "name">; ////IPerson里面的name变成了可选的
let viking3: IOmit = { age: 20 };
