<template>
    <b-tab v-bind="{ active: isActive }">
        <template slot="title">
            <i class="icon-people mr-1"></i> Stakeholders
        </template>
        <b-form-group>
            <b-button variant="success" size="sm" @click="projectStakeholderAdd"><i class="icon-plus"></i> Stakeholder 추가</b-button>
        </b-form-group>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="projectStakeholders_fields" :items="projectStakeholders">
                <template v-slot:table-colgroup="scope">
                    <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'no' ? '5%' : '' }">
                </template>

                <template slot="role" slot-scope="data">
                    {{ data.item.roleName }}
                </template>
                <template slot="no" slot-scope="data">
                    {{ projectStakeholders.length - data.index }}
                </template>
                <template slot="userName" slot-scope="data">
                    <b-link  @click="getProjectStakeholder(data.item.id)">{{ data.item.userName }}</b-link>
                </template>
                <template slot="actions" slot-scope="data">
                    <b-button variant="danger" size="sm" class="mr-1" @click="removeProjectStakeholder(data.item.id, data.item.userName)"><i class="fa fa-close"></i></b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <!-- modal : Stakeholders Add -->
        <b-modal id="stakeholders-add-modal" size="lg" title="Stakeholder" centered no-close-on-backdrop v-model="projectStakeholderDialog" @close="closeProjectStakeholderDialog">
            <b-form>
                <b-form-group label="Role" label-for="stakeholdersRole" :label-cols="3" label-class="required">
                    <b-form-select id="stakeholdersRole" :plain="true" required v-model="projectStakeholder.role">
                        <option value="">선택</option>
                        <option value="PM">Project Manager</option>
                        <option value="NWM">Network Manager</option>
                        <option value="ADM">Application Development Manager</option>
                        <option value="AMM">Application Maintenance Manager</option>
                        <option value="IFM">Infrastructure Manager</option>
                        <option value="CNM">Contract Manager</option>
                        <option value="MSP">Managed Service Provider Manager</option>
                    </b-form-select>
                    <b-form-invalid-feedback id="stakeholdersRole">
                        Role을 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="User Name" label-for="stakeholdersUserName" :label-cols="3" label-class="required">
                    <div class="d-flex align-items-center justify-content-between">
                        <b-form-input type="text" id="stakeholdersUserName" placeholder="User Search" required v-model="autocomplete.name" style="width: 30%;">
                        </b-form-input>
                        <span class="mx-1"></span>
                        <b-form-input type="text" id="stakeholdersUserName" placeholder="User Name을 입력하세요." required maxlength="100" v-model="projectStakeholder.userName"></b-form-input>
                    </div>
                    <b-list-group class="mb-3" v-if="autocomplete.name">
                        <b-list-group-item href="#" v-for="(item, idx) in projectMngUsers.filter(c => c.userName.indexOf(autocomplete.name) != -1)" :key="idx" @click="setMngUser(item)">
                        {{ item.userName }}
                        </b-list-group-item>
                    </b-list-group>
                </b-form-group>

                <b-form-group label="Company" label-for="stakeholdersCompany" :label-cols="3">
                    <b-form-input type="text" id="stakeholdersCompany" placeholder="Company를 입력하세요." maxlength="100" v-model="projectStakeholder.companyName"></b-form-input>
                </b-form-group>
                <b-form-group label="Org" label-for="stakeholdersOrg" :label-cols="3">
                    <b-form-input type="text" id="stakeholdersOrg" placeholder="Org를 입력하세요." maxlength="100" v-model="projectStakeholder.org"></b-form-input>
                </b-form-group>
                <b-form-group label="Email" label-for="stakeholdersEmail" :label-cols="3">
                    <b-form-input type="email" id="stakeholdersEmail" placeholder="Email을 입력하세요." maxlength="50" v-model="projectStakeholder.email"></b-form-input>
                </b-form-group>
                <b-form-group label="Mobile" label-for="stakeholdersMobile" :label-cols="3">
                    <b-form-input type="tel" id="stakeholdersMobile" placeholder="Mobile을 입력하세요." maxlength="20" v-model="projectStakeholder.mobileNumber"></b-form-input>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeProjectStakeholderDialog">취소</b-button>
                <b-button variant="primary" @click="saveProjectStakeholder"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Stakeholders Add -->

        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/project/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
        </div>
    </b-tab>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'

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
        projectStakeholders: function() {
            return this.$store.state.project.projectStakeholders
        },
        projectStakeholder: function() {
            return this.$store.state.project.projectStakeholder
        },
        projectMngUsers: function() {
            return this.$store.state.project.projectMngUsers
        }
    },
    watch: {
        projectStakeholderDialog (val) {
            val || this.closeProjectStakeholderDialog()
        }
    },
    data()  {
        return {
            projectStakeholders_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'role', label: 'Role', tdClass: 'text-left' },
                { key: 'userName', label: 'Name', tdClass: 'text-left' },
                { key: 'companyName', label: 'Company', tdClass: 'text-left' },
                { key: 'org', label: 'Org', tdClass: 'text-left' },
                { key: 'email', label: 'E-mail', tdClass: 'text-left' },
                { key: 'mobileNumber', label: 'Mobile Number', tdClass: 'text-left' },
                { key: 'created', label: 'created', tdClass: 'text-left' },
                { key: 'createdDt', label: 'Created Date', tdClass: 'text-center' },
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            id: 0,
            projectStakeholderId: 0,
            projectStakeholderDialog: false,
            projectStakeholderEdited: false,
            autocomplete: {
                name: ''
            },
            isActive: false
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
            if (this.$route.params.active) {
                this.isActive = this.$route.params.active === 'Stakeholders' ? true : false
            }

            this.$store.dispatch('project/getProjectStakeholders', {id: this.id})
        },
        closeProjectStakeholderDialog() {
			this.projectStakeholderDialog = false
		},
        projectStakeholderAdd() {
            const projectStakeholder = {
                content: {
                    resource: {
                        role: ''
                    }
                }
            }

            this.$store.dispatch('project/getProjectMngUsers')
            this.$store.commit('project/setProjectStakeholder', projectStakeholder)
            this.projectStakeholderEdited = false
            this.projectStakeholderDialog = true
            this.autocomplete.name = ''
        },
        saveProjectStakeholder(e) {
            if (!this.projectStakeholder.role) {
                this.$zadmin.alert('Role을 선택하세요.')
                e.preventDefault()
                return false
            }
            if (!this.projectStakeholder.userName) {
                this.$zadmin.alert('userName을 입력하세요.')
                e.preventDefault()
                return false
            }
            if (this.projectStakeholder.email && !this.validEmail(this.projectStakeholder.email)) {
                this.$zadmin.alert('유효한 Email을 입력하세요.')
                e.preventDefault()
                return false
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                if (this.projectStakeholderEdited) {
                    this.updateProjectStakeholder()
                } else {
                    this.createProjectStakeholder()
                }
            })
        },
        createProjectStakeholder() {
            axios.post('/api/admin-project/projects/' + this.id + '/stakeholders', this.projectStakeholder).then(response => {
                if (response.status === 201) {
                    this.$store.dispatch('project/getProjectStakeholders', {id: this.id})
                    this.closeProjectStakeholderDialog()
                    this.$zadmin.alert('저장 되었습니다.')
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            }).catch(error => {
                let response = error.response
                if (response.data) {
                    let errorMsg = response.data.message + ' [' + response.data.code + ']'

                    this.$zadmin.alert(errorMsg)
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            })
        },
        updateProjectStakeholder() {
            axios.put('/api/admin-project/projects/' + this.id + '/stakeholders/' + this.projectStakeholderId, this.projectStakeholder).then(response => {
                if (response.status === 200) {
                    this.$store.dispatch('project/getProjectStakeholders', {id: this.id})
                    this.closeProjectStakeholderDialog()
                    this.$zadmin.alert('저장 되었습니다.')
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            })
        },
        removeProjectStakeholder(projectStakeholderId, userName) {
            this.$zadmin.confirm(userName + '을(를) 삭제 하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-project/projects/' + this.id + '/stakeholders/' + projectStakeholderId).then(response => {
                    if (response && response.status === 204) {
                        this.$store.dispatch('project/getProjectStakeholders', {id: this.id})
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    let response = error.response
                    if (response.data) {
                        let errorMsg = response.data.message + ' [' + response.data.code + ']'

                        this.$zadmin.alert(errorMsg)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        },
        getProjectStakeholder(projectStakeholderId) {
            const projectStakeholder = {
                content: {
                    resource: {
                        role: ''
                    }
                }
            }

            this.$store.commit('project/setProjectStakeholder', projectStakeholder)
            this.$store.dispatch('project/getProjectStakeholder', {id: this.id, projectStakeholderId: projectStakeholderId})

            this.projectStakeholderId = projectStakeholderId
            this.projectStakeholderEdited = true
            this.projectStakeholderDialog = true
        },
        setMngUser(item) {
            const projectStakeholder = {
                content: {
                    resource: {
                        role: this.projectStakeholder.role,
                        userName: item.userName,
                        companyName: item.companyName,
                        org: item.org,
                        email: item.email,
                        mobileNumber: item.mobileNumber
                    }
                }
            }

            this.$store.commit('project/setProjectStakeholder', projectStakeholder)
            this.autocomplete.name = ''
        },
        validEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }
    }
}
</script>
