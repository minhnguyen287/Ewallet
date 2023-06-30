<?php 

	/**
	 * 
	 */
	class DashboardModel extends DB
	{
		public function ShowDashboard()
		{
			# connect db
			return "DashboardModel";
		}	
		public function ShowTong($number1,$number2)
		{
			return $number1 + $number2;
		}
		public function GetPost(){
			$q = "SELECT * FROM post";
			return $this->con->query($q);
		}
		
	}
 ?>