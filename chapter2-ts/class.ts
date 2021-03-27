/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 13:41:57
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 13:41:58
 * @Description:ts-class
 */
// 权限修饰符
//public 都可以访问
//protected 仅自己和子类访问
//private 仅自己访问
// 静态修饰符 static
// 只读修饰符
class Animal {
  readonly name: string;
  constructor(name) {
    this.name = name;
  }
  run() {
    return `${this.name} is running`;
  }
}

const snake = new Animal("ss1");
console.log(snake.run());

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}
