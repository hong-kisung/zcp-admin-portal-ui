<template>
    <b-modal id="cluster-add-modal" size="lg" title="Cluster" centered scrollable centered no-close-on-backdrop v-model="show" @close="cancel" @cancel="cancel" @ok="saveCluster">
        <b-form>
            <b-form-group label="Cluster ID" label-for="clusterId" :label-cols="4" label-class="required">
                <b-form-input type="text" id="clusterId" required placeholder="Cluster ID를 입력해주세요." v-model="cluster.clusterId"></b-form-input>
                <b-form-invalid-feedback id="clusterId">
                    Cluster ID를 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Cluster Name" label-for="clusterName" :label-cols="4" label-class="required">
                <b-form-input type="text" id="clusterName" required placeholder="Cluster Name을 입력해주세요." v-model="cluster.clusterName"></b-form-input>
                <b-form-invalid-feedback id="clusterName">
                    Cluster Name을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Environment Type" label-for="enviromentType" :label-cols="4" label-class="required">
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
            <b-form-group label="Network Architecture Type" label-for="nwArchType" :label-cols="4">
                <b-form-select id="nwArchType" :plain="true" v-model="cluster.nwArchType">
                    <option value="null">선택</option>
                    <option value="Private">Private Only</option>
                    <option value="Public">Public Only</option>
                    <option value="Private_Public">Private + Public</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="SRE Integration" label-for="sreIntegrationYn" :label-cols="4">
                <b-form-radio-group id="sreIntegrationYn" name="sreIntegrationYn" class="mt-1" v-model="cluster.sreIntegrationYn">
                    <b-form-radio value="Y">Yes</b-form-radio>
                    <b-form-radio value="N">No</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Multi Tenant" label-for="multiTenantYn" :label-cols="4">
                <b-form-radio-group id="multiTenantYn" name="multiTenantYn" class="mt-1" v-model="cluster.multiTenantYn">
                    <b-form-radio value="Y">Yes</b-form-radio>
                    <b-form-radio value="N">No</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Installation Account" label-for="mspCspAccount" :label-cols="4">
                <b-form-input type="text" id="mspCspAccount" v-model="cluster.mspCspAccount"></b-form-input>
            </b-form-group>
            <b-form-group label="Installation Completed Date" label-for="installCompleteDt" :label-cols="4">
                <b-form-input type="date" id="installCompleteDt" v-model="cluster.installCompleteDt"></b-form-input>
            </b-form-group>
            <b-form-group label="Installation Auditor" label-for="installAuditor" :label-cols="4">
                <b-form-input type="text" id="installAuditor" v-model="cluster.installAuditor"></b-form-input>
            </b-form-group>
            <b-form-group label="Cloud Service Provider" label-for="cloudServiceProvider" :label-cols="4">
                <b-form-select id="cloudServiceProvider" :plain="true" v-model="cluster.clusterCsp">
                    <option value="null">선택</option>
                    <option value="IBM">IBM</option>
                    <option value="AWS">AWS</option>
                    <option value="AZURE">Azure</option>
                    <option value="GCP">GCP</option>
                    <option value="CLOUDZ">CloudZ</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="Managed Kubernetes Version" label-for="managedKubernetesVersion" :label-cols="4">
                <b-form-input type="text" id="managedKubernetesVersion" v-model="cluster.mngK8sVersion"></b-form-input>
            </b-form-group>
        </b-form>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="secondary" @click="cancel">취소</b-button>
            <b-button variant="primary" @click="saveCluster"><i class="icon-check"></i> 저장</b-button>
        </template>
    </b-modal>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            show: false
        }
    },
    props: [
        'dialogVisible'
    ],
    watch: {
        dialogVisible: function() {
            this.show = this.dialogVisible
        }
    },
    computed: {
        cluster: function() {
            return this.$store.state.cluster.cluster
        }
    },
    methods: {
        saveCluster(e) {
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
            if (!this.cluster.enviromentType) {
                this.$zadmin.alert('Enviroment Type을 선택하세요.')
                e.preventDefault()
                return false
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                axios.post('/api/admin-cluster/clusters', this.cluster).then(response => {
                    if (response.status === 201) {
                        this.$emit('fire-dialog-closed')
                        this.$store.dispatch('cluster/getClustersReload')
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
                        tthis.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                    }
                })
            })
        },
        cancel() {
            this.$emit('fire-dialog-closed')
        }
    }
}
</script>
