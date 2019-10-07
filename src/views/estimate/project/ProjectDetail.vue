<template>
    <b-modal id="project-info-modal" title="Project 기본정보" centered no-close-on-backdrop v-model="show" @close="cancel" @cancel="cancel" @ok="saveProject">
        <b-form>
            <b-form-group label="Project명" label-for="name" :label-cols="3" label-class="required">
                <b-form-input type="text" id="name" v-model="project.name" required placeholder="Project명을 입력해주세요."></b-form-input>
                <b-form-invalid-feedback id="name">
                    Project명을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Customer" label-for="customerId" :label-cols="3" label-class="required">
		        <b-form-select id="customerId"
		          :plain="true"
		          v-model="project.customerId">
			        <option v-for="(item, index) in customers" :value="item.id">{{ item.name_kr }}</option>
		        </b-form-select>
                <b-form-invalid-feedback id="customerId">
                    Customer를 선택해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="설명" label-for="description" :label-cols="3">
                <b-form-input type="text" id="description" v-model="project.description" placeholder="설명을 입력해주세요."></b-form-input>
            </b-form-group>
        </b-form>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="secondary" @click="cancel">취소</b-button>
            <b-button variant="primary" @click="saveProject"><i class="icon-check"></i> 저장</b-button>
        </template>
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
		customers: function() {
			return this.$store.state.estimate.customers
		}
	},
    watch: {
		dialogVisible: function() {
			this.show = this.dialogVisible
		}
    },
	created () {
		this.$store.dispatch('estimate/getCustomers')
	},
	methods: {
		saveProject(e) {
			if(!this.project.name) {
				this.$zadmin.alert('Project명을 입력하세요.')
				e.preventDefault()
				return
			}
			if(!this.project.customerId) {
				this.$zadmin.alert('Customer를 선택하세요.')
				e.preventDefault()
				return
			}
			
			this.$zadmin.confirm('저장하시겠습니까?', (result) => {
				if(result) {
					if(this.project.id) {
						this.$store.dispatch('estimate/saveProject', {project: this.project})
					} else {
						this.$store.dispatch('estimate/addProject', {project: this.project})
					}
				}
			})
			
			this.cancel()
		},
		cancel() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>