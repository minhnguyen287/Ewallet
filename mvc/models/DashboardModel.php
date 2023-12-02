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

			$q = "SELECT MONTH(tr.tran_date) AS 'month', ";
			$q.= "lst.lastmonth_receipt,lst.lastmonth_expenditure, ";
			$q.= "SUM(CASE WHEN tran_type = 'receipt' THEN tr.tran_amount ELSE 0 END) AS 'receipt', ";
			$q.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tr.tran_amount ELSE 0 END) AS 'expenditure', ";			
			$q.= "tt.total_receipt,tt.total_expenditure, ";
			$q.= "sv.saving_deposit ";
			$q.= "FROM transaction tr CROSS JOIN ";

			$q.= "(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'lastmonth_receipt', ";
			$q.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'lastmonth_expenditure' ";
			$q.= "FROM transaction ";
			$q.= "WHERE YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $lastMonthInput ) lst CROSS JOIN ";

			$q.= "(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'total_receipt', ";
			$q.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'total_expenditure' ";
			$q.= "FROM transaction) tt CROSS JOIN ";
			$q.= "(SELECT SUM(tran_amount) AS 'saving_deposit' FROM transaction WHERE cat_id = 24) sv ";

			$q.= "WHERE YEAR(tr.tran_date) = $yearInput AND MONTH(tr.tran_date) = $monthInput ";
			$q.= "GROUP BY MONTH(tr.tran_date),";
			$q.= "lst.lastmonth_receipt,lst.lastmonth_expenditure,";
			$q.= "tt.total_receipt,tt.total_expenditure";
			
			$record = $this->con->query($q);
			$arr = array();
			if($record->num_rows==0){
				$monthInput = $monthInput-1;
				$q1 = "SELECT MONTH(tr.tran_date) AS 'month', ";
				$q1.= "lst.lastmonth_receipt,lst.lastmonth_expenditure, ";
				$q1.= "SUM(CASE WHEN tran_type = 'receipt' THEN tr.tran_amount ELSE 0 END) AS 'receipt', ";
				$q1.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tr.tran_amount ELSE 0 END) AS 'expenditure', ";			
				$q1.= "tt.total_receipt,tt.total_expenditure, ";
				$q1.= "sv.saving_deposit ";
				$q1.= "FROM transaction tr CROSS JOIN ";

				$q1.= "(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'lastmonth_receipt', ";
				$q1.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'lastmonth_expenditure' ";
				$q1.= "FROM transaction ";
				$q1.= "WHERE YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $lastMonthInput ) lst CROSS JOIN ";

				$q1.= "(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'total_receipt', ";
				$q1.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'total_expenditure' ";
				$q1.= "FROM transaction) tt CROSS JOIN ";
				$q1.= "(SELECT SUM(tran_amount) AS 'saving_deposit' FROM transaction WHERE cat_id = 24) sv ";

				$q1.= "WHERE YEAR(tr.tran_date) = $yearInput AND MONTH(tr.tran_date) = $monthInput ";
				$q1.= "GROUP BY MONTH(tr.tran_date),";
				$q1.= "lst.lastmonth_receipt,lst.lastmonth_expenditure,";
				$q1.= "tt.total_receipt,tt.total_expenditure";	
				$record1 = $this->con->query($q1);
				while ($r = $record1->fetch_array(MYSQLI_ASSOC)) {
					$arr[] = $r;
				}
			} else {
				while ($r = $record->fetch_array(MYSQLI_ASSOC)) {
					$arr[] = $r;
				}
			}
			
			return json_encode($arr);
		}	

		public function Show5LargestAmount($yearInput,$monthInput)
		{	$yearInput = $this->con->real_escape_string(strip_tags($yearInput));
			$monthInput = $this->con->real_escape_string(strip_tags($monthInput));
			if ($monthInput == 1) {
				$yearInput = $yearInput-1;
				$monthInput = 12;
			}
			$q = "SELECT tran_type, tran_name, SUM(tran_amount) AS 'largest_amount' FROM transaction WHERE cat_id != 24 AND YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $monthInput  GROUP BY cat_id ORDER BY largest_amount DESC LIMIT 5";
			$record = $this->con->query($q);
			$arr = array();
			if ($record->num_rows==0) {
				$monthInput = $monthInput-1;
				$q1 = "SELECT tran_type, tran_name, SUM(tran_amount) AS 'largest_amount' FROM transaction WHERE cat_id != 24 AND YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $monthInput  GROUP BY cat_id ORDER BY largest_amount DESC LIMIT 5";
				$record1 = $this->con->query($q1);
				while ($r = $record1->fetch_array(MYSQLI_ASSOC)) {
					$arr[] = $r;
				}
			} else {
				while ($r = $record->fetch_array(MYSQLI_ASSOC)) {
					$arr[] = $r;
				}
			}
			return json_encode($arr);
		}

		public function DrawChart()
		{
			$q = "SELECT MONTH(tran_date) AS 'month', ";
			$q.= "SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'receipt',"; 
			$q.= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'expenditure' ";
			$q.= "FROM transaction ";
			$q.= "GROUP BY MONTH(tran_date)";
			$record = $this->con->query($q);
			$arr = array();
			while ($r = $record->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r;
			}
			return json_encode($arr);
		}

		public function ShowStatisticalLastMonth($value='')
		{
			$q1 = "SELECT MONTH(tran_date) AS 'lastmonth', ";
			$q1 .= "SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'receipt_lastmonth', ";
			$q1 .= "SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'expenditure_lastmonth' ";
			$q1 .= "FROM transaction ";
			$q1 .= "WHERE YEAR(tran_date) = $yearInput AND MONTH(tran_date) = $lastMonthInput ";
			$q1 .= "GROUP BY lastmonth";
			
			$record1 = $this->con->query($q1);
			$arr1 = array();
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$arr1[] = $r1;
			}
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

<!-- SELECT MONTH(tr.tran_date) AS 'month', 
lst.lastmonth_receipt,lst.lastmonth_expenditure, 
SUM(CASE WHEN tran_type = 'receipt' THEN tr.tran_amount ELSE 0 END) AS 'receipt', 
SUM(CASE WHEN tran_type = 'expenditure' THEN tr.tran_amount ELSE 0 END) AS 'expenditure', 			
tt.total_receipt,tt.total_expenditure, 
sv.saving_deposit 
FROM transaction tr CROSS JOIN 

(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'lastmonth_receipt', 
SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'lastmonth_expenditure' 
FROM transaction 
WHERE YEAR(tran_date) = 2023 AND MONTH(tran_date) = 11 ) lst CROSS JOIN 

(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'total_receipt', 
SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'total_expenditure' 
FROM transaction) tt CROSS JOIN 
(SELECT SUM(tran_amount) AS 'saving_deposit' FROM transaction WHERE cat_id = 24) sv 

WHERE YEAR(tr.tran_date) = 2023 AND MONTH(tr.tran_date) = 12 
GROUP BY MONTH(tr.tran_date),
lst.lastmonth_receipt,lst.lastmonth_expenditure,
tt.total_receipt,tt.total_expenditure -->
