<template>
    <b-tab active>
        <template slot="title">
            <i class="icons cui-justify-left mr-1"></i> Basic Information
        </template>
        <b-form>
            <b-form-group label="Customer" label-for="customer" :label-cols="3" label-class="required">
                <b-form-select id="customer" :plain="true" v-model="project.customerId" required>
                    <option value="">선택</option>
                    <option v-for="(item, index) in customersAll" :value="item.id">{{ item.nameEn }}</option>
                </b-form-select>
                <b-form-invalid-feedback id="customer">
                    Customer를 선택해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Project Name" label-for="projectName" :label-cols="3" label-class="required">
                <b-form-input type="text" id="projectName" required placeholder="Project Name을 입력하세요." v-model="project.name"></b-form-input>
                <b-form-invalid-feedback id="projectName">
                    Project Name을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Status" label-for="status" :label-cols="3" label-class="required">
                <b-form-select id="status" :plain="true" v-model="project.status" required>
                    <option value="">선택</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Development">Development</option>
                    <option value="Operation">Operation</option>
                </b-form-select>
                <b-form-invalid-feedback id="status">
                    Status를 선택해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Development Period" label-for="devStartDt" :label-cols="3">
                <div class="d-flex align-items-center justify-content-between">
                    <b-form-input type="date" id="devStartDt" v-model="project.devStartDt"></b-form-input>
                    <span class="mx-2">~</span>
                    <b-form-input type="date" id="devEndDt" v-model="project.devEndDt"></b-form-input>
                </div>
            </b-form-group>
            <b-form-group label="Launching Date" label-for="launchDt" :label-cols="3">
                <b-form-input type="date" id="launchDt" v-model="project.launchDt"></b-form-input>
            </b-form-group>
            <b-form-group label="Description" label-for="description" :label-cols="3">
                <b-form-input type="text" id="description" placeholder="Description을 입력하세요." v-model="project.description"></b-form-input>
            </b-form-group>
            <b-form-group label="원가견적 여부" label-for="estimatedYn" :label-cols="3">
                <b-form-radio-group id="estimatedYn" name="estimatedYn" class="mt-1" v-model="project.estimatedYn">
                    <b-form-radio value="Y">Yes</b-form-radio>
                    <b-form-radio value="N">No</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <template v-if="project.estimatedYn === 'N'">
                <b-form-group label="원가견적 상위 프로젝트" label-for="parentId" :label-cols="3" label-class="required">
                    <b-form-select id="parentId" :plain="true" v-model="project.parentId">
                        <option value="">선택</option>
                        <option v-for="(item, index) in projectsAll" :value="item.id">{{ item.name }}</option>
                    </b-form-select>
                </b-form-group>
            </template>
            <b-form-group label="Slack Channel" label-for="slackChannel" :label-cols="3">
                <b-form-input type="text" id="slackChannel" v-model="project.slackChannel"></b-form-input>
            </b-form-group>
        </b-form>
        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/project/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="right" @click="updateProject"><i class="icon-check"></i> 저장</b-button>
        </div>
    </b-tab>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch
    },
    computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        },
        project: function() {
            return this.$store.state.project.project
        },
        customersAll: function() {
            return this.$store.state.customer.customersAll
        },
        projectsAll: function() {
            return this.$store.state.project.projectsAll
        }
    },
    data()  {
        return {
            id: 0
        }
    },
    created () {
		this.initialize()
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        initialize() {
            if (this.$route.params.id) {
                this.id = this.$route.params.id
            }
            this.$store.dispatch('project/getProjectsAll')
            this.$store.dispatch('customer/getCustomersAll', {activation: 'Y'})
            this.$store.dispatch('project/getProject', {id: this.$route.params.id})
        },
        updateProject(e) {
            if (!this.project.customerId) {
                this.$zadmin.alert('Customer를 선택하세요.')
                e.preventDefault()
                return false
            }
            if (!this.project.name) {
                this.$zadmin.alert('Project Name을 입력하세요.')
                e.preventDefault()
                return false
            }
            if (!this.project.status) {
                this.$zadmin.alert('Status를 선택하세요.')
                e.preventDefault()
                return false
            }
            if (this.project.estimatedYn === 'N' && !this.project.parentId) {
                this.$zadmin.alert('원가견적 상위 프로젝트를 선택하세요.')
                e.preventDefault()
                return false
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                this.$store.dispatch('project/updateProject', {id: this.id, project: this.project})
            })
        }
    }
}
</script>
