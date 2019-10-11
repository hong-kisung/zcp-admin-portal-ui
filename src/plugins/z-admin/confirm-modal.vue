<template>
    <b-modal hide-header v-model="show">
        <p class="my-3">{{ message }}</p>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="secondary" @click="cancelClicked()">취소</b-button>
            <b-button variant="primary" @click="okClicked"><i class="icon-check"></i> 확인</b-button>
        </template>
    </b-modal>
</template>
<script>
export default {
	data() {
		return {
			show : false,
			message: '',
			buttons: []
		}
	},
	props: {
		callback: {type: Function}
	},
	methods : {
		cancelClicked: function() {
			this.show = false
			this.callback && this.callback(false)
		},
		okClicked() {
			this.show = false
			this.callback && this.callback(true)
		}
	}
}
</script>