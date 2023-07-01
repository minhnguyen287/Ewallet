<?php 
	/**
	 * 
	 */
	class DB
	{	
		public $con;
		protected $servername = "localhost";
		protected $username = "root";
		protected $password = "";
		protected $dbname = "ewallet";
		
		function __construct()
		{
			$this->con = new mysqli($this->servername,$this->username,$this->password);
			$this->con->select_db($this->dbname);
			$this->con->query("SET NAMES 'utf8'");

		}
	}
	
 ?>