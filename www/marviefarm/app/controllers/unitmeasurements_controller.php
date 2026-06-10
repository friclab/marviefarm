<?php
class UnitmeasurementsController extends AppController {

	var $name = 'Unitmeasurements';

	function index() {
		$this->Unitmeasurement->recursive = 0;
		$this->set('unitmeasurements', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid unitmeasurement', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('unitmeasurement', $this->Unitmeasurement->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Unitmeasurement->create();
			if ($this->Unitmeasurement->save($this->data)) {
				$this->Session->setFlash(__('The unitmeasurement has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The unitmeasurement could not be saved. Please, try again.', true));
			}
		}
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid unitmeasurement', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Unitmeasurement->save($this->data)) {
				$this->Session->setFlash(__('The unitmeasurement has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The unitmeasurement could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Unitmeasurement->read(null, $id);
		}
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for unitmeasurement', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Unitmeasurement->delete($id)) {
			$this->Session->setFlash(__('Unitmeasurement deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Unitmeasurement was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>