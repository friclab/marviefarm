<div class="suppliers form">
<?php echo $this->Form->create('Supplier');?>
	<fieldset>
 		<legend><?php __('Edit Supplier'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('name');
		echo $this->Form->input('surname');
		echo $this->Form->input('company');
		echo $this->Form->input('vat');
		echo $this->Form->input('fiscal_code');
		echo $this->Form->input('email');
		echo $this->Form->input('phone1');
		echo $this->Form->input('phone2');
		echo $this->Form->input('fax');
		echo $this->Form->input('mobile');
		echo $this->Form->input('address');
		echo $this->Form->input('zip_code');
		echo $this->Form->input('city');
		echo $this->Form->input('district');
		echo $this->Form->input('country');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Supplier.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Supplier.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Suppliers', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Materials', true), array('controller' => 'materials', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Material', true), array('controller' => 'materials', 'action' => 'add')); ?> </li>
	</ul>
</div>