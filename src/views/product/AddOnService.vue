<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Add-on Service 관리</h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" class="mr-2" v-b-modal.service-add-modal><i class="icon-plus"></i> Add-on Service 추가</b-button>
                <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Add-on Service 삭제</b-button>
                <b-button variant="success" size="sm" v-b-modal.application-modal><i class="icon-plus"></i> Application 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Application</th>
                            <th>CPU(Millicore)</th>
                            <th>Memory(MB)</th>
                            <th>Disk(GB)</th>
                            <th>Storage Type</th>
                            <th>Backup(Y/N)</th>
                            <th>Etc</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr class="bg-secondary">
                            <th colspan="2" class="text-right font-weight-bold">합계</th>
                            <td class="text-right font-weight-bold">15,670</td>
                            <td class="text-right font-weight-bold">32,338</td>
                            <td class="text-right font-weight-bold">520</td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="font-weight-bold"></td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td rowspan="2">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="portal">
                                    <label class="custom-control-label" for="portal">Portal</label>
                                </div>
                            </td>
                            <td>Console UI Application</td>
                            <td class="text-right">800</td>
                            <td class="text-right">1,538</td>
                            <td class="text-right">20</td>
                            <td class="text-center">Block</td>
                            <td class="text-center">Y</td>
                            <td>Retention - 20 days</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.application-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr class="bg-info">
                            <td class="text-right font-weight-bold">Summary</td>
                            <td class="text-right font-weight-bold">800</td>
                            <td class="text-right font-weight-bold">1,538</td>
                            <td class="text-right font-weight-bold">20</td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="font-weight-bold"></td>
                            <td class="text-center font-weight-bold"></td>
                        </tr>
                        <tr>
                            <td rowspan="3">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="iam">
                                    <label class="custom-control-label" for="iam">IAM</label>
                                </div>
                            </td>
                            <td>Console IAM PostgreSQL</td>
                            <td class="text-right">800</td>
                            <td class="text-right">1,538</td>
                            <td class="text-right">20</td>
                            <td class="text-center">Block</td>
                            <td class="text-center">Y</td>
                            <td>Retention - 20 days</td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.application-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>Console IAM KeyCloak</td>
                            <td class="text-right">800</td>
                            <td class="text-right">1,538</td>
                            <td class="text-right">20</td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td></td>
                            <td class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.application-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr class="bg-info">
                            <td class="text-right font-weight-bold">Summary</td>
                            <td class="text-right font-weight-bold">800</td>
                            <td class="text-right font-weight-bold">1,538</td>
                            <td class="text-right font-weight-bold">20</td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="font-weight-bold"></td>
                            <td class="text-center font-weight-bold"></td>
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
            
            <!-- modal : Application -->
            <b-modal id="application-modal" scrollable title="Application" centered>
                <b-form>
                    <b-form-group label="Application" label-for="applicationName" :label-cols="4" label-class="required">
                        <b-form-input type="text" id="applicationName" required></b-form-input>
                        <b-form-invalid-feedback id="applicationName">
                            Application을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="CPU(Millicore)" label-for="appCpu" :label-cols="4">
                        <b-form-input type="number" id="appCpu"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Memory(MB)" label-for="appMemory" :label-cols="4">
                        <b-form-input type="number" id="appMemory"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Disk(GB)" label-for="appDisk" :label-cols="4">
                        <b-form-input type="number" id="appDisk"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Storage Type" label-for="storageType" :label-cols="4">
                        <b-form-select id="storageType" :plain="true" :options="['선택', 'Block', 'File', 'Local', 'Object', 'combination']" value="선택">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Backup(Y/N)e" label-for="backupYn" :label-cols="4">
                        <b-form-select id="backupYn" :plain="true" :options="['선택', 'Y', 'N']" value="선택">
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="설명" label-for="description" :label-cols="4">
                        <b-form-input type="text" id="description" placeholder="설명을 입력해주세요."></b-form-input>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Application -->
        </b-card>
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