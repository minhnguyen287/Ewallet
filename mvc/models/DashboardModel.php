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
			while ($r = $record->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r;
			}
			return json_encode($arr);
		}	

		public function Show5LargestAmount()
		{
			$q = "SELECT tran_type, tran_name, SUM(tran_amount) AS 'largest_amount' FROM transaction GROUP BY cat_id ORDER BY largest_amount DESC LIMIT 5";
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

<!-- SELECT MONTH(sb.tran_date) AS 'month',t.lastmonth_receipt,t.lastmonth_expenditure,tt.total_receipt,tt.total_expenditure,
SUM(CASE WHEN tran_type = 'receipt' THEN sb.tran_amount ELSE 0 END) AS 'receipt',
SUM(CASE WHEN tran_type = 'expenditure' THEN sb.tran_amount ELSE 0 END) AS 'expenditure'
FROM transaction sb CROSS JOIN

(SELECT MONTH(tran_date)-1 AS 'lastmonth',
SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'lastmonth_receipt',
SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'lastmonth_expenditure'
FROM transaction WHERE YEAR(tran_date) = 2023 AND MONTH(tran_date) = 10 ) t CROSS JOIN

(SELECT SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'total_receipt',
SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'total_expenditure'
FROM transaction) tt

WHERE YEAR(sb.tran_date) = 2023 AND MONTH(sb.tran_date) = 11 
GROUP BY MONTH(sb.tran_date),t.lastmonth_receipt,t.lastmonth_expenditure,tt.total_receipt,tt.total_expenditure -->
