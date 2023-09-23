<?php 
	/**
	 * 
	 */
	class WalletModel extends DB
	{
		
		function ShowCategory($id)
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

		function UpdateCategory($cat_id,$type,$name,$color,$icon){
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
	}

 ?>