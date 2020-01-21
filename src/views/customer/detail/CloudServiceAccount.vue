<template>
    <b-tab>
        <template slot="title">
            <i class="icon-cloud-download mr-1"></i> Cloud Accounts
        </template>
        <b-form-group>
            <b-button variant="success" size="sm" class="mr-2" @click="customerServiceAccountAdd"><i class="icon-plus"></i> Cloud Account 추가</b-button>
        </b-form-group>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="customerCloudAccount_fields" :items="customerCloudAccounts">
                <!--
                <template v-slot:table-colgroup="scope">
                    <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'no' ? '5%' : '' }">
                </template>
                -->

                <template slot="no" slot-scope="data">
                    {{ customerCloudAccounts.length - data.index }}
                </template>
                <template slot="cspId" slot-scope="data">
                    <b-link @click="getCustomerServiceAccount(data.item.id)">{{ data.item.cspId }}</b-link>
                </template>
                <template slot="cspCode" slot-scope="data">
                    <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1" v-if="data.item.cspCode == 'GCP'">
                    <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1" v-if="data.item.cspCode == 'AWS'">
                    <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1" v-if="data.item.cspCode == 'CLOUDZ'">
                    <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1" v-if="data.item.cspCode == 'IBM'">
                    <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1" v-if="data.item.cspCode == 'AZURE'">
                </template>
                <template slot="actions" slot-scope="data">
                    <b-button variant="danger" size="sm" @click="removeCustomerServiceAccount(data.item.id, data.item.cspId)"><i class="fa fa-close"></i></b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>

        <!-- modal : Cloud Service Accounts 추가 -->
        <b-modal id="cloud-service-accounts-add-modal" size="mg" scrollable title="Cloud Account" centered no-close-on-backdrop v-model="customerCloudAccountDialog" @close="closeCustomerCloudAccountDialog">
            <b-form>
                <b-form-group label="Cloud Service" label-for="cloudService" :label-cols="3" label-class="required">
                    <b-form-select id="cloudService" :plain="true" v-model="customerCloudAccount.cspCode" required>
                        <option value="">선택</option>
                        <option value="IBM">IBM</option>
                        <option value="AWS">AWS</option>
                        <option value="AZURE">Azure</option>
                        <option value="GCP">GCP</option>
                        <option value="CLOUDZ">CloudZ</option>
                    </b-form-select>
                    <b-form-invalid-feedback id="cloudService">
                        Cloud Service를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Account ID" label-for="cspId" :label-cols="3" label-class="required">
                    <b-form-input type="text" id="accountId" placeholder="Account ID를 입력해주세요." v-model="customerCloudAccount.cspId"></b-form-input>
                </b-form-group>
                <b-form-group label="Account Alias" label-for="accountAlias" :label-cols="3">
                    <b-form-input type="text" id="accountAlias" placeholder="Account Alias를 입력해주세요." v-model="customerCloudAccount.accountAlias"></b-form-input>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeCustomerCloudAccountDialog">취소</b-button>
                <b-button variant="primary" @click="saveCustomerServiceAccount"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Customer 추가 -->

        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/customer/' }">
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
        customerCloudAccounts: function() {
            return this.$store.state.customer.customerCloudAccounts
        },
        customerCloudAccount: function() {
            return this.$store.state.customer.customerCloudAccount
        }
    },
    watch: {
        customerCloudAccountDialog (val) {
			val || this.closeCustomerCloudAccountDialog()
		}
    },
    data()  {
        return {
            customerCloudAccount_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'cspCode', label: 'Cloud Service', tdClass: 'text-center' },
                { key: 'cspId', label: 'Account ID' },
                { key: 'accountAlias', label: 'Account Alias' },
                { key: 'createdDt', label: 'Created Date', tdClass: 'text-center' },
                { key: 'actions', label: 'Actions', tdClass: 'text-center' }
            ],
            id: 0,
            customerCloudAccountId: 0,
            customerCloudAccountDialog: false,
            customerCloudAccountEdited: false
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

            this.$store.dispatch('customer/getCustomerCloudAccounts', {id: this.id})
        },
        closeCustomerCloudAccountDialog() {
			this.customerCloudAccountDialog = false
		},
        customerServiceAccountAdd() {
            this.$store.commit('customer/setCustomerCloudAccount', {})
            this.customerCloudAccountEdited = false
            this.customerCloudAccountDialog = true
        },
        saveCustomerServiceAccount(e) {
            if (!this.customerCloudAccount.cspCode) {
                this.$zadmin.alert('Cloud Service를 선택하세요.')
                e.preventDefault()
                return false
            }
            if (!this.customerCloudAccount.cspId) {
                this.$zadmin.alert('Account ID를 입력하세요.')
                e.preventDefault()
                return false
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                if (this.customerCloudAccountEdited) {
                    this.updateCustomerServiceAccount()
                } else {
                    this.createCustomerServiceAccount()
                }
            })
        },
        createCustomerServiceAccount() {
            axios.post('/api/admin-customer/customers/' + this.id + '/cloud-accounts', this.customerCloudAccount).then(response => {
                if (response.status === 201) {
                    this.$store.dispatch('customer/getCustomerCloudAccounts', {id: this.id})
                    this.closeCustomerCloudAccountDialog()
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
        updateCustomerServiceAccount() {
            axios.put('/api/admin-customer/customers/' + this.id + '/cloud-accounts/' + this.customerCloudAccountId, this.customerCloudAccount).then(response => {
                if (response.status === 200) {
                    this.$store.dispatch('customer/getCustomerCloudAccounts', {id: this.id})
                    this.closeCustomerCloudAccountDialog()
                    this.$zadmin.alert('저장 되었습니다.')
                } else {
                    this.$zadmin.alert('처리 중 오류가 발생하였습니다.')
                }
            })
        },
        removeCustomerServiceAccount(customerCloudAccountId, cspId) {
            this.$zadmin.confirm(cspId + '을(를) 삭제 하시겠습니까?', (result) => {
                if (!result) return false

                axios.delete('/api/admin-customer/customers/' + this.id + '/cloud-accounts/' + customerCloudAccountId).then(response => {
                    if (response && response.status === 204) {
                        this.$store.dispatch('customer/getCustomerCloudAccounts', {id: this.id})
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
        getCustomerServiceAccount(customerCloudAccountId) {
            this.$store.commit('customer/setCustomerCloudAccount', {})
            this.$store.dispatch('customer/getCustomerCloudAccount', {id: this.id, customerCloudAccountId: customerCloudAccountId})

            this.customerCloudAccountId = customerCloudAccountId
            this.customerCloudAccountEdited = true
            this.customerCloudAccountDialog = true
        }
    }
}
</script>
