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
				"DataRow"=>$statistical1
			]);

		}

		
		public function AddNewTransaction(){
			//echo "AddNewTransaction";
			//1.get data khach hang nhap
			if ( isset($_POST["addTrBtn"]) ) {
				$product_id = $_POST["product"];
				$start_day = $_POST["startday"];
				$end_day = $_POST["endday"];
				$start_km = $_POST["startkilometer"];
				$end_km = $_POST["endkilometer"];
				$price = $_POST["price"];

				// echo $product_name;
				//2. insert database				
				$kq = $this->OilModel->AddNewTransaction($product_id,$start_day,$end_day,$start_km,$end_km,$price);
				//3.thong bao ra man hinh
				echo $kq;
			}
			
		}
	}
 ?>