<?php 
	/**
	 * 
	 */
	class OilModel extends DB
	{
		
		public function ShowHistory(){
			$q = "SELECT * FROM oil";
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