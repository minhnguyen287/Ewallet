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
			$this->WalletModel = $this->model("WalletModel");
		}

		public function ShowProductInfo(){
			echo $this->OilModel->ShowProductInfo();
		}
		public function ShowLastOption()
		{
			echo $this->OilModel->ShowARecordById(0);
		}
		public function AddNewTransaction(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			//$arr là dạng mảng sau khi dùng hàm json_decode
			//$this->OilModel->AddNewRecord();
			//echo gettype($arr);
			
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['productId'])&&filter_var($arr['productId'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$product_id = $arr['productId'];
				} else{
					$errors[] = "product_id";
				}

				if (!empty($arr['startDay'])) {
					$start_day = $arr['startDay'];
				} else{
					$errors[] = "start_day";
				}

				if (!empty($arr['endDay'])) {
					$end_day = $arr['endDay'];
				} else{
					$errors[] = "end_day";
				}

				if (isset($arr['startKm'])&&filter_var($arr['startKm'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$start_km = $arr['startKm'];
				} else{
					$errors[] = "start_km";
				}

				if (isset($arr['endKm'])&&filter_var($arr['endKm'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$end_km = $arr['endKm'];
				} else{
					$errors[] = "end_km";
				}
				// echo $product_name;
				//2. insert database		
				if(empty($errors)){		
					$kq = $this->OilModel->AddNewRecord($product_id,$start_day,$end_day,$start_km,$end_km);
					if(json_decode($kq) == true){
						echo $this->OilModel->ShowARecordById(0);
					} else{
						echo json_encode($kq);
					}					
				} else{
					print_r($errors);
				}
				//3.thong bao ra man hinh		
			}
		}

		public function ShowTransactionById(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['tranId'])&&filter_var($arr['tranId'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$id = $arr['tranId'];
				} else{
					$errors[] = "tranId";
				}
			}

			if (empty($errors)) {
				echo $this->OilModel->ShowARecordById($id);
			} else{
				print_r($errors);
			}
		}

		public function UpdateTransaction(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			//var_export($arr);
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['transId'])&&filter_var($arr['transId'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$transaction_id = $arr['transId'];
				} else{
					$errors[] = "transaction_id";
				}

				if (isset($arr['productId'])&&filter_var($arr['productId'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$product_id = $arr['productId'];
				} else{
					$errors[] = "product_id";
				}

				if (!empty($arr['startDay'])) {
					$start_day = $arr['startDay'];
				} else{
					$errors[] = "start_day";
				}

				if (!empty($arr['endDay'])) {
					$end_day = $arr['endDay'];
				} else{
					$errors[] = "end_day";
				}

				if (isset($arr['startKm'])&&filter_var($arr['startKm'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$start_km = $arr['startKm'];
				} else{
					$errors[] = "start_km";
				}

				if (isset($arr['endKm'])&&filter_var($arr['endKm'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$end_km = $arr['endKm'];
				} else{
					$errors[] = "end_km";
				}
			}
				//2. insert database		
				if(empty($errors)){		
					$kq = $this->OilModel->UpdateARow($transaction_id,$product_id,$start_day,$end_day,$start_km,$end_km);
					if(json_decode($kq) == true){
						echo $this->OilModel->ShowARecordById($transaction_id);
						//echo json_encode($kq);
					} else{
						echo json_encode($kq);
					}
				} else{
					print_r($errors);
				// }
				//3.thong bao ra man hinh
				
			}
		}

		public function DeleteTransaction(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["id"],true);
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['transactionId'])&&filter_var($arr['transactionId'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$transaction_id = $arr['transactionId'];
				} else{
					$errors[] = "transaction_id";
				}
			}

			if(empty($errors)){		
				$kq = $this->OilModel->DeleteARow($transaction_id);
				echo json_encode($kq);
			} else{
				print_r($errors);
			}
		}

		public function NumberOfTransaction(){
			echo $this->OilModel->CountRecord();
		}

		public function Pagination(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			//var_export($arr);
			if (isset($arr['start'])&&filter_var($arr['start'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
				$start = $arr['start']-1;
			} else{
				$start = 0;
			}
			if (isset($arr['display'])&&filter_var($arr['display'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
				$display = $arr['display'];
			} else{
				$display = 10;
			}
			echo $this->OilModel->ShowHistory($start,$display);
		}

		public function ShowListCategories()
		{
			echo $this->WalletModel->ShowListCategory();
		}

		public function AddANewCategory()
		{
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			if (!empty($arr)) {
				$errors = array();

				if (!empty($arr['type'])) {
					$type = $arr['type'];
				} else {
					$errors[] = "type"; 
				}

				if (!empty($arr['name'])) {
					$name = $arr['name'];
				} else {
					$errors[] = "name"; 
				}

				if (!empty($arr['color'])) {
					$color = $arr['color'];
				} else {
					$errors[] = "color"; 
				}

				if (!empty($arr['icon'])) {
					$icon = $arr['icon'];
				} else {
					$errors[] = "icon"; 
				}

				if (empty($errors)) {
					$kq = $this->WalletModel->AddCategory($type,$name,$color,$icon);
					if (json_decode($kq) == true) {
						echo json_encode($arr);
					} else {
						echo json_encode($kq);
					}
				}
			} else {
				print_r($errors);
			}
			
		}
		
	} /* End Class */
 ?>