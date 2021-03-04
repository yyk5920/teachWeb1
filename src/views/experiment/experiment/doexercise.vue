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
      <!-- <div v-if="element.exe_score===10"><h5 style="color: red">{{ element.title }}</h5></div> -->
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
          <!-- <div id="title">
            <h4>{{ title }}</h4>
          </div> -->
          
       
          <div id="instructions" >
            <instructions  :instructions="info" :imga="imga" ></instructions>
          </div>
          <!-- <div id="init">
            <h4>初始化：</h4>
            <init :init="init"></init>
          </div>-->
          <!-- <div id="io">
            <h4>输入/输出：</h4>
            <io :input="input" :output="output"></io>
          </div> -->
          <div id="codewrapper">
            <h4>代码：</h4>
            <code-mirror :codeClear="clear" @submitCode="submitCode" :codeModel="codeModel"></code-mirror>
          </div>
          <div id="result" v-if="showResult">
            <h4>coding result</h4>
            <result :result="result" :compile_info="compile_info" :compare_error="compare_error"></result> 
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
import { codemirror } from "vue-codemirror";
import "codemirror/theme/neat.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/verilog/verilog"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import CodeMirror from "@/components/Exercise/editor.vue";
import Result from "@/components/Exercise/result.vue";
import Io from "@/components/Exercise/io.vue";
import Init from "@/components/Exercise/init.vue";
// import Tree from "@/components/Exercise/tree.vue";
import Instructions from "@/components/Exercise/instructions.vue";
// import {WaveDrom} from "@/components/Exercise/signalWave.vue"
import { commitExercise } from "@/api/exercise_s";
import { mapState } from "vuex";

// import tree from '@/index';
export default {
  name: "DndList",
 props: {
    // Steps:{
    //         type:Number,//数据类型
    //         default:null//默认值
    //     },//当前激活个数
    // data:{
    //     type:Array,
    //   default() {
    //     return [];
    //   }},  
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
      // items: [
      //   {
      //     num: '1',
      //     text: '数据存储器',
          
         
      //   },
      //   {
      //     num: '2',
      //     text: '数据存储器'
      //   },
      //   {
      //     num: '3',
      //     text: '数据存储器'
      //   },
      //   {
      //     num: '4',
      //     text: '指令存储器'
      //   },
      //   {
      //     num: '5',
      //     text: '指令存储器'
      //   },
      //   {
      //     num: '6',
      //     text: '寄存器文件'
      //   },
      //   {
      //     num: '7',
      //     text: '寄存器文件'
      //   },
      //   {
      //     num: '8',
      //     text: 'ALU'
      //   },
      //   {
      //     num: '9',
      //     text: '主控制器'
      //   },
      //   {
      //     num: '10',
      //     text: '脉冲主控制器'
      //   },
      //   {
      //     num: '11',
      //     text: 'ALU控制器'
      //   },
      //   {
      //     num: '12',
      //     text: '符号扩展'
      //   },
      //   {
      //     num: '13',
      //     text: '无符号扩展'
      //   },
      //   {
      //     num: '14',
      //     text: '2选1复用器'
      //   },
      //   {
      //     num: '15',
      //     text: '加法器'
      //   },{
      //     num: '16',
      //     text: '寄存器'
      //   },
      //   {
      //     num: '17',
      //     text: '位拼接器'
      //   },
      //   {
      //     num: '18',
      //     text: '左移运算器'
      //   },
      //   {
      //     num: '19',
      //     text: '控制器'
      //   },
      //   {
      //     num: '20',
      //     text: '3选1复用器'
      //   },
      //   {
      //     num: '21',
      //     text: 'MIPS微处理器'
      //   },

      // ],
      // index1:1,
      // index:null,
      // data:"",
      // isChild:"",
      Steps:null,
      imgUrl:'https://svg.wavedrom.com/',
      text:[],
      info: "",
      img_path: "",
      exerciseTitle: "",
      curruentModuleId: "",
      filterText: "",
      mainpage: true,
      compileSuccess: "",
      show: false,
      init: "",
      input: "",
      output: "",
      result: "",
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
      data:[] ,
      imga:"",
    }; 
  }, 
  methods: {
   
    isNotInList1(v) {
      return this.unfinishedlist.every((k) => v.id !== k.id);
    },
    isNotInList2(v) {
      return this.finishedlist.every((k) => v.id !== k.id);
    },
    deleteEle(ele) {
      for (const item of this.unfinishedlist) {
        if (item.id === ele.id) {
         
          const index = this.unfinishedlist.indexOf(item);
          console.log(index);
          this.unfinishedlist.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList2(ele)) {
        this.unfinishedlist.unshift(ele);
      }
    },
    pushEle(ele) {
      for (const item of this.finishedlist) {
        if (item.id === ele.id) {
          const index = this.finishedlist.indexOf(item);
          this.finishedlist.splice(index, 1);
          break;
        }
      }
      if (this.isNotInList1(ele)) {
        this.unfinishedlist.push(ele);
      }
    },
    setData(dataTransfer) {
      dataTransfer.setData("Text", "");
    },
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
        // this.imga=response.data.title+".png";
        console.log(this.imga)
        //  var abc = [response.list];
        //  var abc1= response.list1;
        // console.log(abc);
        // console.log(abc1);
        console.log(response)
        console.log("moduleName:", moduleName);
         console.log(ele.module_id);
        //  console.log(this.Steps)
         this.Steps=ele.module_id-1;
         console.log(this.Steps)
        //  this.index=ele.module_id-1;
        // console.log(this.items[0]);
        // this.index=ele.module_id-1;
        //  if(ele.exe_score === 10)
        //  {
        //     // this.items[ele.module_id-1].text:"rgb(76,142,218)";
        //     .steps li:before
        //  }
        //  else{
        //    this.color="red";
            
        //  }
         console.log(ele.title)
        this.codeModel = response.data.io;
        this.input = response.data.input;
        this.output = response.data.output;
        // var data1 = "{"+'"'+"name"+'"'+":"+'"'+"Mips微处理器设计"+'"'+","+"\r\n"+ '"'+"children"+'"'+": [{"+'"'+"name"+'"'+":"+'"'+"21.简单指令集MIPS微处理器(MIPSCPU)"+'"'+","+'"'+"left"+'"'+":"+"true,";
        // var data2="},";
        //   var data3="]}";
        //   var dataa=data1+data2+abc+data3;
        //   console.log(dataa)
        //   this.data=dataa]
      //    var dataa=[];  1394395445
      //    console.log(this.data)
        
      //    this.data=dataa.concat('["name":"Mips微处理器设计",'+'"children":['+'"name":"21.简单指令集MIPS微处理器(MIPSCPU)",'+'"left":"true"'+abc+"]]");
      // // console.log(dataa);
      console.log(this.data);
        this.mainpage = false;
      });
    },
    submitCode(code) {
      // this.info = "";
      var content = code;
      // console.log(typeof content);
      var query = {
        assignment_id: "1",
        module_id: "" + this.curruentModuleId,
        studentId: this.id,
        content: code.code,
      };
      commitExercise(query).then((res) => {
        this.compare_error = [];
        this.compile_info = [];
        // this.corWave = [];
        // this.stuAllWave = [];
        this.error_index = [];
        this.result = true;
        const compile_info = res.data.compile_info; // 编译不通过报错
        const compare_error = res.data.errorData; // 编译通过，结果不正确报错
        const score = res.data.score; // 分数
        const status = res.data.commit_status; //提交结果
        // this.showResult = true;
        // this.showSignal = true;
        console.log(status);
        if (status === 0) {
          // 提交失败
          if (compare_error === null) {
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
          // this.showResult = false;
          //  this.showSignal = false;
 
      });        
   console.log(this.text);
      console.log(this.compileSuccess);
      
    },
    // getStatus() {},
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
