<?php
/* Fixedcomposition Test cases generated on: 2011-02-10 00:16:27 : 1297293387*/
App::import('Model', 'Fixedcomposition');

class FixedcompositionTestCase extends CakeTestCase {
	var $fixtures = array('app.fixedcomposition', 'app.fabric', 'app.dynamiccomposition', 'app.material', 'app.dynamiccompositions_material', 'app.orderdetail', 'app.article', 'app.modeltypes_sex', 'app.articles_fabric', 'app.project', 'app.articles_project', 'app.fixedcompositions_material');

	function startTest() {
		$this->Fixedcomposition =& ClassRegistry::init('Fixedcomposition');
	}

	function endTest() {
		unset($this->Fixedcomposition);
		ClassRegistry::flush();
	}

}
?>