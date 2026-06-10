<?php
/* Material Fixture generated on: 2011-02-10 21:22:01 : 1297369321 */
class MaterialFixture extends CakeTestFixture {
	var $name = 'Material';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'code' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 50, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'description' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 256, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'supplier_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'key' => 'index'),
		'supplier_code' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 128, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'unitmeasurement_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'key' => 'index'),
		'price' => array('type' => 'float', 'null' => true, 'default' => NULL),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_mat_forn' => array('column' => 'supplier_id', 'unique' => 0), 'fk_mat_um' => array('column' => 'unitmeasurement_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'code' => 'Lorem ipsum dolor sit amet',
			'description' => 'Lorem ipsum dolor sit amet',
			'supplier_id' => 1,
			'supplier_code' => 'Lorem ipsum dolor sit amet',
			'unitmeasurement_id' => 1,
			'price' => 1
		),
	);
}
?>