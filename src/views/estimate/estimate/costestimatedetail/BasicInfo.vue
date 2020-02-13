<template>
	<div>
        <h1 class="display-tit">{{ detailInfo.name }}</h1>
        
        <b-card>
            <h5 class="mb-3"><i class="icons cui-justify-left mr-1"></i> Basic Information</h5>
            <b-form>
                <b-form-group label="Name" label-for="name" :label-cols="3">
                    <b-form-input type="text" id="name" v-model="detailInfo.name" placeholder="Name을 입력하세요."></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="description" :label-cols="3">
                    <b-form-textarea type="text" id="description" v-model="detailInfo.description" placeholder="설명을 입력하세요." maxlength="100"></b-form-textarea>
                </b-form-group>
                <b-form-group label="Created Date" label-for="createdDt" :label-cols="3">
                    <b-form-input type="text" id="createdDt" v-model="detailInfo.createdDt" readOnly></b-form-input>
                </b-form-group>
            </b-form>
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" v-if="costEstimateDetail.editable" @click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
    </div>
</template>

<script>

export default {
    data()  {
        return {
        	detailInfo: {}
        }
    },
    computed: {
    	costEstimateDetail: function() {
    		return this.$store.state.estimate.costEstimateDetail
    	}
    },
    created() {
    	if(this.costEstimateDetail.editable && this.costEstimateDetail.estimateId > 0) {
    		this.getBasicInfo(this.costEstimateDetail.estimateId)
    	}
    },
    methods: {
    	getBasicInfo(id) {
			this.$http.get('/api/estimate/cost-estimates/' + id).then(response => {
				this.detailInfo = response.data
				this.refresh(response)
			}).catch(error => {
			})
    	},
    	save() {
    		if(!this.detailInfo.name) {
    			alert("Name을 입력하세요.")
    			return
    		}
			this.$zadmin.confirm('저장하시겠습니까?', (result) => {
				if(result) {
					if(this.costEstimateDetail.estimateId > 0) {
						this.$http.put('/api/estimate/cost-estimates/' + this.costEstimateDetail.estimateId, this.detailInfo).then(response => {
							this.$zadmin.alert('저장되었습니다.')
							this.refresh(response)
						})
						
					} else {
						this.$http.post('/api/estimate/cost-estimates', this.detailInfo).then(response => {
							this.$zadmin.alert('저장되었습니다.')
							this.refresh(response)
						})
					}
				}
			})
    	},
    	refresh(response) {
			this.costEstimateDetail.estimateId = response.data.id
			this.costEstimateDetail.estimateName = response.data.name
			this.costEstimateDetail.editable = true
			this.$store.commit('estimate/setCostEstimateDetail', this.costEstimateDetail)

			//refresh
			this.detailInfo = response.data
    	}
    }
}
</script>