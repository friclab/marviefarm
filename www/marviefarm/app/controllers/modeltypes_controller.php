<?php
class ModeltypesController extends AppController {

	var $name = 'Modeltypes';

	function index() {
		$this->Modeltype->recursive = 0;
		$this->set('modeltypes', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid modeltype', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('modeltype', $this->Modeltype->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Modeltype->create();
			if ($this->Modeltype->save($this->data)) {
				$this->Session->setFlash(__('The modeltype has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The modeltype could not be saved. Please, try again.', true));
			}
		}
		
		$sexesOptions = $this->Modeltype->Sex->find('all');
		
		$sexes = $this->Modeltype->Sex->find('list');
		$this->set(compact('sexes'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid modeltype', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Modeltype->save($this->data)) {
				$this->Session->setFlash(__('The modeltype has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The modeltype could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Modeltype->read(null, $id);
		}
		$sexes = $this->Modeltype->Sex->find('list');
		$this->set(compact('sexes'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for modeltype', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Modeltype->delete($id)) {
			$this->Session->setFlash(__('Modeltype deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Modeltype was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>