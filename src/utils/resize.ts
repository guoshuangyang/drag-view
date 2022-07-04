import { getSize } from "./getElement";
// import { ElementInfo } from "./type";
// 根据window的resize获取缩放的比例
export function getResizeScale(
  initialValue: number, // 初始宽度或者高度
  direction: "horizontal" | "vertical"
) {
  const { width, height } = getSize(document.body);
  if (direction === "horizontal") {
    return width / initialValue;
  }
  return height / initialValue;
}

// 设置元素的缩放
export function setElementScale(
  element: HTMLElement,
  lasterElementInfo: ElementInfo,
  scale: number,
  direction: "horizontal" | "vertical"
) {
  if (direction === "horizontal") {
    element.style.width = `${lasterElementInfo.width * scale}px`;
  } else {
    element.style.height = `${lasterElementInfo.height * scale}px`;
  }
}
