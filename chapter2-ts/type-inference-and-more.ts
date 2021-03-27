/*
 * @Author: 鱼小柔
 * @Date: 2021-02-15 21:09:45
 * @LastEditors: your name
 * @LastEditTime: 2021-02-15 21:15:31
 * @Description: file content
 */
// union types
let numORstr: number | string; //联合类型的写法
numORstr = "abc";
numORstr = 123;
numORstr.toString(); //联合类型都有的属性或者方法才能访问到否则报错
// numORstr.length//报错

//类型断言 方式
function getLen(input: number | string): number {
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}
//type guard 方式
function getLen2(input: number | string): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.toString().length;
  }
}

/* --------------------------------------??? */
//类型断言没懂
