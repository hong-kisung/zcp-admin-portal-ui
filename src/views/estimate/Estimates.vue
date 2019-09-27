<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Estimates</h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" v-b-modal.project-info-modal><i class="icon-plus"></i> Project 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'project' ? '' : '15%' }">
                    </template>
                    <template slot="button_basic" slot-scope="data">
                        <b-button variant="outline-info" size="sm" v-b-modal.project-info-modal><i class="icon-info"></i> {{data.item.button_basic}}</b-button>
                    </template>
                    <template slot="button_volume" slot-scope="data">
                        <router-link :to="{ path: '/estimate/estvolume' }">
                            <b-button variant="outline-success" size="sm"><i class="icon-info"></i> {{data.item.button_volume}}</b-button>
                        </router-link>
                    </template>
                    <template slot="button_cost" slot-scope="data">
                        <router-link :to="{ path: '/estimate/estcost' }">
                            <b-button variant="outline-warning" size="sm"><i class="icon-info"></i> {{data.item.button_cost}}</b-button>
                        </router-link>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : Project 추가 -->
            <b-modal id="project-info-modal" title="Project 기본정보" centered>
                <b-form>
                    <b-form-group label="Project명" label-for="name" :label-cols="3" label-class="required">
                        <b-form-input type="text" id="name" required placeholder="Project명을 입력해주세요."></b-form-input>
                        <b-form-invalid-feedback id="name">
                            Project명을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Customer" label-for="customerId" :label-cols="3" label-class="required">
                        <b-form-select id="customerId" :plain="true" :options="['선택', 'FSK', 'SK C&C', 'SK E&S', 'SK 네트웍스', 'SK 이노베이션']" value="선택" required>
                        </b-form-select>
                        <b-form-invalid-feedback id="customerId">
                            Customer를 선택해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="설명" label-for="description" :label-cols="3">
                        <b-form-input type="text" id="description" placeholder="설명을 입력해주세요."></b-form-input>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Project 추가 -->
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    components: {
        VuePerfectScrollbar
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
            fields: [
                { key: 'project', label: 'Project명' },
                { key: 'button_basic', label: '기본정보', tdClass: 'text-center' },
                { key: 'button_volume', label: '용량산정', tdClass: 'text-center' },
                { key: 'button_cost', label: '원가견적', tdClass: 'text-center' },
                { key: 'date', label: '생성일시', tdClass: 'text-center' }
            ],
            items: [
                { project: 'SV Management', button_basic: '기본정보', button_volume: '용량산정', button_cost: '원가견적', date: '2019-09-03 17:54:12' },
                { project: '공유인프라', button_basic: '기본정보', button_volume: '용량산정', button_cost: '원가견적', date: '2019-09-02 17:54:12' }
            ]
        }
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>