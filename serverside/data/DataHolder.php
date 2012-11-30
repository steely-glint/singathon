<?php
/**
 * A data holder.
 */
class DataHolder {
	/**
	 * The blob identifier
	 * @var string
	 */
	private $blob;
	/**
	 * The owner identifier (IP address)
	 * @var string
	 */
	private $owner;
	/**
	 * The room identifier
	 *
	 * @var integer
	 */
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

	/**
	 * Returns the object as a JSON string.
	 *
	 * @return string
	 */
	function toJSON() {
		return	"{".
					"\"blob\":\"".$this->getBlob()."\",".
					"\"owner\":\"".$this->getOwner()."\",".
					"\"room\":\"".$this->getRoom()."\"".
				"}";
	}
}
