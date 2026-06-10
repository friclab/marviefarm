<?php
/* Fabric Test cases generated on: 2011-02-10 00:16:07 : 1297293367*/
App::import('Model', 'Fabric');

class FabricTestCase extends CakeTestCase {
	var $fixtures = array('app.fabric', 'app.fixedcomposition', 'app.dynamiccomposition', 'app.material', 'app.dynamiccompositions_material', 'app.orderdetail', 'app.article', 'app.modeltypes_sex', 'app.articles_fabric', 'app.project', 'app.articles_project');

	function startTest() {
		$this->Fabric =& ClassRegistry::init('Fabric');
	}

	function endTest() {
		unset($this->Fabric);
		ClassRegistry::flush();
	}

}
?>