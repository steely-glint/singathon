<?php
class DataHolder {
	private $blob;
	private $owner;

	function __construct($blob, $owner) {
		$this->blob = $blob;
		$this->owner = $owner;
	}

	function setBlob($blob) {
		$this->blob = $blob;
	}
	function getBlob() {
		return $this->blob;
	}

	function setOwner($owner) {
		$this->owner = $owner;
	}
	function getOwner() {
		return $this->owner;
	}

}
