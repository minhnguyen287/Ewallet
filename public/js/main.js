var btnAdd = document.querySelector('.btn-add');
var btnCreate = document.querySelector('.btn-create');
var btnEdit = document.querySelector('.btn-editt');
var btnUpdate = document.querySelector('.btn-update');
var btnRemove = document.querySelector('.btn-remove');
var btnDelete = document.querySelector('.btn-delete');
var btnCancel = document.querySelector('.btn-cancel');
var btnCloses = document.querySelectorAll('.btn-close');

function hideModal(modal) {
	modal.style.opacity = "0";
	modal.style.visibility = "hidden";
}

function showModal(modal){
	modal.style.opacity = "1";
	modal.style.visibility = "visible";
}

// console.log(btnClose)
btnCloses.forEach(function(btnClose){
	btnClose.addEventListener('click',function(){
		element = btnClose;
		while(element.parentNode){
			if(element.parentNode.matches('.dialog')){
				hideModal(element.parentNode)
				break;
			}
			element = element.parentNode;
		}
	})
})

Dialog({
	dialog:"#dialog-1",
	button:".btn-add",
	type:"multiple",
	custom:{
		title:"Add a new Record",
		btnHide:'.btn-update',
		btnDisplay:'.btn-create'
	}
})

Dialog({
	dialog:"#dialog-1",
	button:".btn-edit",
	type:"multiple",
	custom:{
		title:"Edit Record",
		btnHide:'.btn-create',
		btnDisplay:'.btn-update'
	}
})

Dialog({
	dialog:"#dialog-2",
	button:".btn-remove",
	type:"single",
	custom:{
		title:"Edit Record",
		btnHide:'',
		btnDisplay:''
	}
})