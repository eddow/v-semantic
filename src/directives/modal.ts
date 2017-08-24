import ModalComponent from '../components/modal.vue'
export default function Modal(el, binding, vnode) {
	var inst = vnode.componentInstance, originalClick = inst.click, modal = inst.$parent;
	if(!originalClick) throw new Error('Modal directive applies only on component exposing events.');
	while(modal && !(modal instanceof ModalComponent))
		modal = modal.$parent;
	if(!modal) throw new Error('Modal directive applies only inside an s-modal.');
	inst.$on('click', function() {
		modal.invoke(binding.arg);
	});
}