<?php 
	/**
	 * 
	 */
	class Oil extends Controller
	{
		public $OilModel;

		public function __construct(){
			$this->OilModel = $this->model("OilModel");
		}
		
		public function Dashboard()
		{
			$statistical1 = $this->OilModel->ShowHistory();
			//Goi view
			$this->view("MasterLayout",[
				"Page"=>"OilView",
				"Ohighlight"=>true,
				"DataRow"=>$statistical1
			]);

		}

		
		public function AddNewTransaction(){
			//echo "AddNewRecord";
			//1.Get và validate DATA khách hàng nhập từ form 
			if ( isset($_POST["addTrBtn"]) ) {
				$errors = array();

				if (isNum($_POST["product"])) {
					$product_id = $_POST["product"];
				} else{
					$errors[] = "product_id";
				}

				if (!empty($_POST["startday"])) {
					$start_day = $_POST["startday"];
				} else{
					$errors[] = "start_day";
				}

				if (!empty($_POST["endday"])) {
					$end_day = $_POST["endday"];
				} else{
					$errors[] = "end_day";
				}

				if (isNum($_POST["startkilometer"])) {
					$start_km = $_POST["startkilometer"];
				} else{
					$errors[] = "start_km";
				}

				if (isNum($_POST["endkilometer"])) {
					$end_km = $_POST["endkilometer"];
				} else{
					$errors[] = "end_km";
				}
		
				// echo $product_name;
				//2. insert database		
				if(empty($errors)){		
					$kq = $this->OilModel->AddNewRecord($product_id,$start_day,$end_day,$start_km,$end_km);
				}
				//3.thong bao ra man hinh
				echo $kq;
			}
			
		}
	}
 ?>