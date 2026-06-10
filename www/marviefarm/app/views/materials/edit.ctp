<div class="materials form">
<?php echo $this->Form->create('Material');?>
	<fieldset>
 		<legend><?php __('Edit Material'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('code');
		echo $this->Form->input('description');
		echo $this->Form->input('supplier_id');
		echo $this->Form->input('supplier_code');
		echo $this->Form->input('unitmeasurement_id');
		echo $this->Form->input('price');
	//	echo $this->Form->input('Dynamiccomposition');
		//echo $this->Form->input('Fixedcomposition');
		echo $this->Form->input('Materialtype');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Material.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Material.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Suppliers', true), array('controller' => 'suppliers', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Supplier', true), array('controller' => 'suppliers', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Unitmeasurements', true), array('controller' => 'unitmeasurements', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Unitmeasurement', true), array('controller' => 'unitmeasurements', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Materialtypes', true), array('controller' => 'materialtypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Materialtype', true), array('controller' => 'materialtypes', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Dynamiccompositions', true), array('controller' => 'dynamiccompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Dynamiccomposition', true), array('controller' => 'dynamiccompositions', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Fixedcompositions', true), array('controller' => 'fixedcompositions', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Fixedcomposition', true), array('controller' => 'fixedcompositions', 'action' => 'add')); ?> </li>
	</ul>
</div>