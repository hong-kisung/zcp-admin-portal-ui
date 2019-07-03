<template>
</template>

<script>
export default {
  	name: 'OkMessageBox',
  	computed: {
  		okMessage: function() {
  			return this.$store.state.okMessage
  		}
  	},
  	watch: {
  		okMessage: function () {
  			if(this.okMessage.show) {
  				this.$bvModal.msgBoxOk(this.okMessage.content, {
  					title: this.okMessage.title,
  					size: 'sm',
  					buttonSize: 'sm',
  					okTitle: '확인',
  					okVariant: 'success',
  					centered: false
  				}).then(value => {
  					this.$store.commit('showOkMessage', {show:false})
  				}).catch(err => {
  					this.$store.commit('showOkMessage', {show:false})
  				})
  			}
  		}
  	}
}
</script>
