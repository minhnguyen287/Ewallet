<?php 
	/**
	 * 
	 */
	class WalletModel extends DB
	{
		
		function ShowListCategory()
		{
			$q = "SELECT * FROM category";
			$r = $this->con->query($q);
			$arr = array();
			while ($r1 = $r->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}
	}

 ?>