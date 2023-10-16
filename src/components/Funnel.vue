<template>
  <div style="width: 500px">
    <ve-funnel :data="chartData" />
  </div>
</template>

<script>
import { VeFunnel } from "v-charts/lib/index.esm";
export default {
  name: "Funnel",
  components: {
    VeFunnel
  },
  data() {
    return {
      chartData: {
        columns: ["状态", "数值"],
        rows: [
          {
            状态: "展示",
            数值: 900
          },
          {
            状态: "访问",
            数值: 600
          },
          {
            状态: "点击",
            数值: 300
          },
          {
            状态: "订单",
            数值: 100
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
