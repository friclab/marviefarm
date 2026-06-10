<?php
/* FixedcompositionsMaterial Fixture generated on: 2011-02-10 00:16:44 : 1297293404 */
class FixedcompositionsMaterialFixture extends CakeTestFixture {
	var $name = 'FixedcompositionsMaterial';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'fixedcomposition_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'material_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'qta' => array('type' => 'float', 'null' => true, 'default' => NULL, 'length' => '10,2'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_comp_bas_mat_comp_basr' => array('column' => 'material_id', 'unique' => 0), 'fk2asdasdasd' => array('column' => 'fixedcomposition_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'fixedcomposition_id' => 1,
			'material_id' => 1,
			'qta' => 1
		),
	);
}
?>