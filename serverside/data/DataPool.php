<?php
include_once 'DataRepository.php';
include_once 'MySQLDataRepository.php';

class DataPool implements DataRepository {
	/**
	 * Singleton instance
	 *
	 * @var DataPool
	 */
	private static $instance;
	/**
	 * The data repository to use
	 *
	 * @var DataRepository
	 */
	private $repos;

	private function __construct() {
		// TODO: mysql login stuffs
		$this->repos = new MySQLDataRepository(
		
		);
	}

	/**
	 * Fetch singleton instance.
	 *
	 * @return DataPool
	 */
	public static function getInstance() {
		if ( $$this->instance == null )
			$this->instance = new DataPool();
		return $this->instance;
	}

	public function addData(DataHolder $data) {
		return $this->repos->addData($data);
	}

	public function getData($id) {
		return $this->repos->getData($id);
	}

	public function remData($id) {
		return $this->repos->remData($id);
	}
}