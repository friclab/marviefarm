<div class="sexes form">
<?php echo $this->Form->create('Sex');?>
	<fieldset>
 		<legend><?php __('Add Sex'); ?></legend>
	<?php
		echo $this->Form->input('code');
		echo $this->Form->input('description');
		echo $this->Form->input('Modeltype');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Sexes', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Modeltypes', true), array('controller' => 'modeltypes', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Modeltype', true), array('controller' => 'modeltypes', 'action' => 'add')); ?> </li>
	</ul>
</div>