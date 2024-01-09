<?php 
	/**
	 * 
	 */
	class DB
	{	
		public $con;
		protected $servername = "localhost";
		protected $username = "id21653380_mint";
		protected $password = "Zxcvb@123";
		protected $dbname = "id21653380_ewallet";
		
		function __construct()
		{
			$this->con = new mysqli($this->servername,$this->username,$this->password);
			$this->con->select_db($this->dbname);
			$this->con->query("SET NAMES 'utf8'");

		}

		
	}
	
 ?>