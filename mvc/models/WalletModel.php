<?php 
	/**
	 * 
	 */
	class WalletModel extends DB
	{
		
		function ShowCategory($id)
		{
			$q = "SELECT * FROM category";
			if (isset($id)) {
				$q .= " WHERE cat_id = $id";
			}
			$r = $this->con->query($q);
			$arr = array();
			while ($r1 = $r->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		function ShowACategory($id)
		{
			$q = "SELECT * FROM category WHERE cat_id = $id";
			$r = $this->con->query($q);
			$arr = array();
			while ($r1 = $r->fetch_array(MYSQLI_ASSOC)) {
				$arr[] = $r1;
			}
			return json_encode($arr);
		}

		function AddCategory($type,$name,$color,$icon){
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
	}

 ?>