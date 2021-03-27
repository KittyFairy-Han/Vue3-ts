/*
 * @Author: 鱼小柔
 * @Date: 2021-03-21 19:31:04
 * @LastEditors: your name
 * @LastEditTime: 2021-03-21 19:56:19
 * @Description: 验证函数
 */
interface CheckCondition {
  format?: string[];
  size?: number;
}
type ErrorType = "size" | "format";
export function commonUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isPassSize = size ? file.size / 1024 / 1024 > size : true;
  const error: ErrorType[] = [];
  if (!isValidFormat) {
    error.push("format");
  }
  if (isPassSize) {
    error.push("size");
  }
  return {
    passed: error.length == 0,
    error: error,
  };
}
