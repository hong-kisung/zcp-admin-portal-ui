<template>
  <mdb-modal centered :show="dialogVisible" @close="cancel">
    <mdb-modal-body>
      <mdb-card-title class="text-center">Project 기본정보</mdb-card-title>
      <form class="grey-text">
        <mdb-input type="text" label="Project명" v-model="project.name"/>
        <mdb-input type="text" label="설명" v-model="project.description"/>
      </form>
      <div class="mt-5 text-center">
        <mdb-btn size="md" outline="primary" @click="cancel">닫기</mdb-btn>
        <mdb-btn size="md" color="primary" @click="saveProject">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbInput
  	},
	data: () => ({
      	project: {},
      	newPage: true
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
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		saveProject() {
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
			}
		},
		cancel() {
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
