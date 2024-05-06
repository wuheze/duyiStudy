<template>
  <div>
    <!--    <el-radio v-model="str" label="SVN">SVN</el-radio>-->
    <!--    <el-radio v-model="str" label="GitLab">GitLab</el-radio>-->
    <!--    <el-radio v-model="str" label="File">File</el-radio>-->
    <!--    <el-radio v-model="str" label="SSH">SSH</el-radio>-->
    <!--    <el-select v-model="selectValue" placeholder="请选择">-->
    <!--      <el-option-->
    <!--        v-for="item in arr"-->
    <!--        :key="item.value"-->
    <!--        :label="item.label"-->
    <!--        :value="item.value"-->
    <!--      >-->
    <!--      </el-option>-->
    <!--    </el-select>-->
    <el-input
      v-model="input"
      placeholder="请输入内容"
      @blur="toChinese(input)"
    ></el-input>
    <div>输出值为：{{ inputResult }}</div>
  </div>
</template>

<script>
import { api } from "../api";
// import dayjs from 'dayjs';
export default {
  name: "SvgDemo",
  data() {
    return {
      str: "SVN",
      obj: {
        SVN: [
          {
            value: "选项1",
            label: "选项1"
          },
          {
            value: "选项2",
            label: "选项2"
          },
          {
            value: "选项3",
            label: "选项3"
          }
        ],
        GitLab: [
          {
            value: "选项4",
            label: "选项4"
          },
          {
            value: "选项5",
            label: "选项5"
          },
          {
            value: "选项6",
            label: "选项6"
          }
        ],
        File: [
          {
            value: "选项7",
            label: "选项7"
          },
          {
            value: "选项8",
            label: "选项8"
          },
          {
            value: "选项9",
            label: "选项9"
          }
        ],
        SSH: [
          {
            value: "选项10",
            label: "选项10"
          },
          {
            value: "选项11",
            label: "选项11"
          },
          {
            value: "选项12",
            label: "选项12"
          }
        ]
      },
      arr: [],
      selectValue: "",
      input: "",
      inputResult: ""
    };
  },
  watch: {
    str(val) {
      this.arr = this.obj[val];
      this.selectValue = this.arr[0].value;
    }
  },
  methods: {
    timeAgo(date, format = null) {
      const now = dayjs();
      const ago = dayjs.unix(date);
      const diff = now.diff(ago, "second");
      if (format) {
        return ago.format(format);
      }
      const units = [
        [60, "秒", 1],
        [60, "分钟", 60],
        [24, "小时", 3600],
        [7, "天", 86400],
        [30.44, "个月", 2592000], // Approximation for month length
        [12, "年", 31104000] // Approximation for year length
      ];
      for (const [interval, label, factor] of units) {
        if (diff < interval) {
          return Math.round(diff / factor) + label + "前";
        }
      }
      // If the difference is greater than a year, return formatted date
      return ago.format("YYYY-MM-DD");
    },
    // 3564变为叁仟伍佰陆拾肆元
    toChinese(num) {
      let strOutput = "";
      let strUnit = "仟佰拾亿仟佰拾万仟佰拾元角分";
      num += "00";
      let intPos = num.indexOf(".");
      if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
      }
      strUnit = strUnit.substr(strUnit.length - num.length);
      for (let i = 0; i < num.length; i++) {
        strOutput +=
          "零壹贰叁肆伍陆柒捌玖".substr(num.substr(i, 1), 1) +
          strUnit.substr(i, 1);
        console.log(strOutput);
      }
      this.inputResult = strOutput
        .replace(/零角零分$/, "整")
        .replace(/零[仟佰拾]/g, "零")
        .replace(/零{2,}/g, "零")
        .replace(/零([亿|万])/g, "$1")
        .replace(/零角/g, "零")
        .replace(/零元/g, "元")
        .replace(/零分/g, "");
    }
  },
  mounted() {
    this.arr = this.obj[this.str];
    this.selectValue = this.arr[0].value;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.svg {
  //width: 300px;
  display: flex;
  justify-content: space-evenly;
  //flex-wrap: wrap;
  height: 300px;
  border: 1px solid tomato;
  svg {
    border: 1px solid palegreen;
  }
}
</style>
