<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Estimates 용량산정</h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" class="mr-2" v-b-modal.environment-modal><i class="icon-plus"></i> Environment 추가</b-button>
                <b-button variant="secondary" size="sm" class="mr-2" disabled><i class="icon-reload"></i> Environment 수정</b-button>
                <b-button variant="danger" size="sm" class="mr-2" disabled><i class="icon-close"></i> Environment 삭제</b-button>
                <b-button variant="success" size="sm" v-b-modal.application-modal><i class="icon-plus"></i> Application 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="3">Environment</th>
                            <th colspan="6">Application</th>
                            <th colspan="4">Container</th>
                            <th colspan="2">Total Size</th>
                            <th rowspan="3">Actions</th>
                        </tr>
                        <tr>
                            <th rowspan="2">Kind</th>
                            <th rowspan="2">Instance<br>Number</th>
                            <th colspan="2">CPU (Millicore)</th>
                            <th colspan="2">Memory (MB)</th>
                            <th colspan="2">CPU (Millicore)</th>
                            <th colspan="2">Memory (MB)</th>
                            <th rowspan="2">CPU (Millicore)</th>
                            <th rowspan="2">Memory (MB)</th>
                        </tr>
                        <tr>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Request</th>
                            <th>Limit</th>
                            <th>Request</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr class="bg-secondary">
                            <th colspan="11" class="text-right font-weight-bold">합계</th>
                            <td class="text-right font-weight-bold">112 Core</td>
                            <td class="text-right font-weight-bold">224 GB</td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td rowspan="3">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="dev" value="1">
                                    <label class="custom-control-label" for="dev">dev</label>
                                </div>
                            </td>
                            <td>App</td>
                            <td class="text-center">1</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">98,304</td>
                            <td rowspan="3" class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.application-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10" rowspan="2" class="text-right font-weight-bold bg-dark">Summary</td>
                            <td class="text-right font-weight-bold bg-success">48,000 Millicore</td>
                            <td class="text-right font-weight-bold bg-info">98,304 MB</td>
                        </tr>
                        <tr>
                            <td class="text-right font-weight-bold bg-success">48 Core</td>
                            <td class="text-right font-weight-bold bg-info">96 GB</td>
                        </tr>
                        
                        <tr>
                            <td rowspan="3">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="prod" value="2">
                                    <label class="custom-control-label" for="prod">prod</label>
                                </div>
                            </td>
                            <td>App</td>
                            <td class="text-center">1</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">98,304</td>
                            <td class="text-right">48,000</td>
                            <td class="text-right">98,304</td>
                            <td rowspan="3" class="text-center">
                                <b-button variant="secondary" size="sm" class="mr-1" v-b-modal.application-modal><i class="fa fa-pencil"></i></b-button>
                                <b-button variant="danger" size="sm"><i class="fa fa-close"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="10" rowspan="2" class="text-right font-weight-bold bg-dark">Summary</td>
                            <td class="text-right font-weight-bold bg-success">48,000 Millicore</td>
                            <td class="text-right font-weight-bold bg-info">98,304 MB</td>
                        </tr>
                        <tr>
                            <td class="text-right font-weight-bold bg-success">48 Core</td>
                            <td class="text-right font-weight-bold bg-info">96 GB</td>
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
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Environment -->
            
            <!-- modal : Application -->
            <b-modal id="application-modal" scrollable title="Application" centered>
                <b-form>
                    <b-form-group label="Application Kind" label-for="appName" :label-cols="7" label-class="required">
                        <b-form-input type="text" id="appName" required></b-form-input>
                        <b-form-invalid-feedback id="appName">
                            Application Kind를 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Application Instance Number" label-for="instanceNumber" :label-cols="7">
                        <b-form-input type="number" id="instanceNumber"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application CPU(Millicore) Min" label-for="appCpuMin" :label-cols="7">
                        <b-form-input type="number" id="appCpuMin"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application CPU(Millicore) Max" label-for="appCpuMax" :label-cols="7">
                        <b-form-input type="number" id="appCpuMax"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application Memory(MB) Min" label-for="appMemoryMin" :label-cols="7">
                        <b-form-input type="number" id="appMemoryMin"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application Memory(MB) Max" label-for="appMemoryMax" :label-cols="7">
                        <b-form-input type="number" id="appMemoryMax"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container CPU(Millicore) Request" label-for="podCpuRequest" :label-cols="7">
                        <b-form-input type="number" id="podCpuRequest"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container CPU(Millicore) Limit" label-for="podCpuLimit" :label-cols="7">
                        <b-form-input type="number" id="podCpuLimit"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container Memory(Millicore) Request" label-for="podMemoryRequest" :label-cols="7">
                        <b-form-input type="number" id="podCpuRequest"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container Memory(Millicore) Limit" label-for="podMemoryLimit" :label-cols="7">
                        <b-form-input type="number" id="podCpuLimit"></b-form-input>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="cancel()">취소</b-button>
                    <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Application -->
        </b-card>
        <div>
            <router-link :to="{ path: '/estimate/' }">
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