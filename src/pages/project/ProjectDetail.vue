<template>
  <v-container fluid grid-list-xl>
    <h2> 원가 견적  </h2>
    <v-layout row wrap>
      <v-flex lg12>
		      <ValidationObserver ref="obs">
		        <v-card slot-scope="{ invalid, validated }">
				  <v-card-text>
						<v-layout wrap>
						  <v-flex xs6 sm6 sm6>
							<VTextFieldWithValidation rules="required|max:50" data-vv-name="name" v-model="project.name" label="Project명"/>
						  </v-flex>
						  <v-flex xs6 sm6 sm6>
							<VTextFieldWithValidation rules="" data-vv-name="createdDt" v-model="project.createdDt" label="생성일시" readonly/>
						  </v-flex>
						  <v-flex xs12 sm12 md12>
							<VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="project.description" label="설명"/>
						  </v-flex>
						</v-layout>
				  </v-card-text>
				  <v-card-actions>
				    <v-spacer></v-spacer>
				    <v-btn right color="primary" @click="cancel">취소</v-btn>
				    <v-btn right color="primary" @click="saveProject" v-bind:disabled="invalid">저장</v-btn>
				  </v-card-actions>
				</v-card>
			  </ValidationObserver>
      </v-flex>
      <v-flex lg12>
		  <v-tabs
		    v-model="active"
		    color="grey darken-1"
		    dark
		    slider-color="yellow"
		  >
		    <v-tab href="#tab-2" v-if="!newPage">용량산정</v-tab>
		    <v-tab href="#tab-3" v-if="!newPage">견적서</v-tab>
		    <v-tab href="#tab-4" v-if="!newPage">견적서 이력</v-tab>
		
		    <v-tab-item value="tab-2" v-if="!newPage">
		    	<project-volumn v-bind:projectId="projectId" />
		    </v-tab-item>
		    <v-tab-item value="tab-3" v-if="!newPage">
			  <project-estimate 
			  		v-bind:projectId="projectId"
			  		v-bind:editable="true"
			  		v-on:fire-saved="estimateSaved" 
			  />
		    </v-tab-item>
		    <v-tab-item value="tab-4" v-if="!newPage">
		    	<project-estimate-history 
		    		v-bind:projectId="projectId" 
		    		v-bind:refreshStatus="refreshStatus"
		    		v-on:fire-refresh-finished="changeRefreshStatus" 
		    	/>
		    </v-tab-item>
		  </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	data: () => ({
		projectId: 0,
      	newPage: true,
		active: null,
	  	headers: [],
      	project: {},
      	refreshStatus: false
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.$route.name != 'project_new') {
				this.newPage = false;
				this.projectId = this.$route.params.projectId;
				this.getProject(this.projectId);
			}
		},
		saveProject() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if(confirm('변경된 내용을 저장하시겠습니까?')) {
						if(this.newPage) {
							this.$http.post('/api/project', this.project).then(response => {
								this.project = response.data;
								this.projectId = this.project.id;
								this.newPage = false;
							})
						} else {
							this.$http.put('/api/project/'+this.project.id, this.project).then(response => {
								this.getProject(this.project.id);
							})
						}
						
						this.$refs.obs.reset();
					}
				}
			});
		},
		cancel() {
			history.go(-1);
		},
		getProject() {
			this.$http.get('/api/project/'+this.projectId).then(response => {
				if(response && response.data) {
					this.project = response.data;
				}
			})
		},
		estimateSaved() {
			this.refreshStatus = true;
		},
		changeRefreshStatus() {
			this.refreshStatus = false;
		}
	}
}
</script>

<style>
</style>
