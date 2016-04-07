export default {
	acceptStatement: true,
	update(method) {
		let time, startX, startY, endX, endY

		let flags = /iPhone|Android/gi
		let mobile = navigator.userAgent.match(flags)

		if (! mobile) {
			this.el.addEventListener("click", value, false)
			return
		}

		this.el.addEventListener("touchstart", (e) => {
			startX = e.touches[0].clientX
			startY = e.touches[0].clientY

			time = Date.now()
		}, false)

		this.el.addEventListener("touchend", (e) => {
			endX = e.changedTouches[0].clientX
			endY = e.changedTouches[0].clientY

			if (Date.now() - time < 200 && Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
				method()
			}

			this.el && this.el.nodeName.toLowerCase() !== "input" && e.preventDefault()
		}, false)
	}
}