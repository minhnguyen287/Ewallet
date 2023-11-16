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
		public function AddNewRecord(){
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

		public function ShowRecordById(){
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

		public function UpdateRecord(){
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

		public function DeleteRecord(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
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
				if(json_decode($kq)==true){
					$arr["status"] = $kq;
					echo json_encode($arr);
				}
			} else{
				print_r($errors);
			}
		}

		public function NumberOfRecord(){
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
			if ($arr["pagi_for"]=="oil") {
				echo $this->OilModel->ShowHistory($start,$display);
			}
			if ($arr["pagi_for"]=="category") {
				echo $this->WalletModel->ShowLimitCategory($start,$display);
			}
			
		}

		public function ShowListCategories()
		{
			echo $this->WalletModel->ShowCategory(-100);
		}

		public function ShowACategory()
		{
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['categoryId'])&&filter_var($arr['categoryId'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$id = $arr['categoryId'];
				} else{
					$errors[] = "categoryId";
				}
			}

			if (empty($errors)) {
				echo $this->WalletModel->ShowCategory($id);
			} else{
				print_r($errors);
			}
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
				}else {
					print_r($errors);
				} 
			} else {
				echo json_encode("false");
			}			
		}

		public function EditCategory()
		{
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['cat_id'])&&filter_var($arr['cat_id'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$cat_id = $arr['cat_id'];
				} else{
					$errors[] = "cat_id";
				}

				if (!empty($arr['cat_type'])) {
					$cat_type = $arr['cat_type'];
				} else{
					$errors[] = "cat_type";
				}

				if (!empty($arr['cat_name'])) {
					$cat_name = $arr['cat_name'];
				} else{
					$errors[] = "cat_name";
				}

				if (!empty($arr['cat_icon'])) {
					$cat_icon = $arr['cat_icon'];
				} else{
					$errors[] = "cat_icon";
				}

				if (isset($arr['cat_color'])&&preg_match('/^#[a-z0-9]{6}$/',$arr['cat_color'])) {
					$cat_color = $arr['cat_color'];
				} else{
					$errors[] = "cat_color";
				}
			}
				//2. insert database		
				if(empty($errors)){		
					$kq = $this->WalletModel->UpdateCategory($cat_id,$cat_type,$cat_name,$cat_color,$cat_icon);
					if(json_decode($kq) == true){
						echo $this->WalletModel->ShowACategory($cat_id);
					} else{
						echo json_encode($kq);
					}
				} else{
					print_r($errors);
				}
		}

		public function DeleteCategory(){
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			if ( !empty($arr) ) {
				$errors = array();

				if (isset($arr['cat_id'])&&filter_var($arr['cat_id'], FILTER_VALIDATE_INT, array('min_range' => 1))) {
					$cat_id = $arr['cat_id'];
				} else{
					$errors[] = "cat_id";
				}
			}

			if(empty($errors)){		
				$kq = $this->WalletModel->DeleteCategory($cat_id);
				$arr['status'] = $kq;
				echo json_encode($arr);
			} else{
				print_r($errors);
			}
		}

		public function TotalCategory()
		{
			echo $this->WalletModel->CountCategory();
		}

		public function ShowStatistical()
		{ 
			if (!isset($_POST["AjaxData"])) {
				$yearInput = date("Y");
				$monthInput = date("m");
			} else {
				header("Content-Type: application/json");
				$arr = json_decode($_POST["AjaxData"],true);
				$yearInput = $arr['yearInput'];
				$monthInput = $arr['monthInput'];
			}
			echo $kq = $this->WalletModel->ShowStatistical($yearInput,$monthInput);
		}

		public function AddANewTransaction()
		{
			header("Content-Type: application/json");
			$arr = json_decode($_POST["AjaxData"],true);
			if (!empty($arr)) {
				$errors = array();

				if (!empty($arr['transType'])) {
					$transType = $arr['transType'];
				} else {
					$errors[] = "transType"; 
				}

				if (!empty($arr['transName'])) {
					$transName = $arr['transName'];
				} else {
					$errors[] = "transName"; 
				}

				if (!empty($arr['transCategory'])) {
					$transCategory = $arr['transCategory'];
				} else {
					$errors[] = "transCategory"; 
				}

				if (!empty($arr['transDesc'])) {
					$transDesc = $arr['transDesc'];
				} else {
					$errors[] = "transDesc"; 
				}

				if (!empty($arr['transAmount'])) {
					$transAmount = $arr['transAmount'];
				} else {
					$errors[] = "transAmount"; 
				}

				if (!empty($arr['transDate'])) {
					$transDate = $arr['transDate'];
				} else {
					$errors[] = "transDate"; 
				}
				if (empty($errors)) {
					$kq = $this->WalletModel->AddTransaction($transType,$transName,$transCategory,$transDesc,$transAmount,$transDate);
					if (json_decode($kq) == true) {
						$arr['status'] = "success";
						$id = json_decode($this->WalletModel->GetLastTransactionId());
						$arr['tranId'] = $id[0]->id;
						$arr['transCategory'] = $id[0]->cat_name;
						echo json_encode($arr);
					} else {
						echo json_encode($kq);
					}
				}else {
					print_r($errors);
				} 
			} else {
				echo json_encode("false");
			}
		}

		public function GetYearStatistical()
		{
			echo $this->WalletModel->GetYearStatistical();
		}

		public function GetMonthStatistical()
		{
			header("Content-Type: application/json");
			if(isset($_POST["AjaxData"])){
				$arr = json_decode($_POST["AjaxData"],true);
				$y = $arr['y'];
			} else {
				$y = "current_year";
			}
			
			echo $this->WalletModel->GetMonthStatistical($y);
		}
	} /* End Class */
	/*header("Content-Type: application/json"); phải viết đúng từng dấu cách (space) và dấu : (hai chấm) */
 ?>