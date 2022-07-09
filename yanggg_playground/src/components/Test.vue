<template>
  <div>
    <div style="width: 100%">
      <!-- clickable: {{ clickable }} <br />
      isMouseDown: {{ isMouseDown }} <br />
      isMouseUp: {{ isMouseUp }}<br />
      isMouseMove: {{ isMouseMove }}<br />
      targetIndex: {{ targetIndex }}<br />
      target: {{ target }}<br />
      startPos: {{ startPos }}, movePos: {{ movePos }}, -->
    </div>
    <ul class="grid" ref="grid">
      <li
        v-for="(item, index) in colors"
        :key="index"
        class="grid-item"
        :data-id="index"
        :style="{ background: item.color }"
      >
        {{ index }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "textComponent",
  data() {
    return {
      colors: [
        {
          category: "image",
          name: "elia-pellegrini-eJOmUnh_yYw-unsplash.jpg",
          id: "0e339e8c636a999a35dc012ff3c8cc49",
          color: "#9b59b6",
        },
        {
          category: "image",
          name: "windows-3f04FMm_Jqk-unsplash.jpg",
          id: "f1e12273ee379cd24b5d3a7e5c3626c0",
          color: "#8e44ad",
        },
        {
          category: "image",
          name: "windows-3f04FMm_Jqk-unsplash.jpg",
          id: "ebe4c6ae35d71fab6a6afaa6f7f83195",
          color: "#e67e22",
        },
        {
          category: "image",
          name: "windows-3f04FMm_Jqk-unsplash.jpg",
          id: "1767fb2a5f7256fa1a2d11faff3b6e00",
          color: "#c0392b",
        },
        {
          category: "image",
          name: "windows-3f04FMm_Jqk-unsplash.jpg",
          id: "a130ee007b946048eec15d428c8b63ed",
          color: "#f39c12",
        },
        {
          category: "image",
          name: "windows-3f04FMm_Jqk-unsplash.jpg",
          id: "b6c1796d748740c2d05e85ec506c61a5",
          color: "#16a085",
        },
      ],
      parent: null, // 父级元素
      cloneElementClassName: "clone-grid-item", // 克隆元素类名
      isPointerdown: false,
      diff: { x: 0, y: 0 }, // 相对于上一次移动差值
      drag: { element: null, index: 0, lastIndex: 0 }, // 拖拽元素
      drop: { element: null, index: 0, lastIndex: 0 }, // 释放元素
      clone: { element: null, x: 0, y: 0 },
      lastPointermove: { x: 0, y: 0 },
      rectList: [], // 用于保存拖拽项getBoundingClientRect()方法获得的数据
    };
  },
  created() {
  },
  mounted() {
    this.parent = this.$refs.grid;
    this.getRect();
    this.bindEventListener();
  },
  destroyed() {
    this.unbindEventListener();
  },
  methods: {
    init() {
      this.getRect();
      this.bindEventListener();
    },
    // 获取元素位置信息
    getRect() {
      this.rectList.length = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.parent.children) {
        this.rectList.push(item.getBoundingClientRect());
      }
    },
    handlePointerdown(e) {
      // 如果是鼠标点击，只响应左键
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      if (e.target === this.parent) {
        return;
      }
      this.isPointerdown = true;
      this.parent.setPointerCapture(e.pointerId);
      this.lastPointermove.x = e.clientX;
      this.lastPointermove.y = e.clientY;
      this.drag.element = e.target;
      this.drag.element.classList.add("active");
      this.clone.element = this.drag.element.cloneNode(true);
      this.clone.element.className = this.cloneElementClassName;
      this.clone.element.style.transition = "none";
      const i = [].indexOf.call(this.parent.children, this.drag.element);
      this.clone.x = this.rectList[i].left;
      this.clone.y = this.rectList[i].top;
      this.drag.index = i;
      this.drag.lastIndex = i;
      this.clone.element.style.transform = `translate3d(${this.clone.x}px, ${this.clone.y}px, 0)`;
      document.body.appendChild(this.clone.element);
    },
    handlePointermove(e) {
      if (this.isPointerdown) {
        this.diff.x = e.clientX - this.lastPointermove.x;
        this.diff.y = e.clientY - this.lastPointermove.y;
        this.lastPointermove.x = e.clientX;
        this.lastPointermove.y = e.clientY;
        this.clone.x += this.diff.x;
        this.clone.y += this.diff.y;
        this.clone.element.style.transform = `translate3d(${this.clone.x}px, ${this.clone.y}px, 0)`;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.rectList.length; i++) {
          // 碰撞检测
          if (
            e.clientX > this.rectList[i].left
            && e.clientX < this.rectList[i].right
            && e.clientY > this.rectList[i].top
            && e.clientY < this.rectList[i].bottom
          ) {
            this.drop.element = this.parent.children[i];
            this.drop.lastIndex = i;
            if (this.drag.element !== this.drop.element) {
              if (this.drag.index < i) {
                this.parent.insertBefore(this.drag.element, this.drop.element.nextElementSibling);
                this.drop.index = i - 1;
              } else {
                this.parent.insertBefore(this.drag.element, this.drop.element);
                this.drop.index = i + 1;
              }
              this.drag.index = i;
              const dragRect = this.rectList[this.drag.index];
              const lastDragRect = this.rectList[this.drag.lastIndex];
              const dropRect = this.rectList[this.drop.index];
              const lastDropRect = this.rectList[this.drop.lastIndex];
              this.drag.lastIndex = i;
              this.drag.element.style.transition = "none";
              this.drop.element.style.transition = "none";
              this.drag.element.style.transform = `translate3d(${
                lastDragRect.left - dragRect.left
              } px,${lastDragRect.top - dragRect.top}px, 0)`;
              this.drop.element.style.transform = `translate3d(${
                lastDropRect.left - dropRect.left
              } px,${lastDropRect.top - dropRect.top}px, 0)`;
              console.log(this.drag.element.offsetLeft); // 触发重绘
              this.drag.element.style.transition = "transform 150ms";
              this.drop.element.style.transition = "transform 150ms";
              this.drag.element.style.transform = "translate3d(0px, 0px, 0px)";
              this.drop.element.style.transform = "translate3d(0px, 0px, 0px)";
            }
            break;
          }
        }
      }
    },
    handlePointerup() {
      if (this.isPointerdown) {
        this.isPointerdown = false;
        this.drag.element.classList.remove("active");
        this.clone.element.remove();
      }
    },
    handlePointercancel() {
      if (this.isPointerdown) {
        this.isPointerdown = false;
        this.drag.element.classList.remove("active");
        this.clone.element.remove();
      }
    },
    bindEventListener() {
      this.handlePointerdown = this.handlePointerdown.bind(this);
      this.handlePointermove = this.handlePointermove.bind(this);
      this.handlePointerup = this.handlePointerup.bind(this);
      this.handlePointercancel = this.handlePointercancel.bind(this);
      this.getRect = this.getRect.bind(this);
      this.parent.addEventListener("pointerdown", this.handlePointerdown);
      this.parent.addEventListener("pointermove", this.handlePointermove);
      this.parent.addEventListener("pointerup", this.handlePointerup);
      this.parent.addEventListener("pointercancel", this.handlePointercancel);
      window.addEventListener("scroll", this.getRect);
      window.addEventListener("resize", this.getRect);
      window.addEventListener("orientationchange", this.getRect);
    },
    unbindEventListener() {
      this.parent.removeEventListener("pointerdown", this.handlePointerdown);
      this.parent.removeEventListener("pointermove", this.handlePointermove);
      this.parent.removeEventListener("pointerup", this.handlePointerup);
      this.parent.removeEventListener("pointercancel", this.handlePointercancel);
      window.removeEventListener("scroll", this.getRect);
      window.removeEventListener("resize", this.getRect);
      window.removeEventListener("orientationchange", this.getRect);
    },
    // mouseDown(e) {
    //   this.clickTimeId = setTimeout(() => {
    //     this.clickable = false;
    //   }, 200);
    //   this.isMouseDown = true;
    //   this.startPos.x = e.clientX;
    //   this.startPos.y = e.clientY;
    //   this.target = e.currentTarget;
    //   this.targetClientRect = e.target.getBoundingClientRect();
    //   this.targetIndex = Number(e.currentTarget.dataset.id);
    //   this.target.style.transition = "none";
    //   this.target.style.zIndex = 10;
    //   // console.log("mouseDown", e);
    // },
    // mouseUp() {
    //   clearTimeout(this.clickTimeId);
    //   this.isMouseDown = false;
    //   this.isMouseUp = true;
    //   this.target.style.transition = "all 0.2s ease-in-out";
    //   this.target.style.zIndex = 0;
    //   // console.log("mouseUp", e);
    //   // const targetPos = this.target.getBoundingClientRect();
    //   // let x = targetPos.x - this.targetClientRect.x;
    //   // let y = targetPos.y - this.targetClientRect.y;
    //   // console.log(targetPos.x, this.targetClientRect.x);
    //   // console.log(targetPos.y, this.targetClientRect.y);
    //   // console.log(this.targetClientRect.width, x, y);
    //   // if (targetPos.right < this.boxSize.left) {
    //   //   x = x - targetPos.left + this.boxSize.left + 16;
    //   // }
    //   // if (targetPos.left + 16 > this.boxSize.right) {
    //   //   x = x - targetPos.left + this.boxSize.right - this.targetClientRect.width - 16;
    //   //   // y += this.targetClientRect.width + 8;
    //   // }
    //   // // console.log(targetPos.right, this.boxSize.left);
    //   // // console.log(x, y);
    //   // if (targetPos.bottom < this.boxSize.top) {
    //   //   y = y - targetPos.top + this.boxSize.top + 16;
    //   // }
    //   // if (targetPos.top > this.boxSize.bottom) {
    //   //   y = y - targetPos.top + this.boxSize.right - this.targetClientRect.width - 16;
    //   // }
    //   // // console.log("mouseMove", e, index);
    //   // this.target.style.transform = `translate(${x}px,${y}px)`;
    //   // x = 0;
    //   // y = 0;
    // },
    // mouseMove(e) {
    //   if (this.isMouseDown) {
    //     this.isMouseMove = true;
    //     this.movePos.x = e.clientX - this.startPos.x;
    //     this.movePos.y = e.clientY - this.startPos.y;
    //     this.target.style.transform = `translate(${this.movePos.x}px,${this.movePos.y}px)`;
    //   }
    // },
    // resize() {
    //   this.boxSize = this.$refs.items.getBoundingClientRect();
    //   console.log(this.boxSize.left);
    //   console.log(this.boxSize.right);
    //   console.log(this.boxSize.top);
    //   console.log(this.boxSize.bottom);
    //   // console.log(e);
    // },
  },
};
</script>

<style scoped lang="scss">
// .container {
//   color: rgb(44, 62, 80);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   margin: 2rem;
//   border-radius: 6px;
//   box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.3);
// }

// .items {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   padding: 1rem;
//   .item {
//     width: 100px;
//     height: 100px;
//     display: grid;
//     place-items: center;
//     color: azure;
//     user-select: none;
//     position: relative;
//   }
// }
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px -15px 0;
  touch-action: none;
  user-select: none;
}

.grid-item {
  width: 90px;
  height: 90px;
  line-height: 88px;
  text-align: center;
  margin: 0 15px 15px 0;
  background: #fff;
  border: 1px solid #d6d6d6;
  list-style: none;
}

.active {
  background: #c8ebfb;
}

.clone-grid-item {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 90px;
  height: 90px;
  line-height: 88px;
  text-align: center;
  background: #fff;
  border: 1px solid #d6d6d6;
  opacity: 0.8;
  list-style: none;
}
</style>
