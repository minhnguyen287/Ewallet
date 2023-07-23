<?php 
	/**
	 * 
	 */
	class Ajax extends Controller
	{
		public $OilModel;
		function __construct()
		{
			$this->OilModel = $this->model("OilModel");
		}

		public function ShowProductInfo(){
			echo $this->OilModel->ShowProductInfo();
		}
		public function ShowLastOption()
		{
			echo $this->OilModel->ShowLastOption();
		}
		public function AddNewTransaction(){
			echo $this->OilModel->AddNewRecord();
		}
	}

 ?>