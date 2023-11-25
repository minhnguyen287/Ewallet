<?php 

	/**
	 * 
	 */
	class DashboardModel extends DB
	{
		public function ShowDashboard($yearInput,$monthInput)
		{	
			$yearInput = $this->con->real_escape_string(strip_tags($yearInput));
			$monthInput = $this->con->real_escape_string(strip_tags($monthInput));
			if ($monthInput == 1) {
				$yearInput = $yearInput-1;
				$monthInput = 12;
			}
			$lastMonthInput = $monthInput-1;
			$q = "SELECT MONTH(tran_date) AS 'month', ";
			$q .= "SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'receipt', ";
			$q .= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'expenditure' ";
			$q .= "FROM transaction ";
			$q .= "WHERE YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $monthInput ";
			$q .= "GROUP BY month";
			
			$record = $this->con->query($q);
			$arr = array();
			while ($r = $record->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r;
			}
			$q1 = "SELECT MONTH(tran_date) AS 'lastmonth', ";
			$q1 .= "SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'receipt_lastmonth', ";
			$q1 .= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'expenditure_lastmonth' ";
			$q1 .= "FROM transaction ";
			$q1 .= "WHERE YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $lastMonthInput ";
			$q1 .= "GROUP BY lastmonth";
			
			$record1 = $this->con->query($q1);
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
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