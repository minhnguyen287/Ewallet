<?php 

	/**
	 * 
	 */
	class Controller
	{
		public function model($model)
		{
			require_once "./mvc/models/".$model.".php";
			return new $model;
		}

		public function view($view,$data=[])
		{
			require_once "./mvc/views/".$view.".php";
		}

		//Hàm kiểm tra dữ liệu truyền vào có phải số không !
		public function isNum($var){
			if (isset($var)&&filter_var($var, FILTER_VALIDATE_INT, array('min_range' => 1))) {
					return $var;
			}
		}
	}
 ?>