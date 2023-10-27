<?php 
	/**
	 * 
	 */
	class WalletModel extends DB
	{
		
		public function ShowCategory($id)
		{
			$q = "SELECT * FROM category";
			if ($id != -100) {
				$q .= " WHERE cat_id = $id";
			}
			$r = $this->con->query($q);
			$arr = array();
			while ($r1 = $r->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		public function ShowACategory($id)
		{
			$q = "SELECT * FROM category WHERE cat_id = $id";
			$r = $this->con->query($q);
			$arr = array();
			while ($r1 = $r->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		public function AddCategory($type,$name,$color,$icon){
			$type = $this->con->real_escape_string(strip_tags($type));
			$name = $this->con->real_escape_string(strip_tags($name));
			$color = $this->con->real_escape_string(strip_tags($color));
			$icon = $this->con->real_escape_string(strip_tags($icon));			
			$q = "INSERT INTO category VALUES (null,'$type','$name','$color','$icon')";
			$result = false;
			if($this->con->query($q)){
				$result = true;
			}
			return json_encode($result);
		}

		public function UpdateCategory($cat_id,$type,$name,$color,$icon){
			$cat_id = $this->con->real_escape_string(strip_tags($cat_id));
			$type = $this->con->real_escape_string(strip_tags($type));
			$name = $this->con->real_escape_string(strip_tags($name));
			$color = $this->con->real_escape_string(strip_tags($color));
			$icon = $this->con->real_escape_string(strip_tags($icon));
			$q = "UPDATE category SET ";
			$q .= "category_type = '$type', ";
			$q .= "category_name = '$name', ";
			$q .= "color = '$color', ";
			$q .= "icon = '$icon' ";
			$q .= "WHERE cat_id = $cat_id";
			$result = false;
			if ($this->con->query($q)) {
				$result = true;
			}
			return json_encode($result);

		}

		public function DeleteCategory($id)
		{
			$id = $this->con->real_escape_string(strip_tags($id));
			$q = "DELETE FROM oil WHERE och_id = $id";
			$result = false;
			if ($this->con->query($q)) {
				$result = true;
			}
			return json_encode($result);
		}

		public function CountCategory()
		{
			$q = "SELECT COUNT(*) AS totalRecords FROM category";
			$r = $this->con->query($q);
			$result = $r->fetch_array(MYSQLI_ASSOC);
			return json_encode($result);
		}

		public function ShowLimitCategory($start,$display){
			$q = "SELECT * FROM category LIMIT $start, $display";
			$record1 = $this->con->query($q);
			$arr = array();
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		public function ShowStatistical()
		{
			$q = "SELECT DATE_FORMAT(tran_date,'%d-%m-%Y') AS 'date', EXTRACT(week FROM tran_date) AS 'Week', MONTH(tran_date) AS 'month', QUARTER(tran_date) AS 'quarter', YEAR(tran_date) AS 'year',SUM(CASE WHEN tran_type = 'receipt' THEN tran_amount ELSE 0 END) AS 'receipt',SUM(CASE WHEN tran_type = 'expenditure' THEN tran_amount ELSE 0 END) AS 'expenditures' FROM transaction GROUP BY date ORDER BY date DESC";
			
			$record1 = $this->con->query($q);
			$arr = array();
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		public function AddTransaction($transType,$transName,$transCategory,$transDesc,$transAmount,$transDate)
		{	$transType = $this->con->real_escape_string(strip_tags($transType));
			$transName = $this->con->real_escape_string(strip_tags($transName));
			$transCategory = $this->con->real_escape_string(strip_tags($transCategory));
			$transDesc = $this->con->real_escape_string(strip_tags($transDesc));
			$transAmount = $this->con->real_escape_string(strip_tags($transAmount));	
			$transDate = $this->con->real_escape_string(strip_tags($transDate));	
			$q = "INSERT INTO transaction VALUES (null,'$transType','$transName',$transCategory,'$transDesc',$transAmount,'$transDate')";
			$result = false;
			if($this->con->query($q)){
				$result = true;
			}
			return json_encode($result);
		}

		public function GetYearStatistical()
		{
			$q = "SELECT DISTINCT YEAR(tran_date) AS 'year', YEAR(CURDATE()) AS 'current_year' FROM transaction";
			
			$record1 = $this->con->query($q);
			$arr = array();
			while ($r1 = $record1->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}
	}
	//https://stackoverflow.com/questions/13777940/in-1-query-2-results-using-2-conditions
 ?>