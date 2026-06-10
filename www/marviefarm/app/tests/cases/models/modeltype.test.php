<?php
/* Modeltype Test cases generated on: 2011-02-10 00:19:13 : 1297293553*/
App::import('Model', 'Modeltype');

class ModeltypeTestCase extends CakeTestCase {
	var $fixtures = array('app.modeltype', 'app.sex', 'app.modeltypes_sex');

	function startTest() {
		$this->Modeltype =& ClassRegistry::init('Modeltype');
	}

	function endTest() {
		unset($this->Modeltype);
		ClassRegistry::flush();
	}

}
?>