import {ref, onMounted, onUnmounted} from 'vue'

export const useMousePage = () => {
	let x = ref<number>(0)
	let y = ref<number>(0)
	let handler = (e: MouseEvent) => {
		x.value = e.pageX
		y.value = e.pageY
	}
	onMounted(() => {
		window.addEventListener('mousemove', handler)
	})
	onUnmounted(() => {
		window.removeEventListener('mousemove', handler)
	})
	return {
		x,
		y
	}
}