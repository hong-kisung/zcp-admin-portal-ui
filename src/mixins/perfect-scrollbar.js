const perfectScrollbar = {
	computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        }
	},
	methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
	}	
}

export default perfectScrollbar
