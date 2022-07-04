type dragResult = {
  x: number;
  y: number;
};
export const returnFn = (callback: (res: dragResult) => void) =>
  function onMouseDown(e: MouseEvent) {
    // 鼠标按下后的处理函数
    const { clientX, clientY } = e;
    // 记录鼠标按下的位置
    let mouseDownPosition = {
      x: clientX,
      y: clientY,
    };
    // 记录鼠标按下的时间
    // let mouseDownTime = Date.now();
    const mouseMove = (e: MouseEvent) => {
      // 记录鼠标移动的位置
      const { clientX, clientY } = e;
      // 计算鼠标移动的距离
      const distance = {
        x: clientX - mouseDownPosition.x,
        y: clientY - mouseDownPosition.y,
      };
      callback(distance);
    };
    document.addEventListener("mousemove", mouseMove, true);
    const mouseUp = () => {
      // 移除鼠标移动事件
      document.removeEventListener("mousemove", mouseMove, true);
      // 移除鼠标抬起事件
      document.removeEventListener("mouseup", mouseUp, true);
    };
    document.addEventListener("mouseup", mouseUp, true);
  };
