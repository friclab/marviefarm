<?php
/* Size Test cases generated on: 2011-02-10 00:34:50 : 1297294490*/
App::import('Model', 'Size');

class SizeTestCase extends CakeTestCase {
	var $fixtures = array('app.size', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.article', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.articles_project', 'app.collections_project', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.modeltypessexes_size');

	function startTest() {
		$this->Size =& ClassRegistry::init('Size');
	}

	function endTest() {
		unset($this->Size);
		ClassRegistry::flush();
	}

}
?>