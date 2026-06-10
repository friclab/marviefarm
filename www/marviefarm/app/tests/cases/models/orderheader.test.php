<?php
/* Orderheader Test cases generated on: 2011-02-10 00:29:22 : 1297294162*/
App::import('Model', 'Orderheader');

class OrderheaderTestCase extends CakeTestCase {
	var $fixtures = array('app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.collections_project', 'app.orderdetail', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.fabric', 'app.fixedcomposition', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.dynamiccompositions_material', 'app.fixedcompositions_material', 'app.articles_fabric', 'app.articles_project');

	function startTest() {
		$this->Orderheader =& ClassRegistry::init('Orderheader');
	}

	function endTest() {
		unset($this->Orderheader);
		ClassRegistry::flush();
	}

}
?>