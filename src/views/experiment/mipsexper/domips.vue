<template>
  <div class="dndList">
    <div :style="{ width: width1 }" class="dndList-list">
      <h3>{{ missionTitle }}</h3>
      <div class="dragArea">
        <div
          v-for="(element, index) in missionlist"
          :key="element.id"
          class="list-complete-item"
        >
          <div class="list-complete-item-handle">{{ element.questionId }}</div>
          <div style="position: absolute; right: 0px">
            <span
              v-if="element.exe_score === 10"
              style="float: right; margin-top: -20px; margin-right: 5px"
              @click="getExercise(element)"
            >
              <i style="color: #ff4949" class="el-icon-check" />
            </span>
            <span
              v-else
              style="float: right; margin-top: -20px; margin-right: 5px"
              @click="getExercise(element)"
            >
              <i style="color: #ff4949" class="el-icon-edit-outline" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div :style="{ width: width2 }" class="dndList-list">
      <div class="wappers">
        <h5 style="text-align: right">ps:黑色必做，灰色选做</h5>
        <h5 style="text-align: right">必做完成为红色，选做完成为绿色</h5>
        <ul class="steps">
          <li
            v-for="(element, index) in missionlist"
            :key="element.id"
            :class="{ active: Steps === index }"
          >
            <div
              v-if="
                [2, 4, 6, 8, 12, 14, 16, 17, 18, 19, 20].includes(
                  element.module_id
                ) && element.exe_score !== 10
              "
              style="color: black; font-weight: 1000"
            >
              {{ element.title }}
            </div>
            <div
              v-else-if="
                [1, 3, 5, 7, 9, 10, 11, 13, 15].includes(element.module_id) &&
                element.exe_score !== 10
              "
              style="color: gray"
            >
              {{ element.title }}
            </div>
            <div
              v-else-if="
                [2, 4, 6, 8, 12, 14, 16, 17, 18, 19, 20].includes(
                  element.module_id
                ) && element.exe_score === 10
              "
              style="color: red; font-weight: 1000"
            >
              {{ element.title }}
            </div>
            <div
              v-else-if="
                [21].includes(element.module_id) && element.exe_score !== 10
              "
              style="color: white; font-weight: 1000"
            ></div>
            <div
              v-else-if="
                [21].includes(element.module_id) && element.exe_score === 10
              "
              style="color: blue; font-weight: 1000"
            ></div>
            <div v-else style="color: green">{{ element.title }}</div>
          </li>
        </ul>
      </div>
      <div class="dragArea" style="padding-left: 30px">
        <div class="showExercise" v-if="mainpage">
          <h2>MIPS编程</h2>
          <h4>本次实验需要完成的题目：1-?</h4>
        </div>

        <div class="showExercise" v-else>
          <h3>{{ exerciseTitle }}</h3>
          <div id="instructions">
            <instructions :instructions="info"></instructions>
          </div>
          <div id="codewrapper">
            <h4>代码：</h4>
            <code-mirror
              :codeClear="clear"
              @submitCode="submitCode"
              :codeModel="codeModel"
            ></code-mirror>
          </div>
          <div id="result" v-if="showResult">
            <h4>coding result</h4>
            <result :result="result" :compileSuccess="compileSuccess"></result>
          </div>
          <div class="wapper" v-if="showSignal">
            <el-card class="box-card">
              <span>期望的正确内存值：</span>
              <div>
                {{ rightmem }}
              </div>
              <span  >期望的正确寄存器值：</span>
              <div>
                {{ rightreg }}
              </div>
            </el-card>
              <el-card class="box-card" style="margin-top:30px">
              <span>你回答的内存值：</span>
              <div>
                {{ yoursmem }}
              </div>
              <span></span>
              <span></span>
              <span></span>
              <span >你回答的寄存器值：</span>
              <div>
                {{ yoursreg }}
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mipsview } from "@/api/mips";

import { mipstext } from "@/api/mips";
import { mipstitle } from "@/api/mips";
import "codemirror/theme/neat.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/verilog/verilog"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import CodeMirror from "@/components/Exercise/editor.vue";
import Result from "@/components/Exercise/result.vue";
import Io from "@/components/Exercise/io.vue";
import Init from "@/components/Exercise/init.vue";
import Instructions from "@/components/Exercise/instructions.vue";
import { commitExercise } from "@/api/exercise_s";
import { mapState } from "vuex";
export default {
  name: "DndList",
  props: {
    missionlist: {
      type: Array,
      default() {
        return [];
      },
    },
    missionTitle: {
      type: String,
      default: "",
    },
    dohomework: {
      type: Function,
      default() {
        return () => {};
      },
    },
    width1: {
      type: String,
      default: "30%",
    },
    width2: {
      type: String,
      default: "65%",
    },
  },
  components: {
    CodeMirror,
    Result,
    Io,
    Init,
    Instructions,
  },
  data() {
    return {
      questionId: "",
      Steps: null,
      info: "",
      exerciseTitle: "",
      mainpage: true,
      show: false,
      clear: false,
      codeModel: "",
      compileSuccess: "",
      result: "",
      showResult: false,
      showSignal: false,
      rightreg: "",
      rightmem: "",
      yoursreg: "",
      yoursmem: "",
    };
  },
  methods: {
    getExercise(ele) {
      this.mainpage = false;
      console.log(document.cookie);
      this.showResult = false;
      (this.showSignal = false), (this.show = true);
      this.result = "";
      //  this.exerciseTitle = ele.title;
      this.questionId = ele.questionId;
      this.info = "";
      this.codeModel = "`timescale 1ns/100ps\nmodule ";
      mipsview({}).then((response) => {
        console.log(response);
        this.exerciseTitle = response.data[this.questionId - 1].title;
        this.info = response.data[this.questionId - 1].mipsdes;
        this.Steps = ele.module_id - 1;
        this.codeModel = response.data[this.questionId - 1].mipstext;
        console.log(this.codeModel);
        // this.mainpage = false;
      });
    },
    submitCode(code) {
      console.log(document.cookie);
      var strCookie = document.cookie;
      var arrCookie = strCookie.split(";");
      var arr = arrCookie[0].split("=");
      // var content = code;
      this.rightreg="";
      this.rightmem="";
      this.yoursmem="";
      this.yoursreg="";
      var query = {
        // assignment_id: "1",
        // module_id: "" + this.curruentModuleId,
        // studentId: this.id,
        // content: code.code,
        studentId: "" + arr[1],
        questionId: "" + this.questionId,
        content: "" + code.code,
      };
      console.log(code.code);
      mipstext(query).then((res) => {
        console.log(res);
        if (res.correct == true) {
          this.showResult = true;
          this.compileSuccess = true;
          this.result = res.info;
          this.showSignal = false;
        } else {
          this.showResult = true;
          this.compileSuccess = false;
          this.result = res.info;
          this.showSignal = true;
          if (res.targetMem.length !== 0) {
            for (var i = 0; i < res.targetMem.length; i++) {
              this.rightmem += JSON.stringify(res.targetMem[i]);
            }
          } else {
            this.rightmem = "无期望内存值";
          }
          if (res.targetReg.length !== 0) {
            for (var i = 0; i < res.targetReg.length; i++) {
              this.rightreg += JSON.stringify(res.targetReg[i]);
            }
          } else {
            this.rightreg = "无期望寄存器值";
          }
          if (res.mem.length !== 0) {
            for (var i = 0; i < res.mem.length; i++) {
              this.yoursmem += JSON.stringify(res.mem[i]);
            }
          } else {
            this.yoursmem = "无回答内存值";
          }
          if (res.reg.length !== 0) {
            for (var i = 0; i < res.reg.length; i++) {
              this.yoursreg += JSON.stringify(res.reg[i]);
            }
          } else {
            this.yoursreg = "无回答寄存器值";
          }
        }
        console.log(this.right);
      });
    },
  },

  computed: {
    ...mapState("user", ["id"]),
  },
  beforeDestroy() {
    console.log("页面刷新");
  },
};
</script>

<style lang="scss" scoped>
.steps {
  position: relative;
  // margin-bottom: px;
  counter-reset: step; /*创建步骤数字计数器*/
}
/*步骤描述*/
.steps li {
  list-style-type: none;
  font-size: 5px;
  text-align: center;
  width: 5%;
  position: relative;
  float: left;
}

/*步骤数字*/
.steps li:before {
  display: block;
  content: counter(step); /*设定计数器内容*/
  counter-increment: step; /*计数器值递增*/
  width: 30px;
  height: 30px;
  background-color: #dcdcdc;
  line-height: 30px;
  border-radius: 30px;
  font-size: 25px;
  color: #fff;
  text-align: center;
  // font-weight: 50px;
  margin: 15px auto 8px auto;
}
.steps li.active:before {
  background-color: black;
}

.wappers {
  width: 900px;
  height: 200px;
  border: 1px;
}

.wapper {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  background-color: white;
  border: 1px #999 solid;
  color: #bbc0c7;
  overflow: scroll;
  padding: 2ex 1em;
  height: 300px;
}
.CodeMirror {
  height: auto;
  font-family: "Roboto Mono", monospace;
  font-size: 81.25%;
}
.CodeMirror-scroll {
  min-height: 180px;
}
#code {
  background-color: #f4f8ff;
  padding: 1ex 1em;
  border: 1px #999 solid;
  margin: 10px 0px 10px 0px;
}
.dndList {
  background: #fff;
  padding-bottom: 40px;
  // width:1000px;

  &:after {
    content: "";
    display: table;
    clear: both;
  }

  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
