<template>
	<el-table :data="data" style="width: 100%">
		<template v-if='extendOptions && extendOptions.length'>
			<el-table-column v-for='item in extendOptions' :key='item.type' :type='item.type' :label='item.label'>
				<template #default='scope' v-if="item.type==='expand'">
					<slot name="expand" :scope='scope'></slot>
				</template>
				<template #default='scope' v-if="item.type==='index'">
					<span v-if="item.indexMethod">
						{{item.indexMethod(scope.$index + 1)}}
					</span>
					 <span v-else>{scope.1index + 1}</span>
				</template>
			</el-table-column>
		</template>
		<el-table-column v-for='item in options.slice(0, options.length - 1)' :key='item.prop' :prop="item.prop" :label="item.label"
		 :align='item.align'>
			<template #default='scope'>
				<template v-if="!item.slot">
					{{scope.row[item.prop]}}
				</template>
				<template v-else>
					<slot :name="item.slot" :scope='scope'></slot>
				</template>
			</template>
		</el-table-column>
		<el-table-column :label='options[options.length - 1].label' :align='options[options.length - 1].align'>
			<template #default='scope'>
				<slot name="action" :scope='scope'></slot>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts">
	import {
		defineComponent,
		reactive,
		toRefs
	} from 'vue'
	export default defineComponent({
		name: 'Ai-Table',
		props: {
			options: {
				type: Array,
				required: true
			},
			data: {
				type: Array,
				required: true
			},
			// 扩展属性 展开行 序列行
			extendOptions: {
				type: Array
			}
		},
		setup() {
			let data = reactive < any > ({

			})
			return {
				...toRefs(data)
			}
		}
	})
</script>

<style>
</style>
