<?php
include_once 'DataRepository.php';

class FileDataRepository implements DataRepository {


	public function addData(DataHolder $data) {
		$filename = $data->getRoom()."-".md5($data->getBlob()).".wav";
		file_put_contents($filename, $data->getBlob());

		return true;
	}

	public function getData($id) {
		return null;
	}

	public function getRoomData($rid) {
		return null;
	}

	public function remData($id) {
		return false;
	}
}