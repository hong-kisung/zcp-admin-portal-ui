<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">Storage Cost</h1>
        <h2 class="display-sub mb-3">IKS Storage 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
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
                <b-form-group label="Object Storage Price(₩)/Monthly" label-for="objectStoragePricePerMonth" :label-cols="3" label-class="required">
                    <b-form-input type="number" id="objectStoragePricePerMonth" required></b-form-input>
                    <b-form-invalid-feedback id="objectStoragePricePerMonth">
                        Object Storage Price(₩)/Monthly 값을 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <div class="mb-3">
                <b-button variant="success" size="sm" v-b-modal.storage-modal><i class="icon-plus"></i> File Storage 추가</b-button>
            </div>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="2">Disk Size(GB)</th>
                            <th colspan="3">0.25 IOPS</th>
                            <th colspan="3">2 IOPS</th>
                            <th colspan="3">4 IOPS</th>
                            <th colspan="3">10 IOPS</th>
                            <th rowspan="2">Actions</th>
                        </tr>
                        <tr>
                            <th>List Price($)/Hourly</th>
                            <th>List Price(₩)/Monthly</th>
                            <th>SK Price(₩)/Monthly</th>
                            <th>List Price($)/Hourly</th>
                            <th>List Price(₩)/Monthly</th>
                            <th>SK Price(₩)/Monthly</th>
                            <th>List Price($)/Hourly</th>
                            <th>List Price(₩)/Monthly</th>
                            <th>SK Price(₩)/Monthly</th>
                            <th>List Price($)/Hourly</th>
                            <th>List Price(₩)/Monthly</th>
                            <th>SK Price(₩)/Monthly</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>4000</td>
                            <td class="text-right">$ 0.002</td>
                            <td class="text-right">₩ 350,400</td>
                            <td class="text-right">₩ 262,800</td>
                            <td class="text-right">$ 0.1875</td>
                            <td class="text-right">₩ 876,000</td>
                            <td class="text-right">₩ 657,000</td>
                            <td class="text-right">$ 0.0068</td>
                            <td class="text-right">₩ 1,191,360</td>
                            <td class="text-right">₩ 893,520</td>
                            <td class="text-right">$ 0.7275</td>
                            <td class="text-right">₩ 2,960,880</td>
                            <td class="text-right">₩ 2,960,880</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.storage-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>4000</td>
                            <td class="text-right">$ 0.002</td>
                            <td class="text-right">₩ 350,400</td>
                            <td class="text-right">₩ 262,800</td>
                            <td class="text-right">$ 0.1875</td>
                            <td class="text-right">₩ 876,000</td>
                            <td class="text-right">₩ 657,000</td>
                            <td class="text-right">$ 0.0068</td>
                            <td class="text-right">₩ 1,191,360</td>
                            <td class="text-right">₩ 893,520</td>
                            <td class="text-right">$ 0.7275</td>
                            <td class="text-right">₩ 2,960,880</td>
                            <td class="text-right">₩ 2,960,880</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.storage-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </VuePerfectScrollbar>
            
            <!-- modal : File Storage 추가 -->
            <b-modal id="storage-modal" scrollable title="File Storage" centered>
                <b-form>
                    <b-form-group label="Disk Size(GB)" label-for="disk" :label-cols="4" label-class="required">
                        <b-form-input type="number" id="disk" required></b-form-input>
                        <b-form-invalid-feedback id="disk">
                            Disk Size(GB) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="0.25 IOPS Hourly($)" label-for="iops1PricePerHour" :label-cols="4" label-class="required">
                        <b-form-input type="number" id="iops1PricePerHour" required></b-form-input>
                        <b-form-invalid-feedback id="iops1PricePerHour">
                            0.25 IOPS Hourly($) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="2 IOPS Hourly($)" label-for="iops2PricePerHour" :label-cols="4" label-class="required">
                        <b-form-input type="number" id="iops2PricePerHour" required></b-form-input>
                        <b-form-invalid-feedback id="iops2PricePerHour">
                            2 IOPS Hourly($) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="4 IOPS Hourly($)" label-for="iops3PricePerHour" :label-cols="4" label-class="required">
                        <b-form-input type="number" id="iops3PricePerHour" required></b-form-input>
                        <b-form-invalid-feedback id="iops3PricePerHour">
                            4 IOPS Hourly($) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="10 IOPS Hourly($)" label-for="iops4PricePerHour" :label-cols="4" label-class="required">
                        <b-form-input type="number" id="iops4PricePerHour" required></b-form-input>
                        <b-form-invalid-feedback id="iops4PricePerHour">
                            10 IOPS Hourly($) 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : File Storage 추가 -->
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
                        <b-button variant="outline-warning" size="sm" v-b-modal.iks-storage-modal><i class="icon-info"></i> {{data.item.view}}</b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
            
            <!-- modal : IKS Storage -->
            <b-modal id="iks-storage-modal" scrollable title="IKS Storage" size="xl" centered>
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
                    <b-form-group label="Object Storage Price(₩)/Monthly" label-for="objectStoragePricePerMonth" :label-cols="3" label-class="required">
                        <b-form-input type="number" id="objectStoragePricePerMonth" required></b-form-input>
                        <b-form-invalid-feedback id="objectStoragePricePerMonth">
                            Object Storage Price(₩)/Monthly 값을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <hr>
                <div>
                    <h5 class="mb-3">File Storages</h5>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <table class="table table-sm table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th rowspan="2">Disk Size(GB)</th>
                                    <th colspan="3">0.25 IOPS</th>
                                    <th colspan="3">2 IOPS</th>
                                    <th colspan="3">4 IOPS</th>
                                    <th colspan="3">10 IOPS</th>
                                </tr>
                                <tr>
                                    <th>List Price($)/Hourly</th>
                                    <th>List Price(₩)/Monthly</th>
                                    <th>SK Price(₩)/Monthly</th>
                                    <th>List Price($)/Hourly</th>
                                    <th>List Price(₩)/Monthly</th>
                                    <th>SK Price(₩)/Monthly</th>
                                    <th>List Price($)/Hourly</th>
                                    <th>List Price(₩)/Monthly</th>
                                    <th>SK Price(₩)/Monthly</th>
                                    <th>List Price($)/Hourly</th>
                                    <th>List Price(₩)/Monthly</th>
                                    <th>SK Price(₩)/Monthly</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>4000</td>
                                    <td class="text-right">$ 0.002</td>
                                    <td class="text-right">₩ 350,400</td>
                                    <td class="text-right">₩ 262,800</td>
                                    <td class="text-right">$ 0.1875</td>
                                    <td class="text-right">₩ 876,000</td>
                                    <td class="text-right">₩ 657,000</td>
                                    <td class="text-right">$ 0.0068</td>
                                    <td class="text-right">₩ 1,191,360</td>
                                    <td class="text-right">₩ 893,520</td>
                                    <td class="text-right">$ 0.7275</td>
                                    <td class="text-right">₩ 2,960,880</td>
                                    <td class="text-right">₩ 2,960,880</td>
                                </tr>
                                <tr>
                                    <td>4000</td>
                                    <td class="text-right">$ 0.002</td>
                                    <td class="text-right">₩ 350,400</td>
                                    <td class="text-right">₩ 262,800</td>
                                    <td class="text-right">$ 0.1875</td>
                                    <td class="text-right">₩ 876,000</td>
                                    <td class="text-right">₩ 657,000</td>
                                    <td class="text-right">$ 0.0068</td>
                                    <td class="text-right">₩ 1,191,360</td>
                                    <td class="text-right">₩ 893,520</td>
                                    <td class="text-right">$ 0.7275</td>
                                    <td class="text-right">₩ 2,960,880</td>
                                    <td class="text-right">₩ 2,960,880</td>
                                </tr>
                            </tbody>
                        </table>
                    </VuePerfectScrollbar>
                </div>
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="ok()"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : IKS Storage -->
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