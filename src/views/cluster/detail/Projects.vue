<template>
    <b-tab>
        <template slot="title">
            <i class="icon-folder-alt mr-1"></i> Projects
        </template>
        <b-form-group>
            <b-button variant="success" size="sm" class="mr-2" v-bind:disabled="selected.length > 1" @click="projectClusterAdd"><i class="icon-plus"></i> Project 추가</b-button>
            <b-button variant="danger" size="sm" v-bind:disabled="selected.length != 1" @click="removeProjectClusterByProjectId"><i class="icon-close"></i> Project 삭제</b-button>
        </b-form-group>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-bordered">
                <colgroup>
                    <col style="width: *;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Environment Type</th>
                        <th>Product</th>
                        <th>Contract Size</th>
                        <th>Billing YN</th>
                        <th>Billing Start Date</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, idx) in clusterProjects">
                        <template v-for="(projectCluster, projectClusterIdx) in item.projectClusters">
                            <template v-if="projectCluster.projectClusterProducts.length == 0">
                                <tr>
                                    <th class="bg-dark" v-if="projectClusterIdx == 0" :rowspan="item.productCnt">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" :id="item.projectName" :value="item.projectId" v-model="selected">
                                            <label class="custom-control-label" :for="item.projectName">{{ item.projectName }}</label>
                                        </div>
                                    </th>
                                    <td class="text-left">
                                        <b-link @click="getProjectCluster(item.projectId, projectCluster.id)">{{ projectCluster.enviromentType }}</b-link>
                                    </td>
                                    <td class="text-center">&nbsp;</td>
                                    <td class="text-right">&nbsp;</td>
                                    <td class="text-center">&nbsp;</td>
                                    <td class="text-center">&nbsp;</td>
                                    <td class="text-center">&nbsp;</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr v-for="(projectClusterProduct, clusterProductIndex) in projectCluster.projectClusterProducts">
                                    <th class="bg-dark" v-if="clusterProductIndex == 0 && projectClusterIdx == 0" :rowspan="item.productCnt">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" :id="item.projectName" :value="item.projectId" v-model="selected">
                                            <label class="custom-control-label" :for="item.projectName">{{ item.projectName }}</label>
                                        </div>
                                    </th>
                                    <td class="text-left" v-if="clusterProductIndex == 0" :rowspan="projectCluster.projectClusterProducts.length">
                                        <b-link @click="getProjectCluster(item.projectId, projectCluster.id)">{{ projectCluster.enviromentType }}</b-link>
                                    </td>
                                    <td class="text-left">{{ projectClusterProduct.productName }}</td>
                                    <td class="text-right">{{ projectClusterProduct.contractSize }}GB</td>
                                    <td class="text-center">{{ projectClusterProduct.billingYn }}</td>
                                    <td class="text-center">{{ projectClusterProduct.billingStartDt }}</td>
                                    <td class="text-center">{{ projectClusterProduct.createdDt }}</td>
                                </tr>
                            </template>
                        </template>
                    </template>
                </tbody>
            </table>
        </VuePerfectScrollbar>

        <!-- modal : Project -->
        <b-modal id="project-modal" size="lg" title="Project" centered no-close-on-backdrop v-model="projectClusterDialog" @close="closeProjectClusterDialog">
            <b-form>
                <b-form-group label="Project" label-for="project" :label-cols="3" label-class="required">
                    <b-form-select id="project" :plain="true" required v-model="projectCluster.projectId">
                        <option value="">선택</option>
                        <option v-for="(item, index) in projectsAll" :value="item.id">{{ item.name }}</option>
                    </b-form-select>
                    <b-form-invalid-feedback id="project">
                        Project를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Environment Type" label-for="environmentType" :label-cols="3" label-class="required">
                    <b-form-select id="environmentType" :plain="true" required v-model="projectCluster.enviromentType" :disabled="cluster.enviromentType != 'combination'">
                        <option value="">선택</option>
                        <option value="dev">dev</option>
                        <option value="qa">qa</option>
                        <option value="stage">stage</option>
                        <option value="prod">prod</option>
                    </b-form-select>
                    <b-form-invalid-feedback id="environmentType">
                        Environment Type을 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Cluster" label-for="Cluster" :label-cols="3" v-show="false">
                    <b-form-input type="text" id="clusterId" v-model="projectCluster.clusterId"></b-form-input>
                </b-form-group>
                <b-form-row>
                    <b-col sm="3">
                        <label for="product" class="col-form-label">Product</label>
                        <div>
                            <b-button variant="success" size="sm" @click="projectClusterProductAdd"><i class="icon-plus"></i> 추가</b-button>
                        </div>
                    </b-col>
                    <b-col>
                        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                            <table class="table table-sm table-bordered">
                                <colgroup>
                                    <col style="width: *;">
                                    <col style="width: 15%;">
                                    <col style="width: 12%;">
                                    <col style="width: 15%;">
                                    <col style="width: 10%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Contract Size</th>
                                        <th>Billing YN</th>
                                        <th>Billing Start Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item, idx) in projectCluster.projectClusterProducts">
                                    <tr>
                                        <td>
                                            <b-form-select id="productId" :plain="true" v-model="projectCluster.projectClusterProducts[idx].productId">
                                                <option value="">선택</option>
                                                <option v-for="(item, index) in products" :value="item.id">{{ item.name }}</option>
                                            </b-form-select>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <b-form-input type="text" v-model="projectCluster.projectClusterProducts[idx].contractSize"></b-form-input>
                                                <span class="mx-1">GB</span>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <label class="mx-1 mb-0 switch switch-label switch-success">
                                                <input class="switch-input" type="checkbox" checked="" true-value="Y" false-value="N" v-model="projectCluster.projectClusterProducts[idx].billingYn">
                                                <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <b-form-input type="date" v-model="projectCluster.projectClusterProducts[idx].billingStartDt"></b-form-input>
                                        </td>
                                        <td class="text-center">
                                            <b-button variant="danger" size="sm" @click="projectClusterProductRemove(idx)"><i class="fa fa-close"></i></b-button>
                                        </td>
                                    </tr>
                                    </template>
                                </tbody>
                            </table>
                        </VuePerfectScrollbar>
                    </b-col>
                </b-form-row>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeProjectClusterDialog">취소</b-button>
                <b-button variant="danger" v-if="projectClusterEdited" @click="removeProjectCluster">삭제</b-button>
                <b-button variant="primary" @click="saveProjectCluster"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Project -->

        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/cluster/' }">
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
        cluster: function() {
            return this.$store.state.cluster.cluster
        },
        clusterProjects: function() {
            return this.$store.state.cluster.clusterProjects
        },
        projectCluster: function() {
            return this.$store.state.project.projectCluster
        },
        projectsAll: function() {
            return this.$store.state.project.projectsAll
        },
        products: function() {
            return this.$store.state.project.products
        }
    },
    watch: {
        projectClusterDialog (val) {
			val || this.closeProjectClusterDialog()
		}
    },
    data()  {
        return {
            id: 0,
            projectClusterId: 0,
            projectClusterDialog: false,
            projectClusterEdited: false,
            clusterProduct_fields: [
                { key: 'productId', label: 'Product', tdClass: 'text-center' },
                { key: 'contractSize', label: 'Contract Size', tdClass: 'text-center' },
                { key: 'billingYn', label: 'Billing YN', tdClass: 'text-center' },
                { key: 'billingStartDt', label: 'Billing Started Date', tdClass: 'text-center' },
                { key: 'product_actions', label: 'Actions', tdClass: 'text-center' }
            ],
            selected: []
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

            this.$store.dispatch('cluster/getClusterProjects', {id: this.id})
            this.$store.dispatch('project/getProjectsAll')
            this.$store.dispatch('project/getProducts')
        },
        projectClusterAdd() {
            let projectId = ''
            for (let id of this.selected) {
                projectId = id
            }
            let enviromentType = this.cluster.enviromentType != 'combination' ? this.cluster.enviromentType : ''

            const projectCluster = {
                content: {
                    resource: {
                        projectId: projectId,
                        enviromentType: enviromentType,
                        clusterId: this.id,
                        projectClusterProducts: [
                            {
                                productId: '',
                                contractSize: '',
                                billingYn: 'N',
                                billingStartDt: ''
                            }
                        ]
                    }
                }
            }

            this.$store.commit('project/setProjectCluster', projectCluster)
            this.projectClusterEdited = false
            this.projectClusterDialog = true
        },
        closeProjectClusterDialog() {
			this.projectClusterDialog = false
		},
        projectClusterProductAdd() {
            const product = {
                productId: '',
                contractSize: '',
                billingYn: 'N',
                billingStartDt: ''
            }
            this.projectCluster.projectClusterProducts.push(product);
        },
        projectClusterProductRemove(idx) {
            this.projectCluster.projectClusterProducts.splice(idx, 1)
        },
        saveProjectCluster(e) {
            if (!this.projectCluster.projectId) {
                this.$zadmin.alert('Project를 선택하세요.')
                e.preventDefault()
                return false
            }
            if (!this.projectCluster.enviromentType) {
                this.$zadmin.alert('Enviroment Type을 선택하세요.')
                e.preventDefault()
                return false
            }

            if (this.projectCluster.projectClusterProducts.length > 0) {
                for (let product of this.projectCluster.projectClusterProducts) {
                    if (!product.productId) {
                        this.$zadmin.alert('Product를 선택하세요.')
                        e.preventDefault()
                        return false
                    }
                }
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                if (this.projectClusterEdited) {
                    this.updateProjectCluster()
                } else {
                    this.createProjectCluster()
                }
            })
        },
        createProjectCluster() {
            axios.post('/api/admin-project/projects/' + this.projectCluster.projectId + '/clusters', this.projectCluster).then(response => {
                if (response.status === 201) {
                    this.$store.dispatch('cluster/getClusterProjects', {id: this.id})
                    this.closeProjectClusterDialog()
                    this.selected = []
                    this.$zadmin.alert('저장 되었습니다.')
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            }).catch(error => {
                let response = error.response
                if (response.data) {
                    this.$zadmin.alert(response.data.message)
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            })
        },
        updateProjectCluster() {
            axios.put('/api/admin-project/projects/' + this.projectCluster.projectId + '/clusters/' + this.projectClusterId, this.projectCluster).then(response => {
                if (response.status === 200) {
                    this.$store.dispatch('cluster/getClusterProjects', {id: this.id})
                    this.closeProjectClusterDialog()
                    this.$zadmin.alert('저장 되었습니다.')
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            }).catch(error => {
                let response = error.response
                if (response.data) {
                    this.$zadmin.alert(response.data.message)
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            })
        },
        removeProjectCluster() {
            this.$zadmin.confirm('등록된 클러스터 정보를 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-project/projects/' + this.projectCluster.projectId + '/clusters/' + this.projectClusterId).then(response => {
                    if (response && response.status === 204) {
                        this.$store.dispatch('cluster/getClusterProjects', {id: this.id})
                        this.closeProjectClusterDialog()
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    let response = error.response
                    if (response.data) {
                        this.$zadmin.alert(response.data.message)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        },
        removeProjectClusterByProjectId() {
            this.$zadmin.confirm('클러스터가 맵핑된 프로젝트 전체가 삭제됩니다. 등록된 프로젝트 정보를 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-project/projects/' + this.selected[0] + '/clusters/').then(response => {
                    if (response && response.status === 204) {
                        this.$store.dispatch('cluster/getClusterProjects', {id: this.id})
                        this.selected = []
                        this.closeProjectClusterDialog()
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                }).catch(error => {
                    let response = error.response
                    if (response.data) {
                        this.$zadmin.alert(response.data.message)
                    } else {
                        this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        },
        getProjectCluster(projectId, projectClusterId) {
            this.$store.commit('project/setProjectCluster', {})
            this.$store.dispatch('project/getProjectCluster', {id: projectId, projectClusterId: projectClusterId})
            this.projectClusterId = projectClusterId
            this.projectClusterEdited = true
            this.projectClusterDialog = true
        }
    }
}
</script>
