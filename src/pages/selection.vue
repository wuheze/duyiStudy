<template>
  <div id="selection-div">
    <div id="content" contenteditable="true">
      这是一段测试文字这是一段测试文字这是一段测
      <div>我是div里面的 不知道可不剋</div>
      试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字
    </div>
    <div id="popUps" v-show="popShow" @mousedown.stop="popMouseDown">
      <el-button-group>
        <el-button type="primary" @click.stop="toStrong">
          <img src="../images/字体加粗.png" alt="" />
        </el-button>
        <el-button type="primary" @click.stop="toDeleteLine">
          <img src="../images/字体删除线.png" alt="" />
        </el-button>
        <el-button type="primary" @click.stop="toItalic">
          <img src="../images/字体斜体.png" alt="" />
        </el-button>
        <el-button type="primary" @click.stop="toUnderline">
          <img src="../images/字体下划线.png" alt="" />
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "selection",
  data() {
    return {
      range: "",
      popShow: false,
      selectionShow: false
    };
  },
  methods: {
    // 阻止冒泡
    popMouseDown() {
      return false;
    },
    // 选中文字加粗
    toStrong() {
      // let selection = document.getSelection();
      // let range = selection.getRangeAt(0);
      // let strong = document.createElement("b");
      // console.log(selection, selection.anchorNode.parentNode);
      // range.surroundContents(strong);
      document.execCommand("bold", false, null);
    },
    //选中文字删除线
    toDeleteLine() {
      document.execCommand("strikeThrough", false, null);
    },
    //选中文字斜体
    toItalic() {
      document.execCommand("italic", false, null);
    },
    //选中文字下划线
    toUnderline() {
      document.execCommand("underline", false, null);
    }
  },
  mounted() {
    let popDom = document.getElementById("popUps");
    const selection = document.getSelection();

    document.addEventListener("selectionchange", () => {
      //如果有字
      if (selection.toString()) {
        this.selectionShow = true;
        let popLeft = selection.getRangeAt(0).getBoundingClientRect().left + 5;
        let popTop =
          selection.getRangeAt(0).getBoundingClientRect().top +
          selection.getRangeAt(0).getBoundingClientRect().height +
          5;
        popDom.style.left = popLeft + "px";
        popDom.style.top = popTop + "px";
        return;
      }
      this.popShow = false;
      this.selectionShow = false;
    });

    //监听用户鼠标松开
    document.addEventListener("mouseup", () => {
      this.popShow = this.selectionShow;
    });
    //监听用户鼠标按下
    document.addEventListener("mousedown", () => {
      this.popShow = false;
    });
  }
};
</script>

<style scoped>
#selection-div {
  width: 45%;
  height: 300px;
  border: 2px solid tomato;
  margin: 0 auto;
  #content {
    height: 100%;
    outline: 1px solid transparent;
  }
  #popUps {
    position: absolute;
    //width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button-group {
      height: 40px;
    }
    .el-button {
      width: 50px;
      height: 40px;
      box-sizing: border-box;
      padding: 0;
    }
    img {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
