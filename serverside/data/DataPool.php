<?php
include_once 'DataRepository.php';
include_once 'MySQLDataRepository.php';
include_once 'FileDataRepository.php';

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
	/**
	 * @var DataRepository
	 */
	private $filerepos;

	private function __construct() {
		// TODO: mysql login stuffs
		$this->repos = new MySQLDataRepository();
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