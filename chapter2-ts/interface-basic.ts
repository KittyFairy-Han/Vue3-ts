/*
 * @Author: 鱼小柔
 * @Date: 2021-02-15 18:15:47
 * @LastEditors: your name
 * @LastEditTime: 2021-02-15 18:25:25
 * @Description: ts interface
 */
interface Person {
  readonly id: number; //只读属性
  name: string;
  age: number;
  hoby?: string; //可选属性
}
let viking: Person = {
  id: 2457, //只能声明时赋值，不能（viking.id=1234）重新赋值
  name: "viking",
  age: 20, //必选属性不可少
  //work:'teacher'//多属性不行
};
