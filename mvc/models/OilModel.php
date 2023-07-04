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
			$skm = $this->con->real_escape_string(strip_tags($skm));
			$ekm = $this->con->real_escape_string(strip_tags($end_km));
			$q = "INSERT INTO oil VALUES(null,$pid,'$sday','$eday',$skm,$ekm)";
			$result = false;
			if($this->con->query($q)){
				$result = true;
			}
			return json_encode($result);
			
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
	}

 ?>