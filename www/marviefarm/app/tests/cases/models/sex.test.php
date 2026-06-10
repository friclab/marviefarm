<?php
/* Sex Test cases generated on: 2011-02-10 00:31:21 : 1297294281*/
App::import('Model', 'Sex');

class SexTestCase extends CakeTestCase {
	var $fixtures = array('app.sex', 'app.modeltype', 'app.modeltypes_sex');

	function startTest() {
		$this->Sex =& ClassRegistry::init('Sex');
	}

	function endTest() {
		unset($this->Sex);
		ClassRegistry::flush();
	}

}
?>