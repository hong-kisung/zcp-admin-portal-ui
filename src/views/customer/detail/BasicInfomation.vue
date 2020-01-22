<template>
    <b-tab v-bind="{ active: isActive }">
        <template slot="title">
            <i class="icons cui-justify-left mr-1"></i> Basic Information
        </template>
        <b-form>
            <b-form-group label="Customer Name(EN)" label-for="customerNameEn" :label-cols="3" label-class="required">
                <b-form-input type="text" id="customerNameEn" required placeholder="Customer Name(EN)을 입력해주세요." v-model="customer.nameEn"></b-form-input>
                <b-form-invalid-feedback id="customerNameEn">
                    Customer Name(EN)을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Customer Name(KR)" label-for="customerNameKr" :label-cols="3" label-class="required">
                <b-form-input type="text" id="customerNameKr" required placeholder="Customer Name(KR)을 입력해주세요." v-model="customer.nameKr"></b-form-input>
                <b-form-invalid-feedback id="customerNameKr">
                    Customer Name(KR)을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>
        <div class="tab-bottom-btn">
            <router-link :to="{ path: '/customer/' }">
                <b-button variant="warning" class="left"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="right" @click="updateCustomer()"><i class="icon-check"></i> 저장</b-button>
        </div>
    </b-tab>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'

export default {
    components: {
        cSwitch
    },
    data()  {
        return {
            id: 0,
            isActive: false
        }
    },
    computed: {
        customer: function() {
            return this.$store.state.customer.customer
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
                this.isActive = this.$route.params.active === 'BasicInfomation' ? true : false
            }

            this.$store.dispatch('customer/getCustomer', {id: this.$route.params.id})
        },
        updateCustomer() {
            if (!this.customer.nameEn) {
                this.$zadmin.alert('Customer Name(EN)을 입력하세요.')
                e.preventDefault()
                return
            }
            if (!this.customer.nameKr) {
                this.$zadmin.alert('Customer Name(KR)을 입력하세요.')
                e.preventDefault()
                return
            }

            this.$zadmin.confirm('저장 하시겠습니까?', (result) => {
                if (!result) return false;

                this.$store.dispatch('customer/updateCustomer', {id: this.id, customer: this.customer})
            });
        }
    }
}
</script>
