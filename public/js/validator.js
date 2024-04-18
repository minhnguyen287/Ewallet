// Đối tượng Validator _ Constructor function
function Validator(options){
	var formElement = document.querySelector(options.form);
	function validate(inputElement,rule){
		var errorMessage  = rule.test(inputElement.value);
		if(errorMessage){
			inputElement.parentElement.classList.add('invalid')
			inputElement.parentElement.querySelector(options.errorSelector).innerText = errorMessage
		} else {
			inputElement.parentElement.classList.remove('invalid')
			inputElement.parentElement.querySelector(options.errorSelector).innerText = "";
		}
	}
	if(formElement){
		 options.rules.forEach(function(rule){
		 	var inputElement = formElement.querySelector(rule.selector);
		 	if (inputElement) {
		 		//Xử lí trường hợp người dùng blur khỏi input
		 		inputElement.onblur = function(){
		 			validate(inputElement,rule);
		 			
		 		}
		 		//Xử lí trường hợp người dùng bắt đầu gõ input
		 		inputElement.onclick = function(){
		 			inputElement.parentElement.classList.remove('invalid')
		 			inputElement.parentElement.querySelector(options.errorSelector).innerText = "";
		 		}

		 	}

		 })
	}
 }

//Định nghĩa các rules
//Nguyên tắc của rule
// Khi có lỗi trả ra message lỗi
// Khi hợp lệ không trả ra gì (undefined)
Validator.isRequired = function(selector){
	return {
		selector:selector,
		test: function(value){
			return value.trim() ? undefined : "can't be empty"
		}
	}; 
}

Validator.isEmail = function(selector){
	return {
		selector:selector,
		test: function(){

		}
	};
}