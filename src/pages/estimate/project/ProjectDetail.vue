<template>
  <b-modal centered no-close-on-backdrop title="Project 기본정보" v-model="show" @close="cancel" @cancel="cancel" @ok="saveProject">
    <b-form>
      <b-form-group label="Project명" label-for="name" label-class="astertisk" :label-cols="3" >
        <b-form-input id="name" type="text" v-model="project.name"></b-form-input>
      </b-form-group>
      <b-form-group label="설명" label-for="description" :label-cols="3" >
        <b-form-input id="description" type="text" v-model="project.description"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
  
</template>

<script>
export default {
	data: () => ({
      	show: false
	}),
  	props: [
		'dialogVisible'
	],
	computed: {
		project: function() {
			return this.$store.state.estimate.project
		},
		userId : function() {
			return this.$store.getters.getUserId
		}
	},
    watch: {
		dialogVisible: function() {
			this.show = this.dialogVisible
		}
    },
	methods: {
		saveProject(e) {
			if(!this.project.name) {
				alert('Project명을 입력하세요.')
				e.preventDefault()
				return
			}
			
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				if(this.project.id) {
					this.$store.dispatch('estimate/saveProject', {project: this.project})
				} else {
					this.project.created = this.userId
					this.$store.dispatch('estimate/addProject', {project: this.project})
				}
			}
			
			this.cancel()
		},
		cancel() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>
