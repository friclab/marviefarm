<?php
/* Materialtype Test cases generated on: 2011-02-10 21:23:31 : 1297369411*/
App::import('Model', 'Materialtype');

class MaterialtypeTestCase extends CakeTestCase {
	var $fixtures = array('app.materialtype', 'app.material', 'app.supplier', 'app.unitmeasurement', 'app.materials_materialtype', 'app.dynamiccomposition', 'app.fabric', 'app.fixedcomposition', 'app.fixedcompositions_material', 'app.orderdetail', 'app.orderheader', 'app.customer', 'app.collection', 'app.project', 'app.article', 'app.modeltypes_sex', 'app.modeltype', 'app.sex', 'app.modeltypessexes_size', 'app.size', 'app.articles_fabric', 'app.articles_project', 'app.collections_project', 'app.dynamiccompositions_material');

	function startTest() {
		$this->Materialtype =& ClassRegistry::init('Materialtype');
	}

	function endTest() {
		unset($this->Materialtype);
		ClassRegistry::flush();
	}

}
?>