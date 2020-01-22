<template>
    <b-modal id="customer-add-modal" size="lg" scrollable title="Customer" centered no-close-on-backdrop v-model="show" @close="cancel" @cancel="cancel" @ok="saveCustomer">
        <b-form class="needs-validation" novalidate>
            <b-form-group label="Customer Name(EN)" label-for="customerNameEn" :label-cols="3" label-class="required">
                <b-form-input type="text" id="nameEn" required placeholder="Customer Name(EN)을 입력해주세요." v-model="customer.nameEn" maxlength="50"></b-form-input>
                <b-form-invalid-feedback id="nameEn">
                    Customer Name(EN)을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Customer Name(KR)" label-for="customerNameKr" :label-cols="3" label-class="required">
                <b-form-input type="text" id="nameKr" required placeholder="Customer Name(KR)을 입력해주세요." v-model="customer.nameKr" maxlength="50"></b-form-input>
                <b-form-invalid-feedback id="nameKr">
                    Customer Name(KR)을 입력해주세요.
                </b-form-invalid-feedback>
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

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false

                this.$store.dispatch('customer/saveCustomer', {customer: this.customer, reload: this.$emit('fire-dialog-closed')})
            });
        },
        cancel() {
            this.$emit('fire-dialog-closed')
        }
    }
}
</script>
