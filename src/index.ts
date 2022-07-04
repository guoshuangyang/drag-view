import { version } from "../package.json";
import { getSize } from "./utils/getElement";
import { getResizeScale, setElementScale } from "./utils/resize";
// import { DomsInfo, DragViewOptions } from "./utils/type";
import { returnFn } from "./utils/event";
export default class DragView {
  public _version: string;
  // 方向
  direction: "horizontal" | "vertical";
  private leftDom: HTMLElement;
  private rightDom: HTMLElement;
  private topDom: HTMLElement;
  private bottomDom: HTMLElement;
  fixed: boolean;
  domsOption: DomsInfo;
  dragElement: HTMLElement;
  private initDomOption: () => void;
  // 鼠标按下后的监听事件
  private onMouseDown: (e: MouseEvent) => void;
  // element: HTMLElement为垂直线，可用div之类元素替代
  constructor(element: HTMLElement, options: DragViewOptions) {
    this.dragElement = element;
    this._version = version;
    // 开启此项，相对页面大小的比例会被固定，resize时比例不会变化,但是都是相对document的，不是视口的大小
    this.fixed = options.fixed || false;
    this.direction = options.direction || "horizontal";
    if (this.direction === "horizontal") {
      if (!options.left && !options.right) {
        throw new Error("请设置left或right");
      }
      this.leftDom = options.left;
      this.rightDom = options.right;
      this.domsOption = {
        left: getSize(this.leftDom),
        right: getSize(this.rightDom),
        body: getSize(document.body),
      };
    } else {
      if (!options.top && !options.bottom) {
        throw new Error("请设置top或bottom");
      }
      this.topDom = options.top;
      this.bottomDom = options.bottom;
      this.domsOption = {
        top: getSize(this.topDom),
        bottom: getSize(this.bottomDom),
        body: getSize(document.body),
      };
    }
    this.init();
  }
  private init() {
    // 监听窗口的resize事件
    window.addEventListener(
      "resize",
      () => {
        this.resize();
      },
      false
    );
    let _this = this;
    this.onMouseDown = returnFn(function (res) {
      // 处理拖拽的方向
      if (_this.direction === "horizontal") {
        // 左边的变大，右边的变小
        if (res.x > 0) {
          // 处理范围
          if (res.x > _this.domsOption.right.width) {
            _this.leftDom.style.width =
              _this.domsOption.right.width + _this.domsOption.left.width + "px";
            _this.rightDom.style.width = `0px`;
            return;
          }
          _this.leftDom.style.width = `${
            _this.domsOption.left.width + res.x
          }px`;
          _this.rightDom.style.width = `${
            _this.domsOption.right.width - res.x
          }px`;
        }
        // 右边的变大，左边的变小
        else {
          // 处理范围
          if (res.x <= -_this.domsOption.left.width) {
            _this.leftDom.style.width = `0px`;
            _this.rightDom.style.width =
              _this.domsOption.right.width + _this.domsOption.left.width + "px";
            return;
          }
          _this.leftDom.style.width = `${
            _this.domsOption.left.width + res.x
          }px`;
          _this.rightDom.style.width = `${
            _this.domsOption.right.width - res.x
          }px`;
        }
        // 重新对doms的宽高进行计算
      } else {
        if (res.y > 0) {
          // 处理范围
          if (res.y > _this.domsOption.bottom.height) {
            _this.topDom.style.height =
              _this.domsOption.bottom.height +
              _this.domsOption.top.height +
              "px";
            _this.bottomDom.style.height = `0px`;
            return;
          }
          _this.topDom.style.height = `${
            _this.domsOption.top.height + res.y
          }px`;
          _this.bottomDom.style.height = `${
            _this.domsOption.bottom.height - res.y
          }px`;
        } else {
          // 处理范围
          if (res.y <= -_this.domsOption.top.height) {
            _this.topDom.style.height = `0px`;
            _this.bottomDom.style.height =
              _this.domsOption.bottom.height +
              _this.domsOption.top.height +
              "px";
            return;
          }
          _this.topDom.style.height = `${
            _this.domsOption.top.height + res.y
          }px`;
          _this.bottomDom.style.height = `${
            _this.domsOption.bottom.height - res.y
          }px`;
        }
      }
    });
    // 鼠标按下后的监听事件
    this.dragElement.addEventListener("mousedown", this.onMouseDown, true);
    // 初始化大小和位置
    this.initDomOption = function () {
      if (_this.direction === "horizontal") {
        _this.domsOption.left = getSize(_this.leftDom);
        _this.domsOption.right = getSize(_this.rightDom);
      } else {
        _this.domsOption.top = getSize(_this.topDom);
        _this.domsOption.bottom = getSize(_this.bottomDom);
      }
    };
    document.addEventListener("mouseup", this.initDomOption, false);
  }
  private resize() {
    // todo 仍有缺陷，比如窗口放大后，两个容器会变大
    let scale;
    if (this.direction === "horizontal") {
      if (this.fixed) {
        scale = getResizeScale(this.domsOption.body.width, this.direction);
        setElementScale(
          this.leftDom,
          this.domsOption.left,
          scale,
          this.direction
        );
        setElementScale(
          this.rightDom,
          this.domsOption.right,
          scale,
          this.direction
        );
      }
      this.domsOption.left = getSize(this.leftDom);
      this.domsOption.right = getSize(this.rightDom);
      this.domsOption.body = getSize(document.body);
    } else {
      if (this.fixed) {
        scale = getResizeScale(this.domsOption.body.height, this.direction);
        setElementScale(
          this.topDom,
          this.domsOption.top,
          scale,
          this.direction
        );
        setElementScale(
          this.bottomDom,
          this.domsOption.bottom,
          scale,
          this.direction
        );
      }
      this.domsOption.top = getSize(this.topDom);
      this.domsOption.bottom = getSize(this.bottomDom);
      this.domsOption.body = getSize(document.body);
    }
  }
  // 销毁
  destroy() {
    this.dragElement.removeEventListener("mousedown", this.onMouseDown, true);
    document.removeEventListener("mouseup", this.initDomOption, false);
    this.onMouseDown = null;
    this.dragElement = null;
    this.leftDom = null;
    this.rightDom = null;
    this.topDom = null;
    this.bottomDom = null;
    this.domsOption = null;
  }
}
