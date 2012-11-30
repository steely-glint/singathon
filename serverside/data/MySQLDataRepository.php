<?php
include_once 'DataRepository.php';

class MySQLDataRepository implements DataRepository {
	private $host = "localhost";
	private $schema = "singathon";
	private $username = "root";
	private $password = "";
	private $port = 3306;

	private $link;		// Linker object

	public function __construct($host=NULL,$user=NULL,$passwd=NULL,$schema=NULL,$port=NULL) {
		if ( $host != NULL ) $this->host = $host;
		if ( $user != NULL ) $this->username = $user;
		if ( $passwd != NULL ) $this->password = $passwd;
		if ( $schema != NULL ) $this->schema = $schema;
		if ( $port != NULL ) $this->port = $port;

		$this->link = new mysqli($this->host,$this->username,$this->password,$this->schema,$this->port);
		if (mysqli_connect_errno())
			die("MySQL ERROR: ".mysqli_connect_errno());
	}

	public function __destruct() {
		$this->link->close();
	}

	public function addData(DataHolder $data) {
		$query = "INSERT INTO data (blob,owner) ".
				"VALUES (".$data->getBlob().",".$data->getOwner().")";

		return !$this->voidQuery($query);
	}

	public function getData($id) {
		$query = "SELECT * FROM data WHERE id=".$id;
		$dataArr = $this->singleArrayQuery($query);
		$data = new DataHolder($dataArr[1],$dataArr[2]);
		return $data;
	}

	public function remData($id) {
		$query = "REMOVE FROM data WHERE id=".$id;

		return !$this->voidQuery($query);
	}

	
	
	
	private function singleArrayQuery($query) {
		@$result = $this->link->query($query);
		if ( $result )  {
			$array = $result->fetch_array();
			return $array;
		} else {
			return $this->link->error;
		}
	}
	
	private function multiArrayQuery($query) {
		@$result = $this->link->query($query);
		if ( $result )  {
			$array_out = array();
			$i = 0;
			while ( $array = $result->fetch_array() ) {			
				$array_out[$i] = $array;
				$i++;
			}
			return $array_out;
		} else {
			return $this->link->error;
		}
			
	}
	
	private function voidQuery($query) {
		@$result = $this->link->query($query);
		if ( $result )  {
			return false;
		} else {
			return $this->link->error;
		}
	}
}