<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Clusters <b-badge class="m-1" variant="danger">{{ clustersPage.totalCount }}</b-badge>
            <div class="float-right">
                <b-button variant="success" class="mr-2" @click="clusterAdd"><i class="icon-plus"></i> Cluster 추가</b-button>
                <b-button v-b-toggle.collapse1 variant="secondary"><i class="fa fa-filter"></i> 검색상세</b-button>
            </div>
        </h1>
        <div>
            <b-collapse id="collapse1">
                <b-card>
                    <b-form class="row">
                        <b-col lg="4">
                            <b-form-group>
                                <label for="clusterId">Cluster ID</label>
                                <b-form-input type="text" id="clusterId" placeholder="Cluster ID를 입력하세요." v-model="clustersSearch.clusterId"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="clusterName">Cluster Name</label>
                                <b-form-input type="text" id="clusterName" placeholder="Cluster Name을 입력하세요." v-model="clustersSearch.clusterName"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="enviromentType">Enviroment Type</label>
                                <b-form-select id="enviromentType" :plain="true" v-model="clustersSearch.enviromentType">
                                    <option value="">All</option>
                                    <option value="dev">dev</option>
                                    <option value="qa">qa</option>
                                    <option value="stage">stage</option>
                                    <option value="prod">prod</option>
                                    <option value="combination">combination</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="nwArch">n/w arch</label>
                                <b-form-select id="nwArch" :plain="true" v-model="clustersSearch.nwArchType">
                                    <option value="">All</option>
                                    <option value="Private">Private Only</option>
                                    <option value="Public">Public Only</option>
                                    <option value="Private_Public">Private + Public</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="sreConnect">SRE Integration</label>
                                <div class="mt-1">
                                    <b-form-radio-group id="sreConnect" v-model="clustersSearch.sreIntegrationYn">
                                        <b-form-radio value="">All</b-form-radio>
                                        <b-form-radio value="Y">Yes</b-form-radio>
                                        <b-form-radio value="N">No</b-form-radio>
                                    </b-form-radio-group>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="4">
                            <b-form-group>
                                <label for="activation">Activation</label>
                                <div class="mt-1">
                                    <b-form-radio-group id="activation" v-model="clustersSearch.activation">
                                        <b-form-radio value="">All</b-form-radio>
                                        <b-form-radio value="Y">Yes</b-form-radio>
                                        <b-form-radio value="N">No</b-form-radio>
                                    </b-form-radio-group>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-button variant="primary" block @click="getClustersByPage(1)"><i class="fa fa-search"></i> 검색</b-button>
                        </b-col>
                    </b-form>
                </b-card>
            </b-collapse>
        </div>
        <b-card>
            <div class="mb-3">
                <b-form-group label-for="perPageSelect" class="mb-0 float-left">
                    <b-form-select v-model="clustersPage.pageSize" id="perPageSelect" :options="pageOptions" @change="getClustersByPage(1)" class="w-auto"></b-form-select>
                </b-form-group>
                <b-pagination v-model="clustersPage.pageNo" :total-rows="clustersPage.totalCount" :per-page="clustersPage.pageSize" @input="getClustersByPage(clustersPage.pageNo)" align="right" class="my-0">
                </b-pagination>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="cluster_fields" :items="clusters">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'no' ? '4%' : '' }">
                    </template>

                    <template slot="no" slot-scope="data">
                        {{ (clustersPage.totalCount - ((clustersPage.pageNo - 1) * clustersPage.pageSize)) - data.index }}
                    </template>
                    <template slot="clusterName" slot-scope="data">
                        <router-link :to="{ name: 'ClusterDetail', params: { id: data.item.id, name: data.item.clusterName }}">
                            {{data.item.clusterName}}
                        </router-link>
                    </template>
                    <template slot="activation" slot-scope="data">
                        <label class="mx-1 mb-0 switch switch-label switch-success">
                            <input class="switch-input" type="checkbox" checked="" v-model="data.item.activation" @click="updateClusterActivation(data.item.id, data.item.activation)">
                            <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                        </label>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <b-button variant="danger" size="sm" @click="removeCluster(data.item.id, data.item.clusterName)"><i class="fa fa-close"></i></b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>

            <clusterAdd v-bind:dialogVisible="clusterAddDialog" v-on:fire-dialog-closed="clusterAddDialog = false" />

        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'
import clusterAdd from './ClusterAdd'

export default {
    components: {
        VuePerfectScrollbar,
        cSwitch,
        clusterAdd
    },
    data()  {
        return {
            cluster_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'clusterId', label: 'Cluster ID', tdClass: 'text-left' },
                { key: 'clusterName', label: 'Cluster Name' },
                { key: 'enviromentType', label: 'Environment Type', tdClass: 'text-center' },
                { key: 'nwArchTypeName', label: 'n/w arch', tdClass: 'text-center' },
                { key: 'sreIntegrationYn', label: 'SRE Intergration', tdClass: 'text-center' },
                { key: 'multiTenantYn', label: 'Multi Tenant', tdClass: 'text-center' },
                { key: 'mngK8sVersion', label: 'k8s version', tdClass: 'text-center' },
                { key: 'createdDt', label: 'Created date', tdClass: 'text-center' },
                { key: 'activation', label: 'Activation', tdClass: 'text-center' },
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            pageOptions: [10, 20, 30, 50, 100],
            clusterAddDialog: false,
            clustertId: 0
        }
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
        clusters: function() {
            return this.$store.state.cluster.clusters
        },
        clustersPage: function() {
            return this.$store.state.cluster.clustersPage
        },
        clustersSearch: function() {
            return this.$store.state.cluster.clustersSearch
        }
    },
    created() {
        this.getClusters()
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        getClusters() {
            const params = {
                search: this.clustersSearch,
                page: this.clustersPage
            }

            this.$store.dispatch('cluster/getClusters', params)
        },
        getClustersByPage(pageNo) {
            this.$store.commit('cluster/setClustersPageNo', pageNo)

            const params = {
                search: this.clustersSearch,
                page: this.clustersPage
            }
            this.$store.dispatch('cluster/getClusters', params)
        },
        clusterAdd() {
            const cluster = {
                content: {
                    resource: {
                        enviromentType: null,
                        nwArchType: null,
                        sreIntegrationYn: 'N',
                        multiTenantYn: 'N',
                        clusterCsp: null
                    }
                }
            }

            this.$store.commit('cluster/setCluster', cluster)
            this.clusterAddDialog = true
        },
        updateClusterActivation(id, activation) {
            let yn = (activation == true) ? 'N' : 'Y'
            axios.put('/api/admin-cluster/clusters/' + id + '/activation/' + yn).then(response => {
                let cluster = this.$store.state.cluster.clusters.find(o => o.id == id) || {}
                cluster.activation = (yn === 'N') ? false : true
            }).catch(error => {
                this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
            })
        },
        removeCluster(id, name) {
            this.$zadmin.confirm(name + '을(를) 삭제하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-cluster/clusters/' + id).then(response => {
                    if (response && response.status === 204) {
                        this.getClusters()
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
        }
    }
}
</script>
