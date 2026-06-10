<?php
/* ModeltypessexesSize Test cases generated on: 2011-02-10 00:22:01 : 1297293721*/
App::import('Model', 'ModeltypessexesSize');

class ModeltypessexesSizeTestCase extends CakeTestCase {
	var $fixtures = array('app.modeltypessexes_size', 'app.size', 'app.modeltypes_sex');

	function startTest() {
		$this->ModeltypessexesSize =& ClassRegistry::init('ModeltypessexesSize');
	}

	function endTest() {
		unset($this->ModeltypessexesSize);
		ClassRegistry::flush();
	}

}
?>