<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">MSP Cost</h1>
        <h2 class="display-sub mb-3">MSP 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
        <b-card>
            <b-form>
                <b-form-group label="버전" label-for="version" :label-cols="3">
                    <b-form-input type="text" id="version" value="15" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                    <b-form-input type="text" id="createdDt" value="2019-09-09 18:19:35.0" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="설명" label-for="description" :label-cols="3">
                    <b-form-input type="text" id="description" placeholder="설명을 입력해주세요."></b-form-input>
                </b-form-group>
            </b-form>
            <div class="mb-3">
                <b-button variant="success" size="sm" v-b-modal.mem-modal><i class="icon-plus"></i> Mem Spec 추가</b-button>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Alias</th>
                            <th>Memory Spec(GB) 초과</th>
                            <th>MSP 비용(₩)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowspan="6" class="bg-dark">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="dev-cloudZService-Cloud Z CP" value="1">
                                    <label class="custom-control-label" for="dev-cloudZService-Cloud Z CP">Cloud Z CP</label>
                                </div>
                            </th>
                            <td>micro</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>small</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>medium</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>large</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>xlarge</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>huge</td>
                            <td class="text-center">191</td>
                            <td class="text-right">₩ 2,520,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <th rowspan="6" class="bg-dark">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="dev-cloudZService-Cloud Z DB" value="1">
                                    <label class="custom-control-label" for="dev-cloudZService-Cloud Z DB">Cloud Z DB</label>
                                </div>
                            </th>
                            <td>micro</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>small</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>medium</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>large</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>xlarge</td>
                            <td class="text-center">0</td>
                            <td class="text-right">₩ 105,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>huge</td>
                            <td class="text-center">191</td>
                            <td class="text-right">₩ 2,520,000</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.mem-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </VuePerfectScrollbar>
            
            <!-- modal : Mem Spec 추가 -->
            <b-modal id="mem-modal" scrollable title="MSP Cost" centered>
                <b-form>
                    <b-form-group label="Alias" label-for="alias" :label-cols="5" label-class="required">
                        <b-form-input type="text" id="alias" required></b-form-input>
                        <b-form-invalid-feedback id="alias">
                            Alias를 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Memory Spec(GB) 초과" label-for="memory" :label-cols="5" label-class="required">
                        <b-form-input type="number" id="memory" required></b-form-input>
                        <b-form-invalid-feedback id="memory">
                            Memory Spec(GB) 초과 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="MSP 비용(₩)" label-for="cost" :label-cols="5" label-class="required">
                        <b-form-input type="number" id="cost" required></b-form-input>
                        <b-form-invalid-feedback id="cost">
                            MSP 비용(₩) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Mem Spec 추가 -->
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary"><i class="icon-check"></i> 저장</b-button>
        </div>
        <b-card>
            <h5 class="mb-2">History</h5>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="fields" :items="items">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'description' ? '50%' : '' }">
                    </template>
                    <template slot="view" slot-scope="data">
                        <b-button variant="outline-warning" size="sm" v-b-modal.msp-modal><i class="icon-info"></i> {{data.item.view}}</b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : MSP 비용 -->
            <b-modal id="msp-modal" scrollable title="MSP 비용" size="lg" centered>
                <b-form>
                    <b-form-group label="버전" label-for="version" :label-cols="3">
                        <b-form-input type="text" id="version" value="15" readonly></b-form-input>
                    </b-form-group>
                    <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                        <b-form-input type="text" id="createdDt" value="2019-09-09 18:19:35.0" readonly></b-form-input>
                    </b-form-group>
                    <b-form-group label="설명" label-for="description" :label-cols="3">
                        <b-form-input type="text" id="description" placeholder="설명을 입력해주세요."></b-form-input>
                    </b-form-group>
                </b-form>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Alias</th>
                                <th>Memory Spec(GB) 초과</th>
                                <th>MSP 비용(₩)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowspan="6" class="bg-dark">Cloud Z CP</th>
                                <td>micro</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>small</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>medium</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>large</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>xlarge</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>huge</td>
                                <td class="text-center">191</td>
                                <td class="text-right">₩ 2,520,000</td>
                            </tr>
                            <tr>
                                <th rowspan="6" class="bg-dark">Cloud Z DB</th>
                                <td>micro</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>small</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>medium</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>large</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>xlarge</td>
                                <td class="text-center">0</td>
                                <td class="text-right">₩ 105,000</td>
                            </tr>
                            <tr>
                                <td>huge</td>
                                <td class="text-center">191</td>
                                <td class="text-right">₩ 2,520,000</td>
                            </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="ok()"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : MSP 비용 -->
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
                { key: 'description', label: '설명' },
                { key: 'date', label: '생성일시', tdClass: 'text-center' },
                { key: 'creator', label: '생성자', tdClass: 'text-center' },
                { key: 'view', label: '상세보기', tdClass: 'text-center' }
            ],
            items: [
                { version: '1', description: '설명이 기입되는 곳입니다.', date: '2019-09-03 17:54:12', creator: 'cloudzcp-admin', view: '상세보기' }
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