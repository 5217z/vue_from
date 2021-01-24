import {ref, Ref, onMounted, onUnmounted} from 'vue'

export const useClickOutSide = (el: Ref<HTMLElement | null>) => {
	let isOutSide = ref<boolean>(false)
	let handler = (e: MouseEvent) => {
			if (el.value) {
				isOutSide.value = el.value.contains(e.target as HTMLElement) ? false : true
		}
	}
	onMounted(() => {
		console.log(isOutSide.value)
		window.addEventListener('click', handler)
	})
	onUnmounted(() => {
		window.removeEventListener('click', handler)
	})
	return {
		isOutSide
	}
}