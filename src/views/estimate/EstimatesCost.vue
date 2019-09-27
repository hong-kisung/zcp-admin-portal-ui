<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Estimates 원가 견적서
            <div class="float-right">
                <b-button variant="secondary" id="historyShowBtn" class="mr-2" @click="showHistory()"><i class="icon-clock"></i> History 조회</b-button>
                <b-button variant="primary"><i class="icon-refresh"></i> 견적서 Update</b-button>
            </div>
        </h1>
        <b-tabs class="mb-4">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> 요약
                </template>
                <b-form>
                    <b-form-group label="버전" label-for="version" :label-cols="3">
                        <b-form-input type="text" id="version" value="15" readonly></b-form-input>
                    </b-form-group>
                    <b-form-group label="생성일시" label-for="createdDt" :label-cols="3">
                        <b-form-input type="text" id="createdDt" value="2019-09-09 18:19:35.0" readonly></b-form-input>
                    </b-form-group>
                    <b-form-group label="라벨" label-for="label" :label-cols="3">
                        <b-form-input type="text" id="label"></b-form-input>
                    </b-form-group>
                    <b-form-group label="설명" label-for="description" :label-cols="3">
                        <b-form-input type="text" id="description"></b-form-input>
                    </b-form-group>
                    <b-form-group label="기준정보 버전" label-for="generalVersion" :label-cols="3">
                        <b-button variant="outline-success" class="mr-2 font-xs" v-b-modal.basic-modal><i class="icon-info"></i> 현재버전(1) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-b-modal.basic-modal><i class="icon-info"></i> 최신버전(2) 조회</b-button>
                    </b-form-group>
                    <b-form-group>
                        <b-form-row>
                            <b-col sm="3">
                                <label for="iksVmVersionVersion" class="col-form-label">VM 버전 <span class="text-warning font-xs ml-2"><i class="icon-info"></i> 최신 버전입니다.</span></label>
                            </b-col>
                            <b-col>
                                <b-button variant="outline-success" class="mr-2 font-xs" v-b-modal.iks-vm-modal><i class="icon-info"></i> 현재버전(1) 조회</b-button>
                            </b-col>
                        </b-form-row>
                    </b-form-group>
                    <b-form-group label="Storage 버전" label-for="iksStorageVersionVersion" :label-cols="3">
                        <b-button variant="outline-success" class="mr-2 font-xs" v-b-modal.iks-storage-modal><i class="icon-info"></i> 현재버전(4) 조회</b-button>
                        <b-button variant="outline-info" class="font-xs" v-b-modal.iks-storage-modal><i class="icon-info"></i> 최신버전(6) 조회</b-button>
                    </b-form-group>
                    <b-form-group>
                        <b-form-row>
                            <b-col sm="3">
                                <label for="mspCostVersionVersion" class="col-form-label">MSP 비용 버전 <span class="text-danger font-xs ml-2"><i class="icon-info"></i> 업데이트가 필요합니다.</span></label>
                            </b-col>
                            <b-col>
                                <b-button variant="outline-success" class="mr-2 font-xs" v-b-modal.msp-modal><i class="icon-info"></i> 현재버전(1) 조회</b-button>
                            </b-col>
                        </b-form-row>
                    </b-form-group>
                </b-form>
                <hr>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Environment</th>
                                <th>Product</th>
                                <th>Cloud 사용료(₩)</th>
                                <th>인건비(₩)</th>
                                <th>월 비용 합계(₩)</th>
                                <th>GB당 원가(₩)</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr class="bg-secondary">
                                <th colspan="2" class="text-right">계</th>
                                <td class="text-right font-weight">₩ 8,438,325</td>
                                <td class="text-right font-weight">₩ 3,207,500</td>
                                <td class="text-right font-weight">₩ 11,645,825</td>
                                <td class="text-right font-weight"></td>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <th rowspan="3" class="bg-dark">dev</th>
                                <th>Cloud Z CP</th>
                                <td class="text-right">₩ 2,439,970</td>
                                <td class="text-right">₩ 420,000</td>
                                <td class="text-right">₩ 2,859,970</td>
                                <td class="text-right">₩ 25,417</td>
                            </tr>
                            <tr>
                                <th>Cloud Z DB</th>
                                <td class="text-right">₩ 411,594</td>
                                <td class="text-right">₩ 157,500</td>
                                <td class="text-right">₩ 569,094</td>
                                <td class="text-right">₩ 4,288</td>
                            </tr>
                            <tr>
                                <th>Cloud Z DB Storage</th>
                                <td class="text-right">₩ 229,950</td>
                                <td class="text-right">₩ 0</td>
                                <td class="text-right">₩ 229,950</td>
                                <td class="text-right">₩ 0</td>
                            </tr>
                            <tr>
                                <th rowspan="3" class="bg-dark">prod</th>
                                <th>Cloud Z CP</th>
                                <td class="text-right">₩ 4,159,922</td>
                                <td class="text-right">₩ 2,000,000</td>
                                <td class="text-right">₩ 6,159,922</td>
                                <td class="text-right">₩ 32,500</td>
                            </tr>
                            <tr>
                                <th>Cloud Z DB</th>
                                <td class="text-right">₩ 805,974</td>
                                <td class="text-right">₩ 630,000</td>
                                <td class="text-right">₩ 1,435,974</td>
                                <td class="text-right">₩ 6,297</td>
                            </tr>
                            <tr>
                                <th>Cloud Z DB Storage</th>
                                <td class="text-right">₩ 390,915</td>
                                <td class="text-right">₩ 0</td>
                                <td class="text-right">₩ 390,915</td>
                                <td class="text-right">₩ 0</td>
                            </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
                
                <!-- modal : 기준정보 -->
                <b-modal id="basic-modal" scrollable title="기준정보" size="lg" centered>
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
                    <template v-slot:modal-footer="{ ok }">
                        <b-button variant="secondary" @click="ok()"><i class="icon-close"></i> 닫기</b-button>
                    </template>
                </b-modal>
                <!-- // modal : 기준정보 -->
                
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
                        <table class="table table-sm table-striped table-bordered">
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
                            <table class="table table-sm table-striped table-bordered">
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
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icons cui-screen-desktop mr-1"></i> dev
                </template>
                
                <!-- Cloud Z Service -->
                <div>
                    <h2 class="display-tit middle mb-3">
                        Cloud Z Service
                        <div class="float-right">
                            <b-button variant="success" size="sm" class="mr-2" v-b-modal.product-add-modal><i class="icon-plus"></i> Product 추가</b-button>
                            <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Product 삭제</b-button>
                            <b-button variant="success" size="sm" v-b-modal.classification-add-modal><i class="icon-plus"></i> Classification 추가</b-button>
                        </div>
                    </h2>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <table class="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Service</th>
                                    <th>Classification</th>
                                    <th>Classification Type</th>
                                    <th>Machine Type</th>
                                    <th>Hardware Type</th>
                                    <th>Number</th>
                                    <th>Cores</th>
                                    <th>Memory(GB)</th>
                                    <th>Storage Type</th>
                                    <th>Storage IOPS</th>
                                    <th>Storage Size(GB)</th>
                                    <th>Monthly(₩)</th>
                                    <th>Yearly(₩)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr class="bg-gray-500">
                                    <th colspan="12" class="text-right">Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <th rowspan="3" class="bg-dark">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="dev-cloudZService-Cloud Z CP" value="1">
                                            <label class="custom-control-label" for="dev-cloudZService-Cloud Z CP">Cloud Z CP</label>
                                        </div>
                                    </th>
                                    <th rowspan="2">Platform Service</th>
                                    <td>Management Node</td>
                                    <td>VM</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Management Storage - Gitea</td>
                                    <td>Block_Storage</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center">Endurance</td>
                                    <td class="text-center">4 IOPS	</td>
                                    <td class="text-center">20</td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr class="bg-secondary">
                                    <th colspan="11" class="text-right">Cloud Z CP Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th rowspan="3" class="bg-dark">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="dev-cloudZService-Cloud Z DB" value="1">
                                            <label class="custom-control-label" for="dev-cloudZService-Cloud Z DB">Cloud Z DB</label>
                                        </div>
                                    </th>
                                    <th rowspan="2">Platform Service</th>
                                    <td>Management Node</td>
                                    <td>VM</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Management Storage - Gitea</td>
                                    <td>Block_Storage</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center">Endurance</td>
                                    <td class="text-center">4 IOPS	</td>
                                    <td class="text-center">20</td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr class="bg-secondary">
                                    <th colspan="11" class="text-right">Cloud Z DB Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </VuePerfectScrollbar>
                </div>
                <!-- // Cloud Z Service -->
                
                <hr> 
                
                <!-- Application Storage Service -->
                <div>
                    <h2 class="display-tit middle mb-3">
                        Application Storage Service
                        <div class="float-right">
                            <b-button variant="success" size="sm" class="mr-2" v-b-modal.product-add-modal><i class="icon-plus"></i> Product 추가</b-button>
                            <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Product 삭제</b-button>
                            <b-button variant="success" size="sm" v-b-modal.classification-add-modal><i class="icon-plus"></i> Classification 추가</b-button>
                        </div>
                    </h2>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <table class="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Classification</th>
                                    <th>Classification Type</th>
                                    <th>Number</th>
                                    <th>Storage Type</th>
                                    <th>Storage IOPS</th>
                                    <th>Storage Size(GB)</th>
                                    <th>Monthly(₩)</th>
                                    <th>Yearly(₩)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr class="bg-gray-500">
                                    <th colspan="7" class="text-right">Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <th rowspan="3" class="bg-dark">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="dev-storageService-Cloud Z DB" value="1">
                                            <label class="custom-control-label" for="dev-storageService-Cloud Z DB">Cloud Z DB</label>
                                        </div>
                                    </th>
                                    <td>DB Storage</td>
                                    <td>VM</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>DB Storage</td>
                                    <td>Block_Storage</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">Endurance</td>
                                    <td class="text-center">4 IOPS	</td>
                                    <td class="text-center">20</td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr class="bg-secondary">
                                    <th colspan="6" class="text-right">Cloud Z CP Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </VuePerfectScrollbar>
                </div>
                <!-- // Application Storage Service -->
                
                <!-- modal : Product 추가 -->
                <b-modal id="product-add-modal" title="Product 추가" centered>
                    <b-form>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="cloud-z-cp" value="1">
                            <label class="custom-control-label" for="cloud-z-cp">Cloud Z CP</label>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input" id="cloud-z-db" value="1">
                            <label class="custom-control-label" for="cloud-z-db">Cloud Z DB</label>
                        </div>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Product 추가 -->
                
                <!-- modal : Classification 추가 -->
                <b-modal id="classification-add-modal" scrollable title="Classification" size="lg" centered>
                    <b-form>
                        <b-form-group label="Product" label-for="productName" :label-cols="4" label-class="required">
                            <b-form-select id="productName" :plain="true" :options="['선택', 'Cloud Z CP', 'Cloud Z DB']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="productName">
                                Product를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Service" label-for="serviceName" :label-cols="4" label-class="required">
                            <b-form-select id="serviceName" :plain="true" :options="['선택']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="serviceName">
                                Service를 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Classification" label-for="classificationName" :label-cols="4" label-class="required">
                            <b-form-select id="classificationName" :plain="true" :options="['선택']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="classificationName">
                                Classification을 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Addon Application" label-for="addonId" :label-cols="4">
                            <b-form-select id="addonId" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Storage Type" label-for="storageType" :label-cols="4">
                            <b-form-select id="storageType" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Storage Performance" label-for="enduranceIops" :label-cols="4">
                            <b-form-select id="enduranceIops" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Storage Size(GB)" label-for="iksFileStorageId" :label-cols="4">
                            <b-form-select id="iksFileStorageId" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Number" label-for="number" :label-cols="4">
                            <b-form-input type="number" id="number"></b-form-input>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Classification 추가 -->
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icons cui-screen-desktop mr-1"></i> prod
                </template>
                
                <!-- Cloud Z Service -->
                <div>
                    <h2 class="display-tit middle mb-3">
                        Cloud Z Service
                        <div class="float-right">
                            <b-button variant="success" size="sm" class="mr-2" v-b-modal.product-add-modal><i class="icon-plus"></i> Product 추가</b-button>
                            <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Product 삭제</b-button>
                            <b-button variant="success" size="sm" v-b-modal.classification-add-modal><i class="icon-plus"></i> Classification 추가</b-button>
                        </div>
                    </h2>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <table class="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Service</th>
                                    <th>Classification</th>
                                    <th>Classification Type</th>
                                    <th>Machine Type</th>
                                    <th>Hardware Type</th>
                                    <th>Number</th>
                                    <th>Cores</th>
                                    <th>Memory(GB)</th>
                                    <th>Storage Type</th>
                                    <th>Storage IOPS</th>
                                    <th>Storage Size(GB)</th>
                                    <th>Monthly(₩)</th>
                                    <th>Yearly(₩)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr class="bg-gray-500">
                                    <th colspan="12" class="text-right">Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <th rowspan="3" class="bg-dark">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="prod-cloudZService-Cloud Z CP" value="1">
                                            <label class="custom-control-label" for="prod-cloudZService-Cloud Z CP">Cloud Z CP</label>
                                        </div>
                                    </th>
                                    <th rowspan="2">Platform Service</th>
                                    <td>Management Node</td>
                                    <td>VM</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Management Storage - Gitea</td>
                                    <td>Block_Storage</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center">Endurance</td>
                                    <td class="text-center">4 IOPS	</td>
                                    <td class="text-center">20</td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr class="bg-secondary">
                                    <th colspan="11" class="text-right">Cloud Z CP Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th rowspan="3" class="bg-dark">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="prod-cloudZService-Cloud Z DB" value="1">
                                            <label class="custom-control-label" for="prod-cloudZService-Cloud Z DB">Cloud Z DB</label>
                                        </div>
                                    </th>
                                    <th rowspan="2">Platform Service</th>
                                    <td>Management Node</td>
                                    <td>VM</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Management Storage - Gitea</td>
                                    <td>Block_Storage</td>
                                    <td class="text-center">b2c.8x32</td>
                                    <td class="text-center">shared</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">16</td>
                                    <td class="text-center">64</td>
                                    <td class="text-center">Endurance</td>
                                    <td class="text-center">4 IOPS	</td>
                                    <td class="text-center">20</td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr class="bg-secondary">
                                    <th colspan="11" class="text-right">Cloud Z DB Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </VuePerfectScrollbar>
                </div>
                <!-- // Cloud Z Service -->
                
                <hr> 
                
                <!-- Application Storage Service -->
                <div>
                    <h2 class="display-tit middle mb-3">
                        Application Storage Service
                        <div class="float-right">
                            <b-button variant="success" size="sm" class="mr-2" v-b-modal.product-add-modal><i class="icon-plus"></i> Product 추가</b-button>
                            <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Product 삭제</b-button>
                            <b-button variant="success" size="sm" v-b-modal.classification-add-modal><i class="icon-plus"></i> Classification 추가</b-button>
                        </div>
                    </h2>
                    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                        <table class="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Classification</th>
                                    <th>Classification Type</th>
                                    <th>Number</th>
                                    <th>Storage Type</th>
                                    <th>Storage IOPS</th>
                                    <th>Storage Size(GB)</th>
                                    <th>Monthly(₩)</th>
                                    <th>Yearly(₩)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr class="bg-gray-500">
                                    <th colspan="7" class="text-right">Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <th rowspan="3" class="bg-dark">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="prod-storageService-Cloud Z DB" value="1">
                                            <label class="custom-control-label" for="prod-storageService-Cloud Z DB">Cloud Z DB</label>
                                        </div>
                                    </th>
                                    <td>DB Storage</td>
                                    <td>VM</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-center"></td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>DB Storage</td>
                                    <td>Block_Storage</td>
                                    <td class="text-center">2</td>
                                    <td class="text-center">Endurance</td>
                                    <td class="text-center">4 IOPS	</td>
                                    <td class="text-center">20</td>
                                    <td class="text-right">₩ 628,380</td>
                                    <td class="text-right">₩ 7,540,560</td>
                                    <td class="text-center">
                                        <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                        <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                        <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                    </td>
                                </tr>
                                <tr class="bg-secondary">
                                    <th colspan="6" class="text-right">Cloud Z CP Summary</th>
                                    <td class="font-weight-bold text-right">2,859,970</td>
                                    <td class="font-weight-bold text-right">34,319,640</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </VuePerfectScrollbar>
                </div>
                <!-- // Application Storage Service -->
            </b-tab>
        </b-tabs>
        <div class="mb-4">
            <router-link :to="{ path: '/estimate/' }">
                <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="float-right"><i class="icon-check"></i> 저장</b-button>
        </div>
        
        <!-- local-aside : history -->
        <aside class="local-aside-menu">
            <b-tabs>
                <b-tab>
                    <template slot="title">
                        <b-link href="#" @click="showHistory()"><i class="fa fa-close"></i></b-link>
                    </template>
                    <b-list-group class="list-group-accent">
                        <b-list-group-item class="list-group-item-accent-primary bg-light text-center font-weight-bold text-muted text-uppercase">
                            <i class="fa fa-history"></i> 원가견적 History
                        </b-list-group-item>
                        <b-list-group-item href="#" class="list-group-item-accent-danger list-group-item-divider">
                            <div>Version : 15</div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;2019-09-23 14:25:23
                            </small>
                        </b-list-group-item>
                        <b-list-group-item href="#" class="list-group-item-accent-secondary">
                            <div>Version : 14</div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;2019-09-22 14:25:23
                            </small>
                        </b-list-group-item>
                        <b-list-group-item href="#" class="list-group-item-accent-secondary">
                            <div>Version : 13</div>
                            <small class="text-muted">
                                <i class="icon-calendar"></i>&nbsp;&nbsp;2019-09-21 14:25:23
                            </small>
                        </b-list-group-item>
                    </b-list-group>
                </b-tab>
            </b-tabs>
        </aside>
        <!-- // local-aside : history -->
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
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
        showHistory () {
            document.body.classList.toggle("local-aside-show")
        }
    }
}
</script>