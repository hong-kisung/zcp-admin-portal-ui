<template>
    <b-modal hide-header v-model="show">
        <p class="my-3">{{ message }}</p>
        <template v-slot:modal-footer="{ ok }">
            <b-button variant="primary" @click="okClicked()"><i class="icon-check"></i> 확인</b-button>
        </template>
    </b-modal>
</template>
<script>
export default {
	data() {
		return {
			show : false,
			message: ''
		}
	},
	props: {
		callback: {type: Function}
	},
	methods : {
		okClicked: function() {
			this.show = false
			this.callback && this.callback()
		}
	}
}
</script>