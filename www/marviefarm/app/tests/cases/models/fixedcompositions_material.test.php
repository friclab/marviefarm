<?php
/* FixedcompositionsMaterial Test cases generated on: 2011-02-10 00:16:45 : 1297293405*/
App::import('Model', 'FixedcompositionsMaterial');

class FixedcompositionsMaterialTestCase extends CakeTestCase {
	var $fixtures = array('app.fixedcompositions_material', 'app.fixedcomposition', 'app.fabric', 'app.dynamiccomposition', 'app.material', 'app.dynamiccompositions_material', 'app.orderdetail', 'app.article', 'app.modeltypes_sex', 'app.articles_fabric', 'app.project', 'app.articles_project');

	function startTest() {
		$this->FixedcompositionsMaterial =& ClassRegistry::init('FixedcompositionsMaterial');
	}

	function endTest() {
		unset($this->FixedcompositionsMaterial);
		ClassRegistry::flush();
	}

}
?>