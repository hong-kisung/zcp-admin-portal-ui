<template>
    <b-tab>
        <template slot="title">
            <i class="icon-list mr-1"></i> Clusters
        </template>
        <b-form-group>
            <b-button variant="success" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-plus"></i> Environment 추가</b-button>
            <b-button variant="secondary" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-reload"></i> Environment 수정</b-button>
            <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Environment 삭제</b-button>
            <b-button variant="success" size="sm" v-b-modal.product-modal><i class="icon-plus"></i> Product 추가</b-button>
        </b-form-group>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-bordered">
                <colgroup>
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: 12.5%;">
                    <col style="width: *;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Environment Type</th>
                        <th>Status</th>
                        <th>Billing YN</th>
                        <th>Billing Start Date</th>
                        <th>Product</th>
                        <th>Contract Size</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowspan="2" class="bg-dark">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="prod" value="1">
                                <label class="custom-control-label" for="prod">prod</label>
                            </div>
                        </th>
                        <td rowspan="2" class="text-center">Operation</td>
                        <td rowspan="2" class="text-center">Y</td>
                        <td rowspan="2" class="text-center">2020-01-01</td>
                        <td class="text-center">ZCP</td>
                        <td class="text-center">4GB</td>
                        <td class="text-center">2019-10-30</td>
                        <td class="text-center">
                            <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                            <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">ZDB</td>
                        <td class="text-center">10GB</td>
                        <td class="text-center">2019-10-30</td>
                        <td class="text-center">
                            <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                            <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-dark">
                            <div class="custom-control custom-checkbox custom-control-inline">
                                <input type="checkbox" class="custom-control-input" id="dev" value="2">
                                <label class="custom-control-label" for="dev">dev</label>
                            </div>
                        </th>
                        <td class="text-center">Developemnt</td>
                        <td class="text-center">N</td>
                        <td class="text-center">2020-01-01</td>
                        <td class="text-center">ZCP</td>
                        <td class="text-center">4GB</td>
                        <td class="text-center">2019-10-30</td>
                        <td class="text-center">
                            <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.product-modal><i class="fa fa-pencil"></i></b-button>
                            <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </VuePerfectScrollbar>

        <!-- modal : Environment -->
        <b-modal id="environment-modal" title="Environment" centered>
            <b-form>
                <b-form-group label="Environment" label-for="environment" :label-cols="4" label-class="required">
                    <b-form-select id="environment" :plain="true" :options="['선택', 'dev', 'qa', 'stage', 'prod', 'combination']" value="선택" required>
                    </b-form-select>
                    <b-form-invalid-feedback id="environment">
                        Environment를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Status" label-for="environmentStatus" :label-cols="4" label-class="required">
                    <b-form-select id="environmentStatus" :plain="true" :options="['선택', 'Development', 'Operation']" value="선택" required></b-form-select>
                    <b-form-invalid-feedback id="environmentStatus">
                        Status를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Billing YN" label-for="billingYn" :label-cols="4">
                    <b-form-radio-group id="billingYn" v-model="billingSelected" name="billingYn" class="mt-1">
                        <b-form-radio value="yes">Yes</b-form-radio>
                        <b-form-radio value="no">No</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <b-form-group label="Billing Start Date" label-for="billingStartDate" :label-cols="4">
                    <b-form-input type="date" id="billingStartDate"></b-form-input>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="cancel()">취소</b-button>
                <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Environment -->

        <!-- modal : Product -->
        <b-modal id="product-modal" title="Product" centered>
            <b-form>
                <b-form-group label="Product" label-for="product" :label-cols="4" label-class="required">
                    <b-form-select id="product" :plain="true" :options="['선택', 'ZCP', 'ZDB']" value="선택" required>
                    </b-form-select>
                    <b-form-invalid-feedback id="product">
                        Product를 선택해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Contract Size" label-for="contractSize" :label-cols="4">
                    <b-input-group>
                        <b-form-input type="number" id="contractSize"></b-form-input>
                        <b-input-group-append><b-input-group-text>GB</b-input-group-text></b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="cancel()">취소</b-button>
                <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Product -->

        <div class="tab-bottom-btn text-center">
            <router-link :to="{ path: '/project/' }">
                <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
            </router-link>
        </div>
    </b-tab>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Switch as cSwitch } from '@coreui/vue'

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

        }
    }
}
</script>
