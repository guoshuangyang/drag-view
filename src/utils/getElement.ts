const getContent = (element: HTMLElement) => {
  return element.innerHTML;
};

// 根据id或者class获取元素的实际大小
const getSize = (id: string | HTMLElement) => {
  if (typeof id === "string") {
    return document.getElementById(id).getBoundingClientRect();
  }
  return id.getBoundingClientRect();
};

export { getContent, getSize };
