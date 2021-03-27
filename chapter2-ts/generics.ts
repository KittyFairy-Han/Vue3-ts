/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 15:25:25
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 15:59:55
 * @Description: 泛型
 */
//泛型
function echo<T>(arg: T): T {
  return arg;
}

const result: number = echo(134);

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
const tuple = swap(["str", 123]);
const numnum: number = tuple[0];
const str: string = tuple[1];

// 约束泛型
function echoWithArr<T>(params: T[]): T[] {
  console.log(params.length);
  return params;
}
interface IWithLength {
  length: number;
}
function echoWithLenght<T extends IWithLength>(params: T): T {
  console.log(params.length);
  return params;
}

//泛型应用于class
class Queue<T>{
    private data = []
    push(item:T){
        return this.data.push(item)
    }
    pop():T{
        return this.data.shift()
    }
}

const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

interface KeyPair<T,U>{
    key:T
    value:U
}
let kp1:KeyPair<number,string>={key:1,value:'str'}
let kp2:KeyPair<string,number>={key:'str',value:2}