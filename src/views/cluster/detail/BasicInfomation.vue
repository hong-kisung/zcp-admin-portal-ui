<template>
    <b-tab active>
        <template slot="title">
            <i class="icons cui-justify-left mr-1"></i> Basic Information
        </template>
        <b-form>
            <b-form-group label="Cluster ID" label-for="clusterId" :label-cols="3" label-class="required">
                <b-form-input type="text" id="clusterId" required placeholder="Cluster ID를 입력해주세요." maxlength="50" v-model="cluster.clusterId"></b-form-input>
                <b-form-invalid-feedback id="clusterId">
                    Cluster ID를 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Cluster Name" label-for="clusterName" :label-cols="3" label-class="required">
                <b-form-input type="text" id="clusterName" required placeholder="Cluster Name을 입력해주세요." maxlength="100" v-model="cluster.clusterName"></b-form-input>
                <b-form-invalid-feedback id="clusterName">
                    Cluster Name을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Status" label-for="status" :label-cols="3" label-class="required">
                <b-form-select id="status" :plain="true" required v-model="cluster.status">
                    <option value="null">선택</option>
                    <option value="Running">Running</option>
                    <option value="Deleted">Deleted</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="Environment Type" label-for="enviromentType" :label-cols="3" label-class="required">
                <b-form-select id="enviromentType" :plain="true" required v-model="cluster.enviromentType">
                    <option value="null">선택</option>
                    <option value="dev">dev</option>
                    <option value="qa">qa</option>
                    <option value="stage">stage</option>
                    <option value="prod">prod</option>
                    <option value="combination">combination</option>
                </b-form-select>
                <b-form-invalid-feedback id="enviromentType">
                    Environment Type을 선택해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Network Architecture Type" label-for="nwArchType" :label-cols="3">
                <b-form-select id="nwArchType" :plain="true" v-model="cluster.nwArchType">
                    <option value="null">선택</option>
                    <option value="Private">Private Only</option>
                    <option value="Public">Public Only</option>
                    <option value="Private_Public">Private + Public</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="SRE Integration" label-for="sreIntegrationYn" :label-cols="3">
                <b-form-radio-group id="sreIntegrationYn" name="sreIntegrationYn" class="mt-1" v-model="cluster.sreIntegrationYn">
                    <b-form-radio value="Y">Yes</b-form-radio>
                    <b-form-radio value="N">No</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Multi Tenant" label-for="multiTenantYn" :label-cols="3">
                <b-form-radio-group id="multiTenantYn" name="multiTenantYn" class="mt-1" v-model="cluster.multiTenantYn">
                    <b-form-radio value="Y">Yes</b-form-radio>
                    <b-form-radio value="N">No</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Installation Account" label-for="mspCspAccount" :label-cols="3">
                <b-form-input type="text" id="mspCspAccount" maxlength="50" v-model="cluster.mspCspAccount"></b-form-input>
            </b-form-group>
            <b-form-group label="Installation Completed Date" label-for="installCompleteDt" :label-cols="3">
                <b-form-input type="date" id="installCompleteDt" v-model="cluster.installCompleteDt"></b-form-input>
            </b-form-group>
            <b-form-group label="Installation Auditor" label-for="installAuditor" :label-cols="3">
                <b-form-input type="text" id="installAuditor" maxlength="50" v-model="cluster.installAuditor"></b-form-input>
            </b-form-group>
            <b-form-group label="Managed Kubernetes Version" label-for="managedKubernetesVersion" :label-cols="3">
                <b-form-input type="text" id="managedKubernetesVersion" maxlength="10" v-model="cluster.mngK8sVersion"></b-form-input>
            </b-form-group>
        </b-form>
        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/cluster/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="right" @click="updateCluster"><i class="icon-check"></i> 저장</b-button>
        </div>
    </b-tab>

</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'
import axios from 'axios'

export default {
    components: {
        cSwitch
    },
    computed: {
        cluster: function() {
            return this.$store.state.cluster.cluster
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
            this.$store.dispatch('cluster/getCluster', {id: this.id})
        },
        updateCluster(e) {
            if (!this.cluster.clusterId) {
                this.$zadmin.alert('Cluster ID를 입력하세요.')
                e.preventDefault()
                return false
            }
            if (!this.cluster.clusterName) {
                this.$zadmin.alert('Cluster Name을 입력하세요.')
                e.preventDefault()
                return false
            }
            if (!this.cluster.status) {
                this.$zadmin.alert('Status를 선택하세요.')
                e.preventDefault()
                return false
            }
            if (!this.cluster.enviromentType) {
                this.$zadmin.alert('Enviroment Type을 선택하세요.')
                e.preventDefault()
                return false
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                axios.put('/api/admin-cluster/clusters/' + this.id, this.cluster).then(response => {
        			if (response.status === 200) {
                        this.$store.dispatch('cluster/getCluster', {id: this.id})
        				this.$zadmin.alert('저장 되었습니다.')
        			} else {
        				this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
        			}
        		})
            })
        }
    }
}
</script>
