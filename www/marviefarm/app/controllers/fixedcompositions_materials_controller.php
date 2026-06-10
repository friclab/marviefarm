<?php
class FixedcompositionsMaterialsController extends AppController {

	var $name = 'FixedcompositionsMaterials';

	function index() {
		$this->FixedcompositionsMaterial->recursive = 0;
		$this->set('fixedcompositionsMaterials', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid fixedcompositions material', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->FixedcompositionsMaterial->recursive = 2;
		$this->set('fixedcompositionsMaterial', $this->FixedcompositionsMaterial->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->FixedcompositionsMaterial->create();
			if ($this->FixedcompositionsMaterial->save($this->data)) {
				$this->Session->setFlash(__('The fixedcompositions material has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fixedcompositions material could not be saved. Please, try again.', true));
			}
		}
		$materials = $this->FixedcompositionsMaterial->Material->find('list');
		$fixedcompositions = $this->FixedcompositionsMaterial->Fixedcomposition->find('list');
		$this->set(compact('materials', 'fixedcompositions'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid fixedcompositions material', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->FixedcompositionsMaterial->save($this->data)) {
				$this->Session->setFlash(__('The fixedcompositions material has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fixedcompositions material could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$materials = $this->FixedcompositionsMaterial->Material->find('list');
			$fixedcompositions = $this->FixedcompositionsMaterial->Fixedcomposition->find('list');
			$this->set(compact('materials', 'fixedcompositions'));
			$this->data = $this->FixedcompositionsMaterial->read(null, $id);
		}
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for fixedcompositions material', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->FixedcompositionsMaterial->delete($id)) {
			$this->Session->setFlash(__('Fixedcompositions material deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Fixedcompositions material was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>