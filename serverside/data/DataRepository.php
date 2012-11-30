<?php
include_once 'DataHolder.php';

interface DataRepository {
	/**
	 * Add data to repository
	 *
	 * @param DataHolder $data
	 * @return boolean status
	 */
	function addData(DataHolder $data);
	/**
	 * Remove data from repository
	 *
	 * @param integer $id
	 * @return boolean status
	 */
	function remData($id);
	/**
	 * Fetch data from repository
	 *
	 * @param integer $id
	 * @return DataHolder data
	 */
	function getData($id);
	/**
	 * Fetch array of data belonging to specified room from repository
	 *
	 * @param integer $id
	 * @return array data
	 */
	function getRoomData($rid);
}