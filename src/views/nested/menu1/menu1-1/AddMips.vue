<template>
  <div id="wrapper" style="text-align: center">
    <el-row :gutter="50">
      <el-col :span="14">
        <div id="left">
          <div id="expractice">
            <el-row :gutter="5">
              <el-col :span="8">
                <div id="question">
                    <el-input
                    v-model="title"
                    placeholder="请输入题目"
                    size="mini"
                    style="width: 125px"
                  ></el-input>

                  <span>&nbsp</span>

                  <span id="questionId">
                    <span id="labelId">id:</span>
                    <el-input-number
                      v-model="questionId"
                      controls-position="right"
                      @change="handleChange"
                      :min="1"
                      style="width: 80px"
                      size="mini"
                    ></el-input-number>
                  </span>
                  <div style="padding-top: 20px"></div>

                  <span>栈空间大小:</span>
                  <el-input-number
                    v-model="stacksize"
                    controls-position="right"
                    @change="handleChange"
                    :min="1"
                    style="width: 80px"
                    size="mini"
                  ></el-input-number>
                  <div style="padding-top: 10px"></div>
                  <el-input
                    v-model="stackcontent"
                    placeholder="请输入每个栈空间的值"
                  ></el-input>
                  <div style="padding-top: 26px"></div>

                  <div class="content">
                    <!-- <tiny-mcy></tiny-mcy> -->
                    <el-input
                      type="textarea"
                      :rows="11"
                      placeholder="请输入题目描述"
                      v-model="mipsdes"
                    ></el-input>
                  <div style="padding-top: 20px"></div>
                    <el-input
                      type="textarea"
                      :rows="10"
                      placeholder="请输入预置代码"
                      v-model="mipstext"
                    ></el-input>
                  </div>

                </div>
              </el-col>
              <el-col :span="13.5" style="padding-left: 20px">
                <elx-editable
                  ref="editable"
                  :data.sync="memeryData"
                  border
                  size="mini"
                  height="285px"
                  align="center"
                >
                  <elx-editable-column
                    prop="address"
                    label="初始化内存"
                    width="95"
                    align="center"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="value0"
                    label="Value(X=0)"
                    width="98"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="value4"
                    label="Value(X=4)"
                    width="98"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="value8"
                    label="Value(X=8)"
                    width="98"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="valuec"
                    label="Value(X=c)"
                    width="100"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                </elx-editable>

                <div style="padding-top: 20px"></div>
                <elx-editable
                  ref="editable"
                  :data.sync="memeryResult"
                  border
                  size="mini"
                  height="285px"
                  align="center"
                >
                  <elx-editable-column
                    prop="address"
                    label="期望内存"
                    width="95"
                    align="center"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="value0"
                    label="Value(X=0)"
                    width="98"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="value4"
                    label="Value(X=4)"
                    width="98"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="value8"
                    label="Value(X=8)"
                    width="98"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                  <elx-editable-column
                    prop="valuec"
                    label="Value(X=c)"
                    width="100"
                    align="center"
                    :edit-render="{ name: 'ElInput' }"
                  ></elx-editable-column>
                </elx-editable>
              </el-col>
            </el-row>
            <br class="clear" />
          </div>
        </div>
      </el-col>

      <el-col :span="5.5">
        <div id="right" style="folat: right">
          <elx-editable
            ref="editable"
            :data.sync="registerData"
            border
            size="mini"
            style="width: 217px"
            height="590px"
          >
            <elx-editable-column
              prop="name"
              label="初始化寄存器"
              width="100"
              align="center"
            ></elx-editable-column>
            <elx-editable-column
              prop="value"
              label="Value"
              width="100"
              align="center"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
          </elx-editable>
        </div>
      </el-col>
      <el-col :span="5.5">
        <div id="right" style="folat: right">
          <elx-editable
            ref="editable"
            :data.sync="registerResult"
            border
            size="mini"
            style="width: 217px"
            height="590px"
          >
            <elx-editable-column
              prop="name"
              label="期望寄存器"
              width="100"
              align="center"
            ></elx-editable-column>
            <elx-editable-column
              prop="value"
              label="Value"
              width="100"
              align="center"
              :edit-render="{ name: 'ElInput' }"
            ></elx-editable-column>
          </elx-editable>
        </div>
      </el-col>
    </el-row>
    <el-button @click="clear">重置</el-button>
    <el-button @click="postQuestion">提交</el-button>
  </div>
</template>

<script>
import { mipsadd } from "@/api/mips";
export default {
  data() {
    return {
      stacksize: "", //栈空间大小
      stackcontent: "", //栈空间值
      options: [
        {
          value: "选项1",
          label: "数据装载",
        },
        {
          value: "选项2",
          label: "语言转换",
        },
        {
          value: "选项3",
          label: "待定",
        },
      ], //题目类型选项
      questionId: "", // 题目id
      mipsdes: "", //题目描述信息
      mipstext:"",//老师预置代码
      title:"",//题目
      memeryData: [
        {
          address: "0x1001 0000",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0010",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0020",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0030",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0040",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0050",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0060",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0070",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
      ], //内存值初始化
      registerData: [
        {
          name: "$at",

          value: "",
        },
        {
          name: "$a0",

          value: "",
        },
        {
          name: "$a1",

          value: "",
        },
        {
          name: "$a2",

          value: "",
        },
        {
          name: "$a3",

          value: "",
        },
        {
          name: "$fp",

          value: "",
        },
        {
          name: "$k0",

          value: "",
        },
        {
          name: "$k1",

          value: "",
        },
        {
          name: "$gp",

          value: "",
        },
        {
          name: "$ra",

          value: "",
        },
        {
          name: "$sp",

          value: "",
        },

        {
          name: "$s0",

          value: "",
        },
        {
          name: "$s1",

          value: "",
        },
        {
          name: "$s2",

          value: "",
        },
        {
          name: "$s3",

          value: "",
        },
        {
          name: "$s4",

          value: "",
        },
        {
          name: "$s5",

          value: "",
        },
        {
          name: "$s6",

          value: "",
        },
        {
          name: "$s7",

          value: "",
        },
        {
          name: "$t0",

          value: "",
        },
        {
          name: "$t1",

          value: "",
        },
        {
          name: "$t2",

          value: "",
        },
        {
          name: "$t3",

          value: "",
        },
        {
          name: "$t4",

          value: "",
        },
        {
          name: "$t5",

          value: "",
        },
        {
          name: "$t6",

          value: "",
        },
        {
          name: "$t7",

          value: "",
        },

        {
          name: "$t8",

          value: "",
        },
        {
          name: "$t9",

          value: "",
        },
        {
          name: "$v0",

          value: "",
        },
        {
          name: "$v1",

          value: "",
        },
        {
          name: "$zero",

          value: "",
        },
      ], //寄存器值初始化
      memeryResult: [
       {
          address: "0x1001 0000",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0010",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0020",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0030",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0040",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0050",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0060",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0070",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        
        },
      ], //内存值期望
      registerResult: [
        {
          name: "$at",

          value: "",
        },
        {
          name: "$a0",

          value: "",
        },
        {
          name: "$a1",

          value: "",
        },
        {
          name: "$a2",

          value: "",
        },
        {
          name: "$a3",

          value: "",
        },
        {
          name: "$fp",

          value: "",
        },
        {
          name: "$k0",

          value: "",
        },
        {
          name: "$k1",

          value: "",
        },
        {
          name: "$gp",

          value: "",
        },
        {
          name: "$ra",

          value: "",
        },
        {
          name: "$sp",

          value: "",
        },

        {
          name: "$s0",

          value: "",
        },
        {
          name: "$s1",

          value: "",
        },
        {
          name: "$s2",

          value: "",
        },
        {
          name: "$s3",

          value: "",
        },
        {
          name: "$s4",

          value: "",
        },
        {
          name: "$s5",

          value: "",
        },
        {
          name: "$s6",

          value: "",
        },
        {
          name: "$s7",

          value: "",
        },
        {
          name: "$t0",

          value: "",
        },
        {
          name: "$t1",

          value: "",
        },
        {
          name: "$t2",

          value: "",
        },
        {
          name: "$t3",

          value: "",
        },
        {
          name: "$t4",

          value: "",
        },
        {
          name: "$t5",

          value: "",
        },
        {
          name: "$t6",

          value: "",
        },
        {
          name: "$t7",

          value: "",
        },

        {
          name: "$t8",

          value: "",
        },
        {
          name: "$t9",

          value: "",
        },
        {
          name: "$v0",

          value: "",
        },
        {
          name: "$v1",

          value: "",
        },
        {
          name: "$zero",

          value: "",
        },
      ], //寄存器值期望
    };
  },
  methods: {
    clear() {
      this.memeryData = [
       {
          address: "0x1001 0000",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0010",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0020",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0030",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0040",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0050",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0060",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0070",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
      ]; //清空内存
      this.registerData = [
        {
          name: "$at",

          value: "",
        },
        {
          name: "$a0",

          value: "",
        },
        {
          name: "$a1",

          value: "",
        },
        {
          name: "$a2",

          value: "",
        },
        {
          name: "$a3",

          value: "",
        },
        {
          name: "$fp",

          value: "",
        },
        {
          name: "$k0",

          value: "",
        },
        {
          name: "$k1",

          value: "",
        },
        {
          name: "$gp",

          value: "",
        },
        {
          name: "$ra",

          value: "",
        },
        {
          name: "$sp",

          value: "",
        },

        {
          name: "$s0",

          value: "",
        },
        {
          name: "$s1",

          value: "",
        },
        {
          name: "$s2",

          value: "",
        },
        {
          name: "$s3",

          value: "",
        },
        {
          name: "$s4",

          value: "",
        },
        {
          name: "$s5",

          value: "",
        },
        {
          name: "$s6",

          value: "",
        },
        {
          name: "$s7",

          value: "",
        },
        {
          name: "$t0",

          value: "",
        },
        {
          name: "$t1",

          value: "",
        },
        {
          name: "$t2",

          value: "",
        },
        {
          name: "$t3",

          value: "",
        },
        {
          name: "$t4",

          value: "",
        },
        {
          name: "$t5",

          value: "",
        },
        {
          name: "$t6",

          value: "",
        },
        {
          name: "$t7",

          value: "",
        },

        {
          name: "$t8",

          value: "",
        },
        {
          name: "$t9",

          value: "",
        },
        {
          name: "$v0",

          value: "",
        },
        {
          name: "$v1",

          value: "",
        },
        {
          name: "$zero",

          value: "",
        },
      ]; //清空寄存器
      this.memeryResult = [
       {
          address: "0x1001 0000",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0010",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0020",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0030",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0040",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0050",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0060",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
        {
          address: "0x1001 0070",
          v0: "0",
          v4: "4",
          v8: "8",
          vc: "c",
          value0: "",
          value4: "",
          value8: "",
          valuec: "",
        },
      ]; //清空内存
      this.registerResult = [
        {
          name: "$at",

          value: "",
        },
        {
          name: "$a0",

          value: "",
        },
        {
          name: "$a1",

          value: "",
        },
        {
          name: "$a2",

          value: "",
        },
        {
          name: "$a3",

          value: "",
        },
        {
          name: "$fp",

          value: "",
        },
        {
          name: "$k0",

          value: "",
        },
        {
          name: "$k1",

          value: "",
        },
        {
          name: "$gp",

          value: "",
        },
        {
          name: "$ra",

          value: "",
        },
        {
          name: "$sp",

          value: "",
        },

        {
          name: "$s0",

          value: "",
        },
        {
          name: "$s1",

          value: "",
        },
        {
          name: "$s2",

          value: "",
        },
        {
          name: "$s3",

          value: "",
        },
        {
          name: "$s4",

          value: "",
        },
        {
          name: "$s5",

          value: "",
        },
        {
          name: "$s6",

          value: "",
        },
        {
          name: "$s7",

          value: "",
        },
        {
          name: "$t0",

          value: "",
        },
        {
          name: "$t1",

          value: "",
        },
        {
          name: "$t2",

          value: "",
        },
        {
          name: "$t3",

          value: "",
        },
        {
          name: "$t4",

          value: "",
        },
        {
          name: "$t5",

          value: "",
        },
        {
          name: "$t6",

          value: "",
        },
        {
          name: "$t7",

          value: "",
        },

        {
          name: "$t8",

          value: "",
        },
        {
          name: "$t9",

          value: "",
        },
        {
          name: "$v0",

          value: "",
        },
        {
          name: "$v1",

          value: "",
        },
        {
          name: "$zero",

          value: "",
        },
      ]; //清空寄存器
      this.mipsdes = "";
      this.mipstext="";
      this.title="";
      this.stackcontent="";
      this.stacksize="";
      this.questionId="";

    },
    postQuestion() {
      var reg = [];
      var mem = [];
      var value = new Array(); //先声明一维
      for (var k = 0; k < 8; k++) {
        //一维长度为i,i为变量，可以根据实际情况改变
        value[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for (var w = 0; w < 4; w++) {
          //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
          value[k][w] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
      }

      for (var i = 0; i < 32; i++) {
        if (this.registerData[i].value !== "") {
          // console.log(this.registerData[i].name)
          var regname = this.registerData[i].name;
          var regvalue = this.registerData[i].value;
          var regx = {};
          regx[regname] = regvalue;
          reg.push(regx);
        }
      }
      console.log(reg);
      for (var j = 0; j < 8; j++) {
        value[j][0] = this.memeryData[j].value0;
        value[j][1] = this.memeryData[j].value4;
        value[j][2] = this.memeryData[j].value8;
        value[j][3] = this.memeryData[j].valuec;
      }

      for (var a = 0; a < 8; a++) {
        for (var b = 0; b < 4; b++) {
          if (value[a][b] !== "") {
            var memname = this.memeryData[a].address + this.memeryData[a].v0;
            var memvalue = value[a][b];
            var memx = {};
            memx[memname] = memvalue;
            mem.push(memx);
          }
        }
      }
      console.log(mem);
      var regr = [];
      var memr = [];
      var value = new Array(); //先声明一维
      for (var k = 0; k < 8; k++) {
        //一维长度为i,i为变量，可以根据实际情况改变
        value[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for (var w = 0; w < 4; w++) {
          //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
          value[k][w] = ""; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
        }
      }

      for (var i = 0; i < 32; i++) {
        if (this.registerResult[i].value !== "") {
          // console.log(this.registerData[i].name)
          var regname = this.registerResult[i].name;
          var regvalue = this.registerResult[i].value;
          var regxr = {};
          regxr[regname] = regvalue;
          regr.push(regxr);
        }
      }
      console.log(regr);
      for (var j = 0; j < 8; j++) {
        value[j][0] = this.memeryResult[j].value0;
        value[j][1] = this.memeryResult[j].value4;
        value[j][2] = this.memeryResult[j].value8;
        value[j][3] = this.memeryResult[j].valuec;
      }

      for (var a = 0; a < 8; a++) {
        for (var b = 0; b < 4; b++) {
          if (value[a][b] !== "") {
            var memname =
              this.memeryResult[a].address + this.memeryResult[a].v0;
            var memvalue = value[a][b];
            var memxr = {};
            memxr[memname] = memvalue;
            memr.push(memxr);
          }
        }
      }
      console.log(mem);

      var temp = this.stackcontent.split(/[\n\s+,，；;]/g);
      for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "") {
          // 删除数组中空值
          temp.splice(i, 1);
          i--;
        }
      }
      console.log(temp);

      var query = {
        questionId: "" + this.questionId,
        init: {
          reg,
          mem,
        },
        stack: {
          size: "" + this.stacksize,
          content: temp,
        },
        result: {
          regr,
          memr,
        },
        text:{
          mipsdes:""+this.mipsdes,
          mipstext:""+this.mipstext,
          title:""+this.title
        }
      };
      console.log(query);
      mipsadd(query).then((res) => {
        this.$message({
          message: res.info,
          type: "success",
        });
      });
    },
    handleChange(value) {
      console.log("questionId changed!");
    }, //记录题目id
  },
};
</script>
<style scoped>
/* //class是.  ，id是# */
#wrapper {
  position: relative;
}
#left {
  width: 100%;
  /* float: left; */
}
.content {
  width: 100%;
  height: 230px;
  border: 1px solid #f4f4f5;
  color: #909399;
  border-radius: 4px;
  background-color: white;
}
#expractice {
  width: 100%;
  /* background-color: aquamarine; */
  text-align: left;
}
#question {
  /* float: left; */
  width: 100%;
  padding: 10px;
}
#result {
  /* float: left; */
  width: 100%;
  padding: 10px;
}
.clear {
  clear: both;
}
</style>
