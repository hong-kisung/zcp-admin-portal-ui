<template>
    <b-tab>
        <template slot="title">
            <i class="icon-list mr-1"></i> Clusters
        </template>
        <b-form-group>
            <b-button variant="success" size="sm" class="mr-2" @click="projectClusterAdd"><i class="icon-plus"></i> Cluster 추가</b-button>
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
                        <th>Cluster</th>
                        <th>Environment Type</th>
                        <th>Product</th>
                        <th>Contract Size</th>
                        <th>Billing YN</th>
                        <th>Billing Start Date</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, idx) in projectClusters">
                        <template v-if="item.projectClusterProducts.length == 0">
                            <tr>
                                <td class="text-left" v-if="index == 0" :rowspan="item.projectClusterProducts.length">
                                    <b-link @click="getProjectCluster(item.id)">{{ item.clusterName }}</b-link>
                                </td>
                                <td class="text-left" v-if="index == 0" :rowspan="item.projectClusterProducts.length">{{ item.enviromentType }}</td>
                                <td class="text-center"></td>
                                <td class="text-right"></td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                            </tr>
                        </template>
                        <template v-else>
                            <template v-for="(projectClusterProduct, index) in item.projectClusterProducts">
                                <tr>
                                    <td class="text-left" v-if="index == 0" :rowspan="item.projectClusterProducts.length">
                                        <b-link @click="getProjectCluster(item.id)">{{ item.clusterName }}</b-link>
                                    </td>
                                    <td class="text-left" v-if="index == 0" :rowspan="item.projectClusterProducts.length">{{ item.enviromentType }}</td>
                                    <td class="text-center">{{ projectClusterProduct.productName }}</td>
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

        <!-- modal : Cluster Add -->
        <b-modal id="cluster-modal" size="lg" title="Cluster" centered no-close-on-backdrop v-model="projectClusterDialog" @close="closeprojectClusterDialog">
            <b-form>
                <b-form-group label="Environment Type" label-for="environment" :label-cols="4" label-class="required">
                    <b-form-select id="environment" :plain="true" v-model="projectCluster.enviromentType" required>
                        <option value="">선택</option>
                        <option value="dev">dev</option>
                        <option value="qa">qa</option>
                        <option value="stage">stage</option>
                        <option value="prod">prod</option>
                    </b-form-select>
                    <b-form-invalid-feedback id="environment">
                        Environment를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Cluster" label-for="Cluster" :label-cols="4" label-class="required">
                    <b-form-select id="clusterId" :plain="true" v-model="projectCluster.clusterId" required>
                        <option value="">선택</option>
                        <option v-for="(item, index) in clustersAll" :value="item.id">{{ item.clusterName }}</option>
                    </b-form-select>
                    <b-form-invalid-feedback id="environment">
                        Environment를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Product" label-for="Product" :label-cols="4">
                    <b-button variant="success" size="sm" class="float-right"  @click="projectClusterProductAdd"><i class="icon-plus"></i> Project 추가</b-button>

                    <b-table striped hover small bordered :fields="clusterProduct_fields" :items="projectCluster.projectClusterProducts">
                        <template v-slot:table-colgroup="scope">
                            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'product' ? '25%' : '' }">
                        </template>

                        <template slot="productId" slot-scope="data">
                            <b-form-select id="productId" size="sm" :plain="true" v-model="projectCluster.projectClusterProducts[data.index].productId" required>
                                <option value="">선택</option>
                                <option v-for="(item, index) in products" :value="item.id">{{ item.name }}</option>
                            </b-form-select>
                        </template>
                        <template slot="contractSize" slot-scope="data">
                            <b-form-input type="text" id="contractSize" value="" size="sm" v-model="projectCluster.projectClusterProducts[data.index].contractSize"></b-form-input>
                        </template>
                        <template slot="billingYn" slot-scope="data">
                            <label class="mx-1 mb-0 switch switch-label switch-success">
                                <input class="switch-input" type="checkbox" checked="" true-value="Y" false-value="N" v-model="projectCluster.projectClusterProducts[data.index].billingYn">
                                <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                            </label>
                        </template>
                        <template slot="billingStartDt" slot-scope="data">
                            <b-form-input type="date" id="billingStartDt" v-model="projectCluster.projectClusterProducts[data.index].billingStartDt"></b-form-input>
                        </template>
                        <template slot="product_actions" slot-scope="data">
                            <b-button variant="danger" size="sm" class="mr-1" @click="projectClusterProductRemove(data.index)"><i class="fa fa-close"></i></b-button>
                        </template>
                    </b-table>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeprojectClusterDialog">취소</b-button>
                <b-button variant="danger" v-if="projectClusterEdited" @click="removeProjectCluster">삭제</b-button>
                <b-button variant="primary" @click="saveProjectCluster"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Cluster Add -->

        <div class="tab-bottom-btn text-left">
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
        projectClusters: function() {
            return this.$store.state.project.projectClusters
        },
        projectCluster: function() {
            return this.$store.state.project.projectCluster
        },
        clustersAll: function() {
            return this.$store.state.cluster.clustersAll
        },
        products: function() {
            return this.$store.state.project.products
        }
    },
    watch: {
        projectClusterDialog (val) {
			val || this.closeprojectClusterDialog()
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
            ]
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

            //this.$store.dispatch('project/getProjectClusters', {id: this.$route.params.id})
            //this.$store.dispatch('cluster/getClustersAll')
            //this.$store.dispatch('project/getProducts')
        },
        projectClusterAdd() {
            const projectCluster = {
                enviromentType: '',
                clusterId: '',
                projectClusterProducts: [
                    {
                        productId: '',
                        contractSize: '',
                        billingYn: 'N',
                        billingStartDt: ''
                    }
                ]
            }
            this.$store.commit('project/setProjectCluster', projectCluster)
            this.projectClusterEdited = false
            this.projectClusterDialog = true
        },
        closeprojectClusterDialog() {
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
            if (!this.projectCluster.enviromentType) {
                this.$zadmin.alert('Enviroment Type을 선택하세요.')
                e.preventDefault()
                return false
            }
            if (!this.projectCluster.clusterId) {
                this.$zadmin.alert('Cluster를 선택하세요.')
                e.preventDefault()
                return false
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
            axios.post('/api/admin-project/projects/' + this.id + '/clusters', this.projectCluster).then(response => {
                if (response.status === 201) {
                    this.$store.dispatch('project/getProjectClusters', {id: this.id})
                    this.closeprojectClusterDialog()
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
        updateProjectCluster() {
            axios.put('/api/admin-project/projects/' + this.id + '/clusters/' + this.projectClusterId, this.projectCluster).then(response => {
                if (response.status === 200) {
                    this.$store.dispatch('project/getProjectClusters', {id: this.id})
                    this.closeprojectClusterDialog()
                    this.$zadmin.alert('저장 되었습니다.')
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            })
        },
        removeProjectCluster() {
            this.$zadmin.confirm('등록된 클러스터 정보를 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-project/projects/' + this.id + '/clusters/' + this.projectClusterId).then(response => {
                    if (response && response.status === 204) {
                        this.$store.dispatch('project/getProjectClusters', {id: this.id})
                        this.closeprojectClusterDialog()
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
        getProjectCluster(projectClusterId) {
            this.$store.commit('project/setProjectCluster', {})
            this.$store.dispatch('project/getProjectCluster', {id: this.id, projectClusterId: projectClusterId})
            this.projectClusterId = projectClusterId
            this.projectClusterEdited = true
            this.projectClusterDialog = true
        }
    }
}
</script>
