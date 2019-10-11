<template>
    <b-form>
        <b-form-group label="버전" label-for="version" :label-cols="4">
            <b-form-input type="text" id="version" v-model="generalInfo.version" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="생성일시" label-for="createdDt" :label-cols="4">
            <b-form-input type="text" id="createdDt" v-model="generalInfo.createdDt" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Platform Reserved CPU" label-for="platformCpuPerWorker" :label-cols="4" label-class="required">
            <b-form-input type="number" id="platformCpuPerWorker" v-model="generalInfo.platformCpuPerWorker" required></b-form-input>
            <b-form-invalid-feedback id="platformCpuPerWorker">
                Platform Reserved CPU 값을 입력해주세요.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Platform Reserved Memory" label-for="platformMemoryPerWorker" :label-cols="4" label-class="required">
            <b-form-input type="number" id="platformMemoryPerWorker" v-model="generalInfo.platformMemoryPerWorker" required></b-form-input>
            <b-form-invalid-feedback id="platformMemoryPerWorker">
                Platform Reserved Memory 값을 입력해주세요.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="IBM 할인율(%)" label-for="ibmDcRate" :label-cols="4" label-class="required">
            <b-form-input type="number" id="ibmDcRate" v-model="generalInfo.ibmDcRate" required></b-form-input>
            <b-form-invalid-feedback id="ibmDcRate">
                IBM 할인율(%) 값을 입력해주세요.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="매매기준환율(₩)" label-for="exchangeRate" :label-cols="4" label-class="required">
            <b-form-input type="number" id="exchangeRate" v-model="generalInfo.exchangeRate" required></b-form-input>
            <b-form-invalid-feedback id="exchangeRate">
                매매기준환율(₩) 값을 입력해주세요.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="IP Allocation Cost(₩)" label-for="ipAllocation" :label-cols="4" label-class="required">
            <b-form-input type="number" id="ipAllocation" v-model="generalInfo.ipAllocation" required></b-form-input>
            <b-form-invalid-feedback id="ipAllocation">
                IP Allocation Cost(₩) 값을 입력해주세요.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="설명" label-for="description" :label-cols="4">
            <b-form-input type="text" id="description" v-model="generalInfo.description" placeholder="설명을 입력해주세요."></b-form-input>
        </b-form-group>
    </b-form>
</template>

<script>
export default {
	props: [
		'generalInfo',
		'editable'
	],
	created () {
	},
	methods: {
	}
}
</script>