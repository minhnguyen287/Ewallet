<?php 
	/**
	 * 
	 */
	class OilModel extends DB
	{
		
		public function ShowHistory(){
			$q = "SELECT * FROM oil";
			$record1 = $this->con->query($q);
			$mang = array();
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$mang = $r1;
			}
			return $mang;
		}

		public function AddNewTransaction(){

		}
	}

 ?>