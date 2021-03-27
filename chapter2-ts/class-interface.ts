/*
 * @Author: 鱼小柔
 * @Date: 2021-02-16 13:51:50
 * @LastEditors: your name
 * @LastEditTime: 2021-02-16 13:51:51
 * @Description: ts-class&interface
 */

interface Radio {
  switchRadio(trigger: boolean): void;
}
// interface Battery{
//     checkBatteryStatus():void;
// }
interface RadioWithBattery extends Radio{
    checkBatteryStatus():void;
}
class Car implements Radio {
    switchRadio(trigger: boolean){}
}

class CellPhone implements RadioWithBattery {
    switchRadio(trigger: boolean){}
    checkBatteryStatus(){}
}
