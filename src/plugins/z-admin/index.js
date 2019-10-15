import AlertTemplate from './alert-modal.vue'
import ConfirmTemplate from './confirm-modal.vue'

let alertInstance
let confirmInstance

const ZAdmin = function() {
	
}

const Alert = function (message, callback) {
	let Tpl = this.extend(AlertTemplate)
	alertInstance = new Tpl()
	
	alertInstance.$props.callback = callback
	alertInstance.$data.message = message
	alertInstance.$data.show = true
	document.body.appendChild(alertInstance.$mount().$el)
}

const Confirm = function (message, callback) {
	let Tpl = this.extend(ConfirmTemplate)
	confirmInstance = new Tpl()
	
	confirmInstance.$props.callback = callback
	confirmInstance.$data.message = message
	confirmInstance.$data.show = true
	document.body.appendChild(confirmInstance.$mount().$el)
}

export default {
	install(Vue) {
		Vue.prototype.$zadmin = ZAdmin.bind(Vue)
		Vue.prototype.$zadmin.alert = Alert.bind(Vue)
		Vue.prototype.$zadmin.confirm = Confirm.bind(Vue)
	}
}