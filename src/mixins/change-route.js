const changeRoute = {
	methods: {
		changeRouteLabel: function (label) {
			this.$route.meta.label = label
			this.$router.replace({query: {temp: Date.now()}})
			this.$router.replace({query: {temp: undefined}})
		}
	}	
}

export default changeRoute
