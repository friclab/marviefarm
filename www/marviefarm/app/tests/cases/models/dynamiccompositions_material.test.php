<?php
/* DynamiccompositionsMaterial Test cases generated on: 2011-02-10 00:14:04 : 1297293244*/
App::import('Model', 'DynamiccompositionsMaterial');

class DynamiccompositionsMaterialTestCase extends CakeTestCase {
	var $fixtures = array('app.dynamiccompositions_material', 'app.material', 'app.dynamiccomposition', 'app.fabric');

	function startTest() {
		$this->DynamiccompositionsMaterial =& ClassRegistry::init('DynamiccompositionsMaterial');
	}

	function endTest() {
		unset($this->DynamiccompositionsMaterial);
		ClassRegistry::flush();
	}

}
?>