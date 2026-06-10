<?php
/* Orderheader Fixture generated on: 2011-02-10 00:29:22 : 1297294162 */
class OrderheaderFixture extends CakeTestFixture {
	var $name = 'Orderheader';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'order_number' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'unique'),
		'description' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 256, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'customer_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'key' => 'index'),
		'collection_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'key' => 'index'),
		'date' => array('type' => 'datetime', 'null' => true, 'default' => NULL),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'ix_numero_uniq' => array('column' => 'order_number', 'unique' => 1), 'fk_ord_test_cli' => array('column' => 'customer_id', 'unique' => 0), 'fk_ord_test_coll' => array('column' => 'collection_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'order_number' => 1,
			'description' => 'Lorem ipsum dolor sit amet',
			'customer_id' => 1,
			'collection_id' => 1,
			'date' => '2011-02-10 00:29:22'
		),
	);
}
?>