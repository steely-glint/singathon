<?php
include_once 'DataRepository.php';
include_once 'MySQLDataRepository.php';
include_once 'FileDataRepository.php';

/**
 * Data pool singleton fascade.
 */
class DataPool implements DataRepository {
	/**
	 * Singleton instance
	 *
	 * @var DataPool
	 */
	private static $instance;
	/**
	 * Main data storage.
	 *
	 * @var DataRepository
	 */
	private $repos;
	/**
	 * File storage.
	 *
	 * @var FileDataRepository
	 */
	private $filerepos;

	private function __construct() {
		// Use MySQL as main data storage.
		$this->repos = new MySQLDataRepository();
		// Initialize file repository.
		$this->filerepos = new FileDataRepository();
	}

	/**
	 * Fetch singleton instance.
	 *
	 * @return DataPool
	 */
	public static function getInstance() {
		if ( DataPool::$instance == null )
			DataPool::$instance = new DataPool();
		return DataPool::$instance;
	}

	public function addData(DataHolder $data) {
		$this->filerepos->addData($data);

		$blob = $data->getBlob();
		$filename = $data->getRoom()."-".md5($blob).".wav";
		$data->setBlob($filename);

		return $this->repos->addData($data);
	}

	public function getData($id) {
		return $this->repos->getData($id);
	}

	public function remData($id) {
		return $this->repos->remData($id);
	}

	public function getRoomData($rid) {
		return $this->repos->getRoomData($rid);
	}
}