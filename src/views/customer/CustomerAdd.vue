<template>
    <b-modal id="customer-add-modal" size="lg" scrollable title="Customer" centered no-close-on-backdrop v-model="show" @close="cancel" @cancel="cancel" @ok="saveCustomer">
        <b-form class="needs-validation" novalidate>
            <b-form-group label="Customer Name(EN)" label-for="customerNameEn" :label-cols="3" label-class="required">
                <b-form-input type="text" id="nameEn" required placeholder="Customer Name(EN)을 입력해주세요." v-model="customer.nameEn"></b-form-input>
                <b-form-invalid-feedback id="nameEn">
                    Customer Name(EN)을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Customer Name(KR)" label-for="customerNameKr" :label-cols="3" label-class="required">
                <b-form-input type="text" id="nameKr" required placeholder="Customer Name(KR)을 입력해주세요." v-model="customer.nameKr"></b-form-input>
                <b-form-invalid-feedback id="nameKr">
                    Customer Name(KR)을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Cloud Service Provider" label-for="cloudServiceProviderGoogle" :label-cols="3">
                <div class="d-flex align-items-center justify-content-between">
                    <img src="img/img_logo_aws.png" width="22" alt="Amazon Web System Logo" class="mx-1">
                    <b-form-input type="text" id="awsCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.awsCspId"></b-form-input>
                    <b-form-input type="text" id="awsAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.awsAccountAlias"></b-form-input>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-2">
                    <img src="img/img_logo_azure.png" width="22" alt="Azure Logo" class="mx-1">
                    <b-form-input type="text" id="azureCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.azureCspId"></b-form-input>
                    <b-form-input type="text" id="azureAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.azureAccountAlias"></b-form-input>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-2">
                    <img src="img/img_logo_cloud.png" width="22" alt="Cloud Z Logo" class="mx-1">
                    <b-form-input type="text" id="cloudzCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.cloudzCspId"></b-form-input>
                    <b-form-input type="text" id="cloudzAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.cloudzAccountAlias"></b-form-input>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-2">
                    <img src="img/img_logo_gcs.png" width="22" height="22" alt="Google Clould System Logo" class="mx-1">
                    <b-form-input type="text" id="gcpCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.gcpCspId"></b-form-input>
                    <b-form-input type="text" id="gcpAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.gcpAccountAlias"></b-form-input>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-2">
                    <img src="img/img_logo_ibm.png" width="22" alt="IBM Logo" class="mx-1">
                    <b-form-input type="text" id="ibmCspId" placeholder="Account ID" class="mx-1" style="width: 40%;" v-model="customer.ibmCspId"></b-form-input>
                    <b-form-input type="text" id="ibmAccountAlias" placeholder="Alias" style="width: 60%;" v-model="customer.ibmAccountAlias"></b-form-input>
                </div>
            </b-form-group>
        </b-form>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="secondary" @click="cancel">취소</b-button>
            <b-button variant="primary" @click="saveCustomer"><i class="icon-check"></i> 저장</b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            show: false
        }
    },
    computed: {
        customer: function() {
            return this.$store.state.customer.customer
        },
    },
    created() {

    },
    props: [
        'dialogVisible'
    ],
    watch: {
        dialogVisible: function() {
            this.show = this.dialogVisible
        }
    },
    methods: {
        saveCustomer(e) {
            if (!this.customer.nameEn) {
				this.$zadmin.alert('Customer Name(EN)을 입력하세요.')
				e.preventDefault()
				return false
            }
            if (!this.customer.nameKr) {
				this.$zadmin.alert('Customer Name(KR)을 입력하세요.')
				e.preventDefault()
				return false
            }

            let customer = {
                "nameEn": this.customer.nameEn,
                "nameKr": this.customer.nameKr,
                "customerCloudAccounts": [
                    {
                        "cspCode": "AWS",
                        "cspId": this.customer.awsCspId || '',
                        "accountAlias": this.customer.awsAccountAlias || ''
                    },
                    {
                        "cspCode": "AZURE",
                        "cspId": this.customer.azureCspId || '',
                        "accountAlias": this.customer.azureAccountAlias || ''
                    },
                    {
                        "cspCode": "CLOUDZ",
                        "cspId": this.customer.cloudzCspId || '',
                        "accountAlias": this.customer.cloudzAccountAlias || ''
                    },
                    {
                        "cspCode": "GCP",
                        "cspId": this.customer.gcpCspId || '',
                        "accountAlias": this.customer.gcpAccountAlias || ''
                    },
                    {
                        "cspCode": "IBM",
                        "cspId": this.customer.ibmCspId || '',
                        "accountAlias": this.customer.ibmAccountAlias || ''
                    }
                ]
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                this.$store.dispatch('customer/saveCustomer', {customer: customer, reload: this.$emit('fire-dialog-closed')})
            });
        },
        cancel() {
            this.$emit('fire-dialog-closed')
        }
    }
}
</script>
