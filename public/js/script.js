//Show modal
var dialog = document.getElementsByClassName("dialog");
var btnAddTransaction = document.getElementsByClassName("add__account-button");
var btnCloseModal = document.getElementsByClassName("dialog__content-header-close");
//Show modal when user click button Add Transaction
btnAddTransaction[0].onclick = function(){
	dialog[0].style.opacity = "1";
	dialog[0].style.visibility = "visible";
};
//Hidden modal when user click button close
btnCloseModal[0].onclick = function(){
	dialog[0].style.opacity = "0";
	dialog[0].style.visibility = "hidden";
};
//Hidden modal when user click on window screen
window.addEventListener("click",function(event){
if (event.target == dialog[0]) {
		dialog[0].style.opacity = "1";
		dialog[0].style.visibility = "hidden";
	}
});
