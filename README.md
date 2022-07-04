# DragView

一个简单的拖拽实现的div的大小互换
![](demo.gif)

+ 实现上下、左右的的滑动拖拽大小
+ 实现宽高可以固定比例（根据document大小，不是可是窗口的大小）,可以随时直接修改实例的fixed的boolean进行变更是否固定相对document的比例大小
+ 只需要3个div就可以实例化一个demo
  ```js
    new DragView(document.getElementById("center"), {
        direction: "horizontal",
        fixed: true,
        left: document.getElementById("left"),
        right: document.getElementById("right"),
    });
  ```

### 使用

```js
// 支持umd、esm


```