<?php
/* Supplier Test cases generated on: 2011-02-10 00:31:51 : 1297294311*/
App::import('Model', 'Supplier');

class SupplierTestCase extends CakeTestCase {
	var $fixtures = array('app.supplier', 'app.material', 'app.unitmeasurement', 'app.materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Supplier =& ClassRegistry::init('Supplier');
	}

	function endTest() {
		unset($this->Supplier);
		ClassRegistry::flush();
	}

}
?>