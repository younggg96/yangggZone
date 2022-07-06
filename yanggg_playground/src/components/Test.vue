<template>
  <div class="container">
    <div class="items">
      <div v-for="(item, index) in colors" :key="index">
        <div
          class="item"
          :data-id="index"
          :style="{ background: item.color }"
          @mousedown="mouseDown($event)"
          @mouseup="mouseUp($event)"
          @mousemove="mouseMove($event, index)"
        >
          {{ index }}
        </div>
      </div>
    </div>
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
      isMouseDown: false,
      isMouseUp: false,
      isMouseMove: false,
    };
  },
  methods: {
    mouseDown(e) {
      this.isMouseDown = true;
      console.log("mouseDown", e);
    },
    mouseUp(e) {
      this.isMouseUp = true;
      console.log("mouseUp", e);
    },
    mouseMove(e, index) {
      this.isMouseMove = true;
      console.log("mouseMove", e, index);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  color: rgb(44, 62, 80);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 2rem;
  border-radius: 6px;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.3);
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  .item {
    width: 100px;
    height: 100px;
    display: grid;
    place-items: center;
    color: azure;
    user-select: none;
  }
}
</style>
