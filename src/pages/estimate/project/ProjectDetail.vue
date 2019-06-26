<template>
  <b-modal centered no-close-on-backdrop title="Project 기본정보" v-model="show" @close="cancel" @cancel="cancel" @ok="saveProject">
    <b-form>
      <b-form-group label="Project명" label-for="name" :label-cols="3" >
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
  	components: {
  	},
	data: () => ({
      	project: {},
      	newPage: true,
      	show: false
	}),
  	props: [
		'projectId',
		'dialogVisible'
	],
    watch: {
		projectId: function() {
			if(this.projectId <= 0) {
				this.project = {};
				this.newPage = true;
				return;
			}
			
			this.newPage = false;
			this.getProject();
		},
		dialogVisible: function() {
			this.show = this.dialogVisible
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		saveProject(e) {
			if(!this.project.name) {
				alert('Project명을 입력하세요.')
				e.preventDefault()
				return
			}
			
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				if(this.newPage) {
					this.$http.post('/api/estimate/project', this.project).then(response => {
						this.$emit('fire-dialog-saved');
					})
				} else {
					this.$http.put('/api/estimate/project/'+this.project.id, this.project).then(response => {
						this.$emit('fire-dialog-saved');
					})
				}
			} else {
				this.cancel()
			}
		},
		cancel() {
			this.project = {};
			this.$emit('fire-dialog-closed');
		},
		getProject() {
			this.$http.get('/api/estimate/project/'+this.projectId).then(response => {
				if(response && response.data) {
					this.project = response.data;
				}
			})
		}
	}
}
</script>
