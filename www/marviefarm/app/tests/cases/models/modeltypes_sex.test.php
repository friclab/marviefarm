<?php
/* ModeltypesSex Test cases generated on: 2011-02-10 00:25:35 : 1297293935*/
App::import('Model', 'ModeltypesSex');

class ModeltypesSexTestCase extends CakeTestCase {
	var $fixtures = array('app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.article', 'app.orderdetail', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.project', 'app.articles_project', 'app.modeltypessexes_size', 'app.size');

	function startTest() {
		$this->ModeltypesSex =& ClassRegistry::init('ModeltypesSex');
	}

	function endTest() {
		unset($this->ModeltypesSex);
		ClassRegistry::flush();
	}

}
?>