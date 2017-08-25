import ModalComponent from '../components/modal.vue'
export default {
	bind(el, binding, vnode, oldVnode) {
		var inst = vnode.componentInstance, originalClick = inst.click, modal = inst.$parent;
		if(!originalClick) throw new Error('Modal directive applies only on component exposing events.');
		while(modal && !(modal instanceof ModalComponent))
			modal = modal.$parent;
		if(!modal) throw new Error('Modal directive applies only inside an s-modal.');
		inst.$on('click', vnode.modalClick = function() {
			modal.invoke(binding.arg);
		});
	},
	unbind(el, binding, vnode, oldVnode) {
		vnode.componentInstance.$off('click', oldVnode.modalClick);
	}
};
