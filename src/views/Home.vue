<template>
	<!-- <ai-form :options="options">
    <template #action="scope">
      <el-button type="primary" @click="reset(scope)">重置</el-button>
      <el-button type="primary" @click="login(scope)">登录</el-button>
    </template>
  </ai-form> -->
	<!-- <ai-table :data='tableData' :options='tableOptions' :extendOptions='extendOptions'>
		<template #name='scope'>
			<el-tag>{{scope.scope.row.name}}</el-tag>
		</template>
		<template #expand='scope'>
			<el-tag>{{scope.scope.row.name}}</el-tag>
		</template>
		<template #action='scope'>
			<el-button type='primary' @click='edit(scope.scope)'>编辑</el-button>
			<el-button type='danger'>删除</el-button>
		</template>
	</ai-table>
	{{x}} --- {{y}} -->
	<div style="height: 800px;">
		<div class="box" ref='box'>
			<el-button @click='show=true'>open</el-button>
			<div v-if="show">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent,
		ref,
		watch
	} from "vue";
	import {
		OptionsItem
	} from "@/types";
	import AiForm from "@/components/aiForm/AiForm.vue";
	import AiTable from "@/components/aiTable/AiTable.vue";
	import {
		ElMessage
	} from "element-plus";
	import {useMousePage} from '@/hooks/useMousePage'
	import {useClickOutSide} from '@/hooks/useClickOutSide'

	export default defineComponent({
		name: "Home",
		components: {
			AiForm,
			AiTable
		},
		setup() {
			let show = ref<boolean>(false)
			let box = ref<HTMLDivElement | null>(null)
			let {isOutSide} = useClickOutSide(box)
			let {x, y} = useMousePage()
			watch(() => isOutSide.value, () => {
				if (show.value && isOutSide.value) {
					show.value = false
				}
			})
			let tableOptions = ref<any>([
				{
					prop: 'date',
					label: '日期',
					align: 'center',
					width: 180,
					isEdit: true
				},
				{
					prop: 'name',
					label: '姓名',
					align: 'center',
					slot: 'name'
				},
				{
					prop: 'address',
					label: '地址',
					align: 'center'
				},
				{
					label: '操作',
					align: 'center'
				}
			])
			let extendOptions = ref<any>([
				{
					type: 'expand'
				},
				{
					type: 'index',
					label: '#',
					 indexMethod(index: number) {
					        return index * 2;
					      }
				}
			])
			let tableData = ref < any > ([{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}])
			let options = ref < OptionsItem[] > ([{
					type: "input",
					label: "用户名",
					prop: "username",
					value: "",
					placeholder: "请输入用户名",
					rules: [{
						required: true,
						message: "用户名不能为空",
						trigger: "blur",
					}, ],
				},
				{
					type: "input",
					label: "密码",
					prop: "password",
					value: "",
					placeholder: "请输入密码",
					rules: [{
						required: true,
						message: "密码不能为空",
						trigger: "blur",
					}, ],
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
					rules: [{
						required: true,
						message: "职位不能为空",
						trigger: "blur",
					}, ],
					children: [{
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
					rules: [{
						required: true,
						message: "时间不能为空",
						trigger: "blur",
					}, ],
				},
			]);
			let reset = (scope: any) => {
				scope.form.resetFields()
				console.log(scope)
			}
			let login = (scope: any) => {
				scope.form.validate((valid: boolean) => {
					if (valid) {
						ElMessage.success("登录成功");
					} else {
						ElMessage.error("表单填写有误,请检查");
					}
				})
				console.log(scope)
			}
			let edit = (scope: any) => {
				console.log(scope)
			}
			return {
				options,
				reset,
				login,
				tableData,
				tableOptions,
				edit,
				extendOptions,
				x,
				y,
				show,
				box
			};
		},
	});
</script>

<style scoped>
	.box {
		height: 130px;
		border: 1px solid red;
	}
</style>
