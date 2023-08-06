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
			header("Content-Type: application/json");
			$arr = json_decode($_POST["ajaxSend"],true);
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
					if($kq == true){
						echo $this->OilModel->ShowLastOption();
					}
				} else{
					print_r($errors);
				}
				//3.thong bao ra man hinh
				
			}
		}

		public function ShowTransactionById()
		{
			header("Content-Type: application/json");
			$arr = json_decode($_POST["id"],true);
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
	}

 ?>