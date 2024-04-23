// Đối tượng Validator _ Constructor function
function Validator(options){
	var formElement = document.querySelector(options.form);
	var ruleSelectors = {};
	function validate(inputElement,rule){
		//console.log(ruleSelectors)
		// console.log(rule.selector)
		var elementRules = ruleSelectors[rule.selector];
		//console.log(elementRules)
		//validate các rule của 1 field nếu rule nào không hợp lệ thì return luôn rule đó
		for (var i = 0; i < elementRules.length; i++) {
			errorMessage = elementRules[i](inputElement.value)
			if (errorMessage) break;
		}
		if(errorMessage){
			inputElement.parentElement.classList.add('invalid')
			inputElement.parentElement.querySelector(options.errorSelector).innerText = errorMessage
		} else {
			inputElement.parentElement.classList.remove('invalid')
			inputElement.parentElement.querySelector(options.errorSelector).innerText = "";
		}
		return !errorMessage//convert boolean
	}
	if(formElement){
		formElement.onsubmit = function(e){
			e.preventDefault();
			var isFormValid = true;
			options.rules.forEach(function(rule){
				var inputElement = formElement.querySelector(rule.selector)
				var isFieldValid = validate(inputElement,rule)
				if (!isFieldValid) {
					isFormValid = false;	
				}
			})
			if (isFormValid) {
				if (typeof options.onSubmit === 'function') {
					/*Khi form hợp lệ (valid) lấy ra các thẻ input có name của form 
					chính là các field bằng querySelectorAll('[name]') => kết quả trả về 
					là 1 NodeList*/ 
					var enableInputs = formElement.querySelectorAll('[name]')
					//console.log(enableInputs);
					/*Cách 1 : Convert NodeList sang mảng để sử dụng reduce nhằm trả về 1 kết quả
					duy nhất (ở đây là 1 object chứa giá trị của các field)*/
					////var formValues = Array.from(enableInputs).reduce(function(formValue,formInput){
						// formValue[formInput.name] = formInput.value
						// return formValue
						//sử dụng toán tử logical để viết tắt 2 câu trên
					////	return (formValue[formInput.name] = formInput.value) && formValue
					////},{});
					/*Cách 2 dùng forEach lặp trực tiếp NodeList*/
					var formValues = {};
					enableInputs.forEach(function(enableInput){
						formValues[enableInput.name] = enableInput.value
					})
					console.log(formValues);
				}
			}
			
		}
		options.rules.forEach(function(rule){
		 	//console.log(rule)
		 	//Lưu lại các rule trong trường hợp 1 field có nhiều rule
		 	//Kiểm tra 1 field nếu đã có 1 rule trước đó thì thêm phần tử vào rule đó
		 	//Nếu chưa có tiến hàng tạo mảng với rule hiện tại là phần tử đầu tiên
		 	if (Array.isArray(ruleSelectors[rule.selector])) {
		 		ruleSelectors[rule.selector].push(rule.test);
		 	} else {
		 		ruleSelectors[rule.selector] = [rule.test];
		 	}
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
Validator.isRequired = function(selector,message){
	return {
		selector:selector,
		test: function(value){
			return value.trim() ? undefined : message || "can't be empty"
		}
	}; 
}

Validator.isEmail = function(selector,message){
	return {
		selector:selector,
		test: function(value){
			var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			return regexEmail.test(value) ? undefined : message || "is incorrect format "
		}
	};
}

Validator.isMinLength = function(selector,minLength,message){
	return{
		selector:selector,
		test:function(value){
			return value.length >= minLength ? undefined : message || `must be least ${minLength} character` 
		}
	}
}

Validator.isComplex = function(selector,message){
	return {
		selector:selector,
		test:function(value){
			var regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
			return regex.test(value) ? undefined : message || 'must be have letter and numeric'
		}
	}
}

Validator.isMatch = function(selector,getPassword,message){
	return{
		selector:selector,
		test:function(value){
			return value === getPassword() ? undefined : message || "is not match"
		}
	}
}