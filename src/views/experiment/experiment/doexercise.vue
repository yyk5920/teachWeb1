<template>
  <div class="dndList">
    <div :style="{ width: width1 }" class="dndList-list">
      <h3>{{ missionTitle }}</h3>
      <div class="dragArea">
        <div v-for="(element, index) in missionlist" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">{{ element.module_id }}：{{ element.title }}</div>
          <div style="position:absolute;right:0px;">
            <span
              v-if="element.exe_score === 10"
              style="float: right;margin-top: -20px;margin-right:5px;"
              @click="getExercise(element)"
            >
              <i style="color:#ff4949" class="el-icon-check" />
            </span>
            <span
              v-else
              style="float: right;margin-top: -20px;margin-right:5px;"
              @click="getExercise(element)"
            >
              <i style="color:#ff4949" class="el-icon-edit-outline" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div :style="{ width: width2 }" class="dndList-list">
         <div  class="wappers">
         <h5 style="text-align: right">ps:黑色必做，灰色选做，必做完成才可做最后一题(21必做)</h5>
         <h5 style="text-align: right">必做完成为红色，选做完成为绿色</h5>
<ul class="steps">
      <li
       v-for="(element, index) in missionlist" :key="element.id"
        :class="{'active':Steps===index}">
      <div v-if="[2,4,6,8,12,14,16,17,18,19,20].includes(element.module_id)&&element.exe_score!==10" style="color: black;font-weight:1000">{{ element.title }}
        </div>
        <div v-else-if="[1,3,5,7,9,10,11,13,15].includes(element.module_id)&&element.exe_score!==10" style="color: gray">{{ element.title }}</div>
      <div v-else-if ="[2,4,6,8,12,14,16,17,18,19,20].includes(element.module_id)&&element.exe_score===10" style="color: red;font-weight:1000">{{ element.title }}</div>
      <div v-else-if="[21].includes(element.module_id)&&element.exe_score!==10" style="color: white;font-weight:1000"></div>
      <div v-else-if="[21].includes(element.module_id)&&element.exe_score===10" style="color: blue;font-weight:1000"></div>
      <div v-else style="color: green">{{ element.title }}</div>
      </li>
    </ul>
            </div>
      <div class="dragArea" style="padding-left:30px">
         
        <div class="showExercise" v-if="mainpage">
          <h2>MIPS微处理器</h2>
          <h4>本次实验需要完成的题目：1-21</h4>
         
        </div>
        
        <div class="showExercise" v-else>    
          <h3>{{ exerciseTitle }}</h3>
          <div id="instructions" >
            <instructions  :instructions="info" :imga="imga" ></instructions>
          </div>
          <div id="codewrapper">
            <h4>代码：</h4>
            <code-mirror :codeClear="clear" @submitCode="submitCode" :codeModel="codeModel"></code-mirror>
          </div>
          <div id="result" v-if="showResult">
            <h4>coding result</h4>
            <result :result="result" :compileSuccess="compileSuccess" :compile_info="compile_info" :compare_error="compare_error"></result> 
           </div>
         <div class="wapper" v-if="showSignal">
           <div class="demo-image__placeholder">
           <div class="block" v-viewer>
           <span class="demonstration">正确波形</span>
           <el-image style="width:400%" :src="encodeURI(imgUrl+corWave)"
             :preview-src="encodeURI(imgUrl+corWave)" >
           <div slot="placeholder" class="image-slot">
           加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</div>
   <div class="demo-image__placeholder">
           <div class="block" v-viewer>
           <span class="demonstration">你的波形</span>
           <el-image  style="width:400%" :src="encodeURI(imgUrl+stuAllWave)"
           :preview-src="encodeURI(imgUrl+stuAllWave)">
           <div slot="placeholder" class="image-slot">
           加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
</div>
</div>     
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { fetchExercise } from "@/api/exercise_s";
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
      compileSuccess: true,
      result: "",
      Steps:null,
      imgUrl:'https://svg.wavedrom.com/',
      text:[],
      info: "",
      img_path: "",
      exerciseTitle: "",
      curruentModuleId: "",
      filterText: "",
      mainpage: true,
      
      show: false,
      init: "",
      input: "",
      output: "",
      
      clear: false,
      compile_info: [],
      compare_error: [],
      error_index: [],
      codeModel: "`timescale 1ns/100ps\nmodule ",
      corWave: [],
      stuWave: [],
      showResult: false,
      showSignal:false,
      stuAllWave: [],
      corAllWave: [],
      imga:"",
     
    }; 
  }, 
  methods: {
    getExercise(ele) {
      this.active=ele.module_id;
      this.curruentModuleId = ele.module_id;
      this.info = "";
      this.input = "";
      this.output = "";
      this.img_path = ele.module_id;
      this.result = "";
      this.error = [];
      this.compare_error = [];
      this.compile_info = [];
      this.error_index = [];
      this.mainpage = false;
      this.codeModel = "`timescale 1ns/100ps\nmodule ";
      this.show = true;
      this.exerciseTitle = ele.title;
      this.clear = !this.clear;
      this.showResult = false;
      this.showSignal=false;
      this.data=[];
       this.imga=ele.title+".png";
      fetchExercise({
        module_id: ele.module_id,
       
      }).then((response) => {
        this.info = response.data.info;
        var moduleName = response.data.module_name;
        console.log(response)
        console.log("moduleName:", moduleName);
         console.log(ele.module_id);
         this.Steps=ele.module_id-1;
        this.codeModel = response.data.io;
        console.log(this.codeModel)
        this.input = response.data.input;
        this.output = response.data.output;
        this.mainpage = false;
      });
    },
    submitCode(code) {
      var content = code;
      
      var query = {
        assignment_id: "1",
        module_id: "" + this.curruentModuleId,
        studentId: this.id,
        content: code.code,
      };
      console.log(query)
      commitExercise(query).then((res) => {
        console.log(res.data)
        this.compare_error = [];
        this.compile_info = [];
        this.error_index = [];
        this.result = true;
        const compile_info = res.data.compile_info; // 编译不通过报错
        // const compare_error = res.data.errorData; // 编译通过，结果不正确报错
        const score = res.data.score; // 分数
        const status = res.data.commit_status; //提交结果
        console.log(status);
        if (status === 0) {
          
          // 提交失败
          if (compile_info === null) {
            this.showResult = true;
            this.showSignal = true;
            this.compileSuccess = false;
            this.result = "程序编译无错误，波形出错！";
             this.corWave= res.data.corWaveData; 
             this.stuAllWave = res.data.stuWaveData;
             this.text = this.corWave;
          }
          
          else
          {
            // 编译不通过
             this.showResult = true;
             this.showSignal = false;
            this.compileSuccess = false;
            this.result = "程序编译出错！";
            const index = compile_info.indexOf(".v:");
            const arr_compile_info = compile_info
              .split("\n")
              .filter((i) => i && i.trim())
              .map((item) => {
                return item.substr(index);
              })
              .filter((i) => i && i.trim());
            console.log("arr_compile_info:", arr_compile_info);
            this.compile_info = arr_compile_info;
          }  
          }
        
        else {
           this.showResult = true;
           this.showSignal = true;
          this.result = "成功啦！";
          this.compileSuccess = true;
           this.corWave= res.data.corWaveData;
           this.stuAllWave = res.data.stuWaveData;
           this.text = this.corWave;
        }
   this.$emit("dohomework");
        console.log("提交成功");
         console.log(this.text);
      });        
   console.log(this.text);
      console.log(this.compileSuccess);
      
    },
  },

  computed: {
    ...mapState("user", ["id"]),
  },
  beforeDestroy() {
    console.log("页面刷新");
  },
}
</script>

<style lang="scss" scoped>

.steps {
  position: relative;
  // margin-bottom: px;
  counter-reset: step;  /*创建步骤数字计数器*/
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
  counter-increment: step;  /*计数器值递增*/
  width: 30px;
  height: 30px;
  background-color:	#dcdcdc;
  line-height: 30px;
  border-radius: 30px;
  font-size: 25px;
  color: #fff;
  text-align: center;
  // font-weight: 50px;
  margin: 15px auto 8px auto;
}
 .steps li.active:before{
    background-color: black;
 }

.wappers {
width:900px;
height:200px;
border:1px ;

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
  height: 400px;
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
