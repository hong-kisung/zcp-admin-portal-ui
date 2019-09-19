const swapArray = {
	methods: {
		moveUp: function(array, index) {
			if(index === 0) return
			
			const removed = array.splice(index, 1)
			array.splice(index -1, 0, removed[0])
		},
		moveDown: function(array, index) {
			if(index === array.length -1) return
			
			const removed = array.splice(index, 1)
			array.splice(index +1, 0, removed[0])
		}
	}	
}

export default swapArray
