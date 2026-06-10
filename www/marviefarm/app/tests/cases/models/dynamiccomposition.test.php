<?php
/* Dynamiccomposition Test cases generated on: 2011-02-10 00:13:26 : 1297293206*/
App::import('Model', 'Dynamiccomposition');

class DynamiccompositionTestCase extends CakeTestCase {
	var $fixtures = array('app.dynamiccomposition', 'app.fabric', 'app.material', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Dynamiccomposition =& ClassRegistry::init('Dynamiccomposition');
	}

	function endTest() {
		unset($this->Dynamiccomposition);
		ClassRegistry::flush();
	}

}
?>