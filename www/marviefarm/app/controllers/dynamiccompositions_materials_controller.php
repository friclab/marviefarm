<?php
class DynamiccompositionsMaterialsController extends AppController {

	var $name = 'DynamiccompositionsMaterials';

	function index() {
		$this->DynamiccompositionsMaterial->recursive = 0;
		$this->set('dynamiccompositionsMaterials', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid dynamiccompositions material', true));
			$this->redirect(array('action' => 'index'));
		}
		$materials = $this->DynamiccompositionsMaterial->Material->find('list');
		$fixedcompositions = $this->DynamiccompositionsMaterial->Fixedcomposition->find('list');
		$this->set(compact('materials', 'fixedcompositions'));
		
		$this->set('dynamiccompositionsMaterial', $this->DynamiccompositionsMaterial->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->DynamiccompositionsMaterial->create();
			if ($this->DynamiccompositionsMaterial->save($this->data)) {
				$this->Session->setFlash(__('The dynamiccompositions material has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The dynamiccompositions material could not be saved. Please, try again.', true));
			}
		}
		$materials = $this->DynamiccompositionsMaterial->Material->find('list');
		$dynamiccompositions = $this->DynamiccompositionsMaterial->Dynamiccomposition->find('list');
		$this->set(compact('materials', 'dynamiccompositions'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid dynamiccompositions material', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->DynamiccompositionsMaterial->save($this->data)) {
				$this->Session->setFlash(__('The dynamiccompositions material has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The dynamiccompositions material could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->DynamiccompositionsMaterial->read(null, $id);
		}
		$materials = $this->DynamiccompositionsMaterial->Material->find('list');
		$dynamiccompositions = $this->DynamiccompositionsMaterial->Dynamiccomposition->find('list');
		$this->set(compact('materials', 'dynamiccompositions'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for dynamiccompositions material', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->DynamiccompositionsMaterial->delete($id)) {
			$this->Session->setFlash(__('Dynamiccompositions material deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Dynamiccompositions material was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>