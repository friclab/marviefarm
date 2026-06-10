<?php
class SexesController extends AppController {

	var $name = 'Sexes';

	function index() {
		$this->Sex->recursive = 0;
		$this->set('sexes', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid sex', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('sex', $this->Sex->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Sex->create();
			if ($this->Sex->save($this->data)) {
				$this->Session->setFlash(__('The sex has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The sex could not be saved. Please, try again.', true));
			}
		}
		$modeltypes = $this->Sex->Modeltype->find('list');
		$this->set(compact('modeltypes'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid sex', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Sex->save($this->data)) {
				$this->Session->setFlash(__('The sex has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The sex could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Sex->read(null, $id);
		}
		$modeltypes = $this->Sex->Modeltype->find('list');
		$this->set(compact('modeltypes'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for sex', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Sex->delete($id)) {
			$this->Session->setFlash(__('Sex deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Sex was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>