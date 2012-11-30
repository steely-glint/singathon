<?php
class DataHolder {
	private $blob;
	private $owner;
	private $room;

	function __construct($blob, $owner, $room) {
		$this->blob = $blob;
		$this->owner = $owner;
		$this->room = $room;
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

	function setRoom($room) {
		$this->room = $room;
	}
	function getRoom() {
		return $this->room;
	}


	function toJSON() {
		return	"{".
					"\"blob\":\"".$this->getBlob()."\",".
					"\"owner\":\"".$this->getOwner()."\",".
					"\"room\":\"".$this->getRoom()."\"".
				"}";
	}
}
