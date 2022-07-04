// 销毁所有的监听事件和实例
export function destroy(instance: any) {
  if (instance.destroy) {
    instance.destroy();
  }
  if (instance.off) {
    instance.off();
  }
}
