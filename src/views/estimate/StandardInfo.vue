<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">Standard Infomation</h1>
        <h2 class="display-sub mb-3">기준정보의 최신 버전을 조회 및 수정합니다.</h2>
        
        <b-card>
            <b-form>
                <b-form-group label="버전" label-for="version" :label-cols="4">
                    <b-form-input type="text" id="version" value="15" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="생성일시" label-for="createdDt" :label-cols="4">
                    <b-form-input type="text" id="createdDt" value="2019-09-09 18:19:35.0" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="Platform Reserved CPU" label-for="platformCpuPerWorker" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="platformCpuPerWorker" required></b-form-input>
                    <b-form-invalid-feedback id="platformCpuPerWorker">
                        Platform Reserved CPU 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Platform Reserved Memory" label-for="platformMemoryPerWorker" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="platformMemoryPerWorker" required></b-form-input>
                    <b-form-invalid-feedback id="platformMemoryPerWorker">
                        Platform Reserved Memory 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="IBM 할인율(%)" label-for="ibmDcRate" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="ibmDcRate" required></b-form-input>
                    <b-form-invalid-feedback id="ibmDcRate">
                        IBM 할인율(%) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="매매기준환율(₩)" label-for="exchangeRate" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="exchangeRate" required></b-form-input>
                    <b-form-invalid-feedback id="exchangeRate">
                        매매기준환율(₩) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="IP Allocation Cost(₩)" label-for="ipAllocation" :label-cols="4" label-class="required">
                    <b-form-input type="number" id="ipAllocation" required></b-form-input>
                    <b-form-invalid-feedback id="ipAllocation">
                        IP Allocation Cost(₩) 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="설명" label-for="description" :label-cols="4">
                    <b-form-input type="text" id="description" placeholder="설명을 입력해주세요."></b-form-input>
                </b-form-group>
            </b-form>
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary"><i class="icon-check"></i> 저장</b-button>
        </div>
        <b-card>
            <h5 class="mb-2">History</h5>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'description' ? '40%' : '' }">
                    </template>
                </b-table>
            </VuePerfectScrollbar>
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    data()  {
        return {
            fields: [
                { key: 'version', label: '버전', tdClass: 'text-center' },
                { key: 'cpu', label: 'Platform Reserved CPU', tdClass: 'text-center' },
                { key: 'memory', label: 'Platform Reserved Memory', tdClass: 'text-center' },
                { key: 'ibm', label: 'IBM 할인율(%)', tdClass: 'text-center' },
                { key: 'rate', label: '매매기준완율(₩)', tdClass: 'text-right' },
                { key: 'ipcost', label: 'IP Allocation Cost(₩)', tdClass: 'text-right' },
                { key: 'description', label: '설명' },
                { key: 'date', label: '생성일시', tdClass: 'text-center' }
            ],
            items: [
                { version: '2', cpu: '1', memory: '3', ibm: '25', rate: '₩ 1,200', ipcost: '₩ 18,640', description: '', date: '2019-09-03 17:54:12' },
                { version: '1', cpu: '1', memory: '2', ibm: '25', rate: '₩ 1,200', ipcost: '₩ 18,640', description: '설명이 기입되는 곳입니다.', date: '2019-09-03 17:54:12' }
            ]
        }
    },
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
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        }
    }
}
</script>