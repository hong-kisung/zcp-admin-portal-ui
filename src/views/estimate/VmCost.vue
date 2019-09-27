<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">VM Cost</h1>
        <h2 class="display-sub mb-3">IKS VM 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
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
                <b-button variant="success" size="sm" v-b-modal.vm-modal><i class="icon-plus"></i> VM 추가</b-button>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="2">Name</th>
                            <th rowspan="2">Cores</th>
                            <th rowspan="2">Memory(GB)</th>
                            <th rowspan="2">NW Speed(Gbps)</th>
                            <th rowspan="2">Available CPU</th>
                            <th rowspan="2">Available Memory(GB)</th>
                            <th colspan="3">Shared</th>
                            <th colspan="3">Dedicated</th>
                            <th rowspan="2">Actions</th>
                        </tr>
                        <tr>
                            <th>List Price($)/Hourly</th>
                            <th>Graduated Tier Price(₩)/Monthly</th>
                            <th>Graduated Tier SK Price(₩)/Monthly</th>
                            <th>List Price($)/Hourly</th>
                            <th>Graduated Tier Price(₩)/Monthly</th>
                            <th>Graduated Tier SK Price(₩)/Monthly</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>b2c.32x128</td>
                            <td class="text-right">32</td>
                            <td class="text-right">128</td>
                            <td class="text-right">1</td>
                            <td class="text-right">31</td>
                            <td class="text-right">125</td>
                            <td class="text-right">$ 1.79</td>
                            <td class="text-right">₩ 1,437,360</td>
                            <td class="text-right">₩ 1,078,020</td>
                            <td class="text-right">$ 2.21</td>
                            <td class="text-right">₩ 1,776,240</td>
                            <td class="text-right">₩ 1,332,180</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.vm-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>b2c.32x128</td>
                            <td class="text-right">32</td>
                            <td class="text-right">128</td>
                            <td class="text-right">1</td>
                            <td class="text-right">31</td>
                            <td class="text-right">125</td>
                            <td class="text-right">$ 1.79</td>
                            <td class="text-right">₩ 1,437,360</td>
                            <td class="text-right">₩ 1,078,020</td>
                            <td class="text-right">$ 2.21</td>
                            <td class="text-right">₩ 1,776,240</td>
                            <td class="text-right">₩ 1,332,180</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.vm-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </VuePerfectScrollbar>
            
            <!-- modal : VM 추가 -->
            <b-modal id="vm-modal" scrollable size="lg" title="VM" centered>
                <b-form>
                    <b-form-group label="Name" label-for="name" :label-cols="7" label-class="required">
                        <b-form-input type="text" id="name" required></b-form-input>
                        <b-form-invalid-feedback id="name">
                            Name을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Cores" label-for="core" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="core" required></b-form-input>
                        <b-form-invalid-feedback id="core">
                            Cores 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Memory (GB)" label-for="memory" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="memory" required></b-form-input>
                        <b-form-invalid-feedback id="memory">
                            Memory (GB) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="NW Speed (Gbps)" label-for="nwSpeed" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="nwSpeed" required></b-form-input>
                        <b-form-invalid-feedback id="nwSpeed">
                            NW Speed (Gbps) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Shared List Price($)/Hourly" label-for="sharedListPricePerHour" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="sharedListPricePerHour" required></b-form-input>
                        <b-form-invalid-feedback id="sharedListPricePerHour">
                            Shared List Price($)/Hourly 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Shared Graduated Tier Price(₩)/Monthly" label-for="sharedGraduatedTierPricePerMonth" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="sharedGraduatedTierPricePerMonth" required></b-form-input>
                        <b-form-invalid-feedback id="sharedGraduatedTierPricePerMonth">
                            Shared Graduated Tier Price(₩)/Monthly 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Dedicated List Price($)/Hourly" label-for="dedicatedListPricePerHour" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="dedicatedListPricePerHour" required></b-form-input>
                        <b-form-invalid-feedback id="dedicatedListPricePerHour">
                            Dedicated List Price($)/Hourly 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Dedicated Graduated Tier Price(₩)/Monthly" label-for="dedicatedGraduatedTierPricePerMonth" :label-cols="7" label-class="required">
                        <b-form-input type="number" id="dedicatedGraduatedTierPricePerMonth" required></b-form-input>
                        <b-form-invalid-feedback id="dedicatedGraduatedTierPricePerMonth">
                            Dedicated Graduated Tier Price(₩)/Monthly 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : VM 추가 -->
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
                        <b-button variant="outline-warning" size="sm" v-b-modal.iks-vm-modal><i class="icon-info"></i> {{data.item.view}}</b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : IKS VM -->
            <b-modal id="iks-vm-modal" scrollable title="IKS VM" size="xl" centered>
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
                    <table class="table table-sm table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th rowspan="2">Name</th>
                                <th rowspan="2">Cores</th>
                                <th rowspan="2">Memory(GB)</th>
                                <th rowspan="2">NW Speed(Gbps)</th>
                                <th rowspan="2">Available CPU</th>
                                <th rowspan="2">Available Memory(GB)</th>
                                <th colspan="3">Shared</th>
                                <th colspan="3">Dedicated</th>
                            </tr>
                            <tr>
                                <th>List Price($)/Hourly</th>
                                <th>Graduated Tier Price(₩)/Monthly</th>
                                <th>Graduated Tier SK Price(₩)/Monthly</th>
                                <th>List Price($)/Hourly</th>
                                <th>Graduated Tier Price(₩)/Monthly</th>
                                <th>Graduated Tier SK Price(₩)/Monthly</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>b2c.32x128</td>
                                <td class="text-right">32</td>
                                <td class="text-right">128</td>
                                <td class="text-right">1</td>
                                <td class="text-right">31</td>
                                <td class="text-right">125</td>
                                <td class="text-right">$ 1.79</td>
                                <td class="text-right">₩ 1,437,360</td>
                                <td class="text-right">₩ 1,078,020</td>
                                <td class="text-right">$ 2.21</td>
                                <td class="text-right">₩ 1,776,240</td>
                                <td class="text-right">₩ 1,332,180</td>
                            </tr>
                            <tr>
                                <td>b2c.32x128</td>
                                <td class="text-right">32</td>
                                <td class="text-right">128</td>
                                <td class="text-right">1</td>
                                <td class="text-right">31</td>
                                <td class="text-right">125</td>
                                <td class="text-right">$ 1.79</td>
                                <td class="text-right">₩ 1,437,360</td>
                                <td class="text-right">₩ 1,078,020</td>
                                <td class="text-right">$ 2.21</td>
                                <td class="text-right">₩ 1,776,240</td>
                                <td class="text-right">₩ 1,332,180</td>
                            </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="ok()"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : IKS VM -->
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