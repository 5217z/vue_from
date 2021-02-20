<template>
	<div class="el__form__left">
		<el-form :model="model" :rules="rules" ref="form" :label-width="labelWidth" :validate-on-rule-change='false'>
			<template v-for="(item, index) in options" :key="index">
				<el-form-item v-if="!item.children" :label='item.label' :prop='item.prop'>
					<component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop]" :placeholder='item.placeholder'></component>
				</el-form-item>
				<el-form-item v-if="item.children && item.children.length" :label='item.label' :prop='item.prop'>
					<component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop]"  :placeholder='item.placeholder'>
						<component v-for="(child, i) in item.children" :key="i" :is="`el-${child.type}`" :label="child.label" :value="child.value"></component>
					</component>
				</el-form-item>
			</template>
		
			<el-form-item>
				<slot name="action" :model='ruleForm' :form='form'></slot>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
	import {
		OptionsItem
	} from "@/types"
	import {
		defineComponent,
		reactive,
		toRefs,
		ref,
		onMounted,
		computed,
		watch
	} from "vue"
	import cloneDeep from 'lodash/cloneDeep'

	export default defineComponent({
		name: "Ai-Form",
		components: {},
		props: {
			options: {
				type: Array,
				required: true,
			},
			labelWidth: {
				type: String,
				default: '100px'
			}
		},
		setup(props) {
			let data = reactive < any > ({
				model: {},
				rules: {}
			})
			let form = ref < any > (null)
			let initForm = () => {
				let model: any = {}
				let rules: any = {}
				props.options.map((item: any) => {
					model[item.prop] = item.value
					rules[item.prop] = item.rules
				})
				data.model = cloneDeep(model)
				data.rules = cloneDeep(rules)
			}
			onMounted(() => {
				initForm()
			})
			watch(() => props.options, () => {
				initForm()
			})
			let ruleForm = computed(() => cloneDeep(data.model))
			return {
				...toRefs(data),
				form,
				ruleForm
			}
		},
	})
</script>

<style scoped lang="scss">
	
</style>