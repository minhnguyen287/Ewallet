<?php 
	/**
	 * 
	 */
	class OilModel extends DB
	{
		
		public function ShowHistory(){
			$q = "SELECT o.och_id,p.product_name,o.end_day,p.product_price, ";
			$q .= "DATEDIFF(o.end_day,o.start_day) AS total_days, ";
			$q .= "(end_km-start_km) AS total_km ";
			$q .= "FROM oil AS o ";
			$q .= "JOIN oil_product AS p ";
			$q .= "USING (product_id)";

			$record1 = $this->con->query($q);
			$arr = array();
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		public function AddNewRecord($product_id,$start_day,$end_day,$start_km,$end_km){
			$pid = $this->con->real_escape_string(strip_tags($product_id)); 
			$sday = $this->con->real_escape_string(strip_tags($start_day));
			$eday = $this->con->real_escape_string(strip_tags($end_day));
			$skm = $this->con->real_escape_string(strip_tags($start_km));
			$ekm = $this->con->real_escape_string(strip_tags($end_km));
			$q = "INSERT INTO oil VALUES(null,$pid,'$sday','$eday',$skm,$ekm)";
			$result = false;
			if($this->con->query($q)){
				$result = true;
			}
			return json_encode($result);
			
		}

		public function TestNhanDuLieuAjax()
		{
			// $arr = isset($_POST['jsn']) ? json_decode($_POST['jsn'], true) :[];
			// var_export(gettype($arr));
			// echo json_decode($_POST['jsn'])->name;

			header("Content-Type: application/json");
			// build a PHP variable from JSON sent using POST method
			$v = json_decode(file_get_contents("php://input"));
			// build a PHP variable from JSON sent using GET method
			//$v = json_decode(stripslashes($_GET["data"]));
			// encode the PHP variable to JSON and send it back on client-side
			echo json_encode($v);
		}

		public function ShowProductInfo(){
			$q = "SELECT product_id, product_name, product_batch FROM oil_product";
			$r = $this->con->query($q);
			$mang = array();
			while($r1 = $r->fetch_array(MYSQLI_ASSOC)){
				$mang[] = $r1;
			}
			return json_encode($mang);
		}

		public function ShowLastOption(){
			$q = "SELECT o.och_id,p.product_name,o.end_day,p.product_price,o.end_km, ";
			$q .= "DATEDIFF(o.end_day,o.start_day) AS total_days, ";
			$q .= "(end_km-start_km) AS total_km ";
			$q .= "FROM oil AS o ";
			$q .= "JOIN oil_product AS p ";
			$q .= "USING (product_id) ";
			$q .= "ORDER BY och_id DESC ";
			$q .= "LIMIT 1";
			$r = $this->con->query($q);
			$data = $r->fetch_array(MYSQLI_ASSOC);
			return json_encode($data);
			
		}

		public function ShowARecordById($id)
		{
			$oid = $this->con->real_escape_string(strip_tags($id));
			$q = "SELECT * FROM oil WHERE och_id = $oid";
			$r = $this->con->query($q);
			$data = $r->fetch_array(MYSQLI_ASSOC);
			return json_encode($data);
		}
	}

 ?>