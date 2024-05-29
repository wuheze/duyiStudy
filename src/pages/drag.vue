<template>
  <div
    id="drag-div"
    class="unselectable"
    @dragstart="dragStart($event)"
    @dragover="dragOver($event)"
    @dragenter="dragEnter($event)"
    @dragleave="dragLeave($event)"
    @dragend="dragEnd($event)"
  >
    <div v-for="item in 10" class="oneSelf" :draggable="true">{{ item }}</div>
  </div>
</template>

<script>
import Filp from "../utils/Filp";
export default {
  name: "selection",
  data() {
    return {
      // draggin: false,
      // cloneEl: null,
      // initial: {}
      sourceNode: null,
      filp: null,
      list: null
    };
  },
  methods: {
    // dragging(e) {
    //   if (e.target.className !== "oneSelf" || this.cloneEl) return;
    //   console.log(e.target.className, "haha");
    //   // 克隆节点
    //   this.cloneEl = e.target.cloneNode(true);
    //   // 使其浮动
    //   this.cloneEl.classList.add("flutter");
    //   // 加入到列表中
    //   e.target.parentElement.appendChild(this.cloneEl);
    //   this.draggin = true;
    //   this.initial = {
    //     x: e.offsetX,
    //     y: e.offsetY,
    //     clientX: e.clientX,
    //     clientY: e.clientY
    //   };
    //   // 克隆节点和当前按下节点重叠
    //   this.cloneEl.style.left = this.initial.clientX - this.initial.x + "px";
    //   this.cloneEl.style.top = this.initial.clientY - this.initial.y + "px";
    //   // 当前按下节点隐藏
    //   e.target.className = "oneSelf hide";
    // }
    dragStart(e) {
      e.target.classList.add("moving");
      this.sourceNode = e.target;
      this.filp = new Filp(e.target.parentElement.children, 0.5);
      this.list = e.target.parentElement;
    },
    dragOver(e) {
      e.preventDefault();
      // console.log(e, "dragOver");
    },
    dragLeave(e) {
      console.log(e, "dragleave");
    },
    dragEnd(e) {
      this.sourceNode.classList.remove("moving");
      console.log(e, "dragEnd");
    },
    dragEnter(e) {
      console.log(e.target);
      e.preventDefault();
      // 判断拖拽元素进入的元素等于父元素list或等于拖拽元素本身，
      // 不做受任何处理，直接结束
      if (e.target === this.list || e.target === this.sourceNode) {
        return;
      }
      // 判断元素拖拽进入的位置是在目标的上面还是下面，
      // 比如拖动3进入到4时，4要移动到上面，
      // 当拖动3进入到2时，2要移动到下面，
      // 通过元素所处的下表既可判断。

      // 首先，拿到元素list所有的子元素
      const children = [...this.list.children];
      // 接着，拿到要拖拽元素在整个子元素里面的下标
      const sourceIndex = children.indexOf(this.sourceNode);
      // 然后，拿到要进入目标元素在整个子元素里面的下标
      const targetIndex = children.indexOf(e.target);
      console.log(sourceIndex, targetIndex, "sourceIndex, targetIndex");
      if (sourceIndex < targetIndex) {
        // 进入目标元素大于拖拽元素的下标，
        // 此时要插入目标元素的下方位置，
        // 也就是目标元素下一个元素的前面
        this.list.insertBefore(this.sourceNode, e.target.nextElementSibling);
      } else {
        // 进入目标元素小于拖拽元素的下标，
        // 此时要插入目标元素的上方位置，
        // 也就是目标元素前面的位置
        this.list.insertBefore(this.sourceNode, e.target);
      }
      this.filp.play();
    }
  },
  mounted() {
    // window.addEventListener("mousemove", e => {
    //   if (this.draggin && this.cloneEl) {
    //     // 克隆节点跟随鼠标移动
    //     this.cloneEl.style.left = e.clientX - this.initial.x + "px";
    //     this.cloneEl.style.top = e.clientY - this.initial.y + "px";
    //   }
    // });
    // window.addEventListener("mouseup", e => {
    //   if (this.draggin && this.cloneEl) {
    //     this.draggin = false;
    //     // 克隆节点复原 添加过渡动画
    //     this.cloneEl.classList.add("is_return");
    //     this.cloneEl.style.left = this.initial.clientX - this.initial.x + "px";
    //     this.cloneEl.style.top = this.initial.clientY - this.initial.y + "px";
    //     this.initial = {};
    //     setTimeout(() => {
    //       this.cloneEl.remove();
    //       this.cloneEl = null;
    //       // hide节点复原
    //       let dom = document.querySelector(".hide");
    //       if (dom) {
    //         dom.className = "oneSelf";
    //       }
    //     }, 300);
    //   }
    // });
  }
};
</script>

<style scoped>
#drag-div {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: 0 auto;
  border: 1px solid orangered;
  gap: 10px;
  padding: 10px;
  .oneSelf {
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid blue;
  }
  .oneSelf:hover {
    cursor: grab;
    //background: #8c939d;
  }
  .oneSelf:active {
    cursor: grabbing;
  }
}
.moving {
  background: transparent !important;
  color: transparent !important;
  border: 1px dashed #ccc !important;
}
.flutter {
  position: absolute;
  z-index: 9999;
  pointer-events: none;
}
.is_return {
  transition: all 0.3s;
}
#drag-div::after {
  content: "";
  flex: auto;
}
.hide {
  opacity: 0;
}
.unselectable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
