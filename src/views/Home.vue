<template>
  <div class="home">
    <!-- <z-form :options="options">
      <template #action="scope">
        <el-button type="primary" @click="reset(scope)">重置</el-button>
        <el-button type="primary" @click="check(scope)">登录</el-button>
      </template>
    </z-form> -->

    <z-table :data="tableData" :options="tableOptions" :extendOptions="extendOptions">
      <template #name="scope">
        <el-tag>{{ scope.scope.row.name }}</el-tag>
      </template>
      <template #expand="scope">
        <el-tag>{{ scope.scope.row.name }}</el-tag>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="edit(scope.scope)">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </z-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import zForm from "@/components/zForm/ZForm.vue";
import zTable from "@/components/zTable/ZTable.vue";
import { OptionsItem } from "@/types";
export default defineComponent({
  name: "Home",
  components: {
    zForm,
    zTable,
  },

  setup() {
    //表单
    let options = ref<OptionsItem[]>([
      {
        type: "input",
        label: "用户名",
        prop: "username",
        value: "",
        placeholder: "请输入用户名",
        rules: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
      },
      {
        type: "input",
        label: "密码",
        prop: "password",
        value: "",
        placeholder: "请输入密码",
        rules: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        attrs: {
          "show-password": true,
        },
      },
      {
        type: "select",
        label: "职位",
        prop: "role",
        value: "",
        placeholder: "请选择职位",
        rules: [
          {
            required: true,
            message: "职位不能为空",
            trigger: "blur",
          },
        ],
        children: [
          {
            type: "option",
            value: "1",
            label: "主管",
          },
          {
            type: "option",
            value: "2",
            label: "经理",
          },
          {
            type: "option",
            value: "3",
            label: "员工",
          },
        ],
      },
      {
        type: "date-picker",
        label: "用户名",
        prop: "date",
        value: "",
        placeholder: "请输入时间",
        rules: [
          {
            required: true,
            message: "时间不能为空",
            trigger: "blur",
          },
        ],
      },
      {
        type: "input-number",
        label: "计数",
        prop: "numbersum",
        value: "",
        attrs: {
          min: 1,
          max: 13,
        },
      },
    ]);
    let reset = (scope: any) => {
      scope.form.resetFields();
      console.log(scope);
    };
    let check = (scope: any) => {
      scope.form.validate((valid: boolean) => {
        if (valid) {
          ElMessage.success("数据正确");
        } else {
          ElMessage.error("表单填写有误,请检查");
        }
      });
      console.log(scope);
    };

    //表格

    let tableOptions = ref<any>([
      {
        prop: "date",
        label: "日期",
        align: "center",
        width: 180,
        isEdit: true,
      },
      {
        prop: "name",
        label: "姓名",
        align: "center",
        slot: "name",
      },
      {
        prop: "address",
        label: "地址",
        align: "center",
      },
      {
        label: "操作",
        align: "center",
      },
    ]);
    let extendOptions = ref<any>([
      {
        type: "expand",
      },
      {
        type: "index",
        label: "#",
        indexMethod(index: number) {
          return index * 2;
        },
      },
    ]);
    let tableData = ref<any>([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ]);

    let edit = (scope: any) => {
      console.log(scope);
    };
    return {
      options,
      reset,
      check,
      tableData,
      extendOptions,
      tableOptions,
      edit
    };
  },
});
</script>
