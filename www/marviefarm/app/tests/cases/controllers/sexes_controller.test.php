<?php
/* Sexes Test cases generated on: 2011-02-10 00:39:50 : 1297294790*/
App::import('Controller', 'Sexes');

class TestSexesController extends SexesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class SexesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.sex', 'app.modeltype', 'app.modeltypes_sex');

	function startTest() {
		$this->Sexes =& new TestSexesController();
		$this->Sexes->constructClasses();
	}

	function endTest() {
		unset($this->Sexes);
		ClassRegistry::flush();
	}

	function testIndex() {

	}

	function testView() {

	}

	function testAdd() {

	}

	function testEdit() {

	}

	function testDelete() {

	}

}
?>