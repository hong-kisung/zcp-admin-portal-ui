<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">원가 견적서 템플릿 관리</h1>
        <b-tabs class="mb-4">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> Cloud Z Service
                </template>
                <b-form-group>
                    <b-button variant="success" size="sm" class="mr-2" v-b-modal.service-add-modal><i class="icon-plus"></i> Service 추가</b-button>
                    <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Service 삭제</b-button>
                    <b-button variant="success" size="sm" v-b-modal.classification-add-modal><i class="icon-plus"></i> Classification 추가</b-button>
                </b-form-group>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Classification</th>
                                <th>Type</th>
                                <th>Machine Type</th>
                                <th>Hardware Type</th>
                                <th>Number</th>
                                <th>Storage Type</th>
                                <th>Storage IOPS</th>
                                <th>Storage Size(GB)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowspan="3" class="bg-dark">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="Platform Service">
                                        <label class="custom-control-label" for="Platform Service">Platform Service</label>
                                    </div>
                                </th>
                                <td>Management Node</td>
                                <td>VM</td>
                                <td class="text-center">b2c.8x32</td>
                                <td class="text-center">shared</td>
                                <td class="text-center">2</td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
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
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">1</td>
                                <td class="text-center">Endurance</td>
                                <td class="text-center">4 IOPS</td>
                                <td class="text-center">20</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td>Management Storage - Gitea PostgreSQL</td>
                                <td>Block_Storage</td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">1</td>
                                <td class="text-center">Endurance</td>
                                <td class="text-center">4 IOPS</td>
                                <td class="text-center">20</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <th rowspan="3" class="bg-dark">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="Platform Service">
                                        <label class="custom-control-label" for="Platform Service">Platform Service</label>
                                    </div>
                                </th>
                                <td>Management Node</td>
                                <td>VM</td>
                                <td class="text-center">b2c.8x32</td>
                                <td class="text-center">shared</td>
                                <td class="text-center">2</td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
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
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">1</td>
                                <td class="text-center">Endurance</td>
                                <td class="text-center">4 IOPS</td>
                                <td class="text-center">20</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td>Management Storage - Gitea PostgreSQL</td>
                                <td>Block_Storage</td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">1</td>
                                <td class="text-center">Endurance</td>
                                <td class="text-center">4 IOPS</td>
                                <td class="text-center">20</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
            
                <!-- modal : Add-on Service 추가 -->
                <b-modal id="service-add-modal" title="Add-on Service" centered>
                    <b-form>
                        <b-form-group label="Service" label-for="service" :label-cols="4" label-class="required">
                            <b-form-input type="text" id="service" placeholder="Service를 입력하세요." required>
                            </b-form-input>
                            <b-form-invalid-feedback id="service">
                                Service를 입력하세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-form>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="secondary" @click="cancel()">취소</b-button>
                        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                    </template>
                </b-modal>
                <!-- // modal : Add-on Service 추가 -->

                <!-- modal : Classification 추가 -->
                <b-modal id="classification-add-modal" scrollable title="Classification" centered>
                    <b-form>
                        <b-form-group label="Classification" label-for="classificationName" :label-cols="4" label-class="required">
                            <b-form-input type="text" id="classificationName" placeholder="Classification을 입력해주세요." required></b-form-input>
                            <b-form-invalid-feedback id="classificationName">
                                Classification을 입력해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Classification Type" label-for="classificationType" :label-cols="4" label-class="required">
                            <b-form-select id="classificationType" :plain="true" :options="['선택', 'VM', 'File_Storage', 'Block_Storage', 'Object_Storage', 'IP_Allocation', 'Labor_Cost']" value="선택" required></b-form-select>
                            <b-form-invalid-feedback id="classificationType">
                                Classification Type을 선택해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Machine Type" label-for="machineType" :label-cols="4">
                            <b-form-select id="machineType" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Hardware Type" label-for="hardwareType" :label-cols="4">
                            <b-form-select id="hardwareType" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Number" label-for="number" :label-cols="4">
                            <b-form-input type="number" id="number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Storage IOPS" label-for="enduranceIops" :label-cols="4">
                            <b-form-select id="enduranceIops" :plain="true" :options="['선택']" value="선택"></b-form-select>
                        </b-form-group>
                        <b-form-group label="Storage Size(GB)" label-for="iksFileStorageId" :label-cols="4">
                            <b-form-select id="iksFileStorageId" :plain="true" :options="['선택']" value="선택"></b-form-select>
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
                    <i class="icons cui-justify-left mr-1"></i> Application Storage Service
                </template>
                
                <b-form-group>
                    <b-button variant="success" size="sm" class="mr-2" v-b-modal.service-add-modal><i class="icon-plus"></i> Service 추가</b-button>
                    <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Service 삭제</b-button>
                    <b-button variant="success" size="sm" v-b-modal.classification-add-modal><i class="icon-plus"></i> Classification 추가</b-button>
                </b-form-group>
                <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Classification</th>
                                <th>Type</th>
                                <th>Machine Type</th>
                                <th>Hardware Type</th>
                                <th>Number</th>
                                <th>Storage Type</th>
                                <th>Storage IOPS</th>
                                <th>Storage Size(GB)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowspan="2" class="bg-dark">
                                    <div class="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" class="custom-control-input" id="Application Storage">
                                        <label class="custom-control-label" for="Application Storage">Application Storage</label>
                                    </div>
                                </th>
                                <td>Application Storage</td>
                                <td>File_Storage</td>
                                <td class="text-center">b2c.8x32</td>
                                <td class="text-center">shared</td>
                                <td class="text-center">2</td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                </td>
                            </tr>
                            <tr>
                                <td>Application Storage</td>
                                <td>Block_Storage</td>
                                <td class="text-center"></td>
                                <td class="text-center"></td>
                                <td class="text-center">1</td>
                                <td class="text-center">Endurance</td>
                                <td class="text-center">4 IOPS</td>
                                <td class="text-center">20</td>
                                <td class="text-center">
                                    <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.classification-add-modal><i class="fa fa-pencil"></i></b-button>
                                    <b-button variant="danger" size="sm" class="mr-1"><i class="fa fa-close"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm" class="mr-1"><i class="fa fa-arrow-up"></i></b-button>
                                    <b-button variant="ghost-warning" size="sm"><i class="fa fa-arrow-down"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
            </b-tab>
        </b-tabs>
        <div class="mb-4">
            <router-link :to="{ path: '/product/' }">
                <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="float-right"><i class="icon-check"></i> 저장</b-button>
        </div>
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
        }
    }
}
</script>