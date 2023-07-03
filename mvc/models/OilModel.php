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

		public function AddNewTransaction($product_id,$start_day,$end_day,$start_km,$end_km,$price){
			$q = "INSERT INTO oil VALUES(null,$product_id,'$start_day','$end_day',$start_km,$end_km,$price)";
			$result = false;
			if($this->con->query($q)){
				$result = true;
			}
			return json_encode($result);
			
		}
	}

 ?>