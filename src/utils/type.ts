// html 信息对象类
type ElementInfo = {
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

type DragViewOptions = {
  // 方向
  direction?: "horizontal" | "vertical";
  // Whether the ratio is fixed
  fixed?: boolean;
  left?: HTMLElement;
  right?: HTMLElement;
  top?: HTMLElement;
  bottom?: HTMLElement;
};

type DomsInfo = {
  left?: ElementInfo;
  right?: ElementInfo;
  top?: ElementInfo;
  bottom?: ElementInfo;
  body?: ElementInfo;
};
